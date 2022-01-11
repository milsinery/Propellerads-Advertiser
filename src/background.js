const URL = 'https://ssp-api.propellerads.com/v5/adv/balance';

const setToken = (key) => {
  chrome.storage.sync.set({ token: key });
};

const setBadge = () => {
  chrome.storage.sync.get(['spending', 'nowBalance'], function (res) {
    chrome.action.setBadgeText({ text: res.spending });
    chrome.action.setBadgeBackgroundColor({
      color: res.nowBalance < 100 ? 'red' : '#0080FF',
    });
  });
};

const setDataInStorage = (balance) => {
  chrome.storage.sync.get(
    ['prevBalance', 'nowBalance', 'lastCheck', 'spending', 'history'],
    function (res) {
      console.log(res);
      if (!res.prevBalance) {
        chrome.storage.sync.set({ prevBalance: balance });
      }

      if (res.lastCheck - new Date().getDate() !== 0) {
        chrome.storage.sync.set({ prevBalance: balance });
      }

      chrome.storage.sync.set({ nowBalance: balance });

      if (res.lastCheck - new Date().getDate() !== 0) {
        if (res.history.length === 6) {
          const result = res.history.slice(0, 5);
          result.unshift(res.spending);
          chrome.storage.sync.set({ history: result });
        } else {
          const result = res.history;
          result.unshift(res.spending);
          chrome.storage.sync.set({ history: result });
        }
      }

      chrome.storage.sync.set({
        spending: (res.prevBalance - balance).toFixed(2).toString(),
      });

      if (
        res.lastCheck - new Date().getDate() !== 0 ||
        balance > res.prevBalance
      ) {
        chrome.storage.sync.set({ prevBalance: balance });
      }

      chrome.storage.sync.set({ nowBalance: balance });

      chrome.storage.sync.set({ lastCheck: new Date().getDate() });

      setBadge();
    }
  );
};

const resetData = () => {
  chrome.storage.sync.set({ prevBalance: null });
  chrome.storage.sync.set({ nowBalance: null });
  chrome.storage.sync.set({ lastCheck: new Date().getDate() });
  chrome.storage.sync.set({ spending: null });
  chrome.storage.sync.set({ history: [] });
};

const resetSession = (token) => {
  setToken(token);
  resetData();
  chrome.runtime.reload();
  main();
};

const main = async (token) => {
  const response = await fetch(URL, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();

  if (typeof result !== 'string') {
    chrome.runtime.onMessage.addListener((req, info, cb) => {
      if (req.action === 'popup_opened') {
        cb(null);
      }
    });
  } else {
    chrome.alarms.create('updater', {
      when: Date.now(),
      periodInMinutes: 5,
    });

    chrome.alarms.onAlarm.addListener((alarm) => {
      if (alarm.name === 'updater') {
        setDataInStorage(result);
      }
    });

    chrome.storage.sync.get(
      ['nowBalance', 'spending', 'history'],
      (res) => {
        chrome.runtime.onMessage.addListener((req, info, cb) => {
          if (req.action === 'popup_opened') {
            const data = { nowBalance: res.nowBalance, spending: res.spending, history: res.history }
            cb(data);
          }
        });
      }
    );
  }
};

chrome.runtime.onMessage.addListener((req, info, cb) => {
  if (req.action === 'options_opened') {
    resetSession(req.token);
  }
});

chrome.storage.sync.get('token', ({ token }) => {
  main(token);
});
