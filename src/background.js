const balanceURL = 'https://ssp-api.propellerads.com/v5/adv/balance';
const workingCampaignsURL = 'https://ssp-api.propellerads.com/v5/adv/campaigns?status%5B%5D=6&is_archived=0&page_size=1000';
const statisticsURL = 'https://ssp-api.propellerads.com/v5/adv/statistics';

// date formatter
Date.prototype.format = function (format) {
  const replaces = {
    yyyy: this.getFullYear(),
    mm: ('0' + (this.getMonth() + 1)).slice(-2),
    dd: ('0' + this.getDate()).slice(-2),
    hh: ('0' + this.getHours()).slice(-2),
    MM: ('0' + this.getMinutes()).slice(-2),
    ss: ('0' + this.getSeconds()).slice(-2),
  };

  let result = format;

  for (const replace in replaces) {
    result = result.replace(replace, replaces[replace]);
  }

  return result;
};

const setToken = (key) => {
  chrome.storage.sync.set({ token: key });
};

const setBadge = (spending) => {
  const numberFormatterForBadge = (num) => {
    const formatedNum = parseInt(num);

    if (formatedNum < 10) return num.toFixed(3).toString();

    if (formatedNum >= 10 && formatedNum <= 99)
      return num.toFixed(2).toString();

    if (formatedNum > 99 && formatedNum < 10000) return formatedNum.toString();

    if (formatedNum >= 10000 && formatedNum < 1000000) {
      const length = formatedNum.toString().length - 3;
      return formatedNum.toString().slice(0, length) + 'K';
    }

    if (formatedNum >= 1000000) {
      const length = formatedNum.toString().length - 6;
      return formatedNum.toString().slice(0, length) + 'M';
    }
  };

  chrome.action.setBadgeText({ text: numberFormatterForBadge(spending) });
  chrome.action.setBadgeBackgroundColor({ color: '#0080FF' });
};

const setBalance = (balance) => {
  chrome.storage.sync.set({ prevBalance: balance });
};

const setSpending = (spending) => {
  chrome.storage.sync.set({ spending });
};

const setLastUpdate = ({ currentDate, currentTime }) => {
  chrome.storage.sync.set({ lastUpdateDate: currentDate });
  chrome.storage.sync.set({ lastUpdateTime: currentTime });
};

const getBalance = async (token) => {
  const response = await fetch(balanceURL, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

const getWorkingIDsCampaigns = async (token) => {
  const response = await fetch(workingCampaignsURL, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const { result } = await response.json();

  return result.map(({ id }) => id);
};

const getCampaignsSpending = async (token) => {
  const workingIDsCampaigns = await getWorkingIDsCampaigns(token);

  if (workingIDsCampaigns.length === 0) return 0;

  const today = new Date().format('yyyy-mm-dd');

  const response = await fetch(statisticsURL, {
    body: `{
      "group_by": "campaign_id",
      "day_from": "${today} 00:00:00",
      "day_to": "${today} 23:59:59",
      "campaign_id": [${workingIDsCampaigns}]
      }`,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  const result = await response.json();

  return result.reduce((acc, item) => {
    return acc + item.spent;
  }, 0);
};

const getStorageData = async () => {
  return chrome.storage.sync
    .get(['prevBalance', 'spending', 'lastUpdateDate', 'lastUpdateTime'])
    .then(({ prevBalance, spending, lastUpdateDate, lastUpdateTime }) => ({
      prevBalance,
      spending,
      lastUpdateDate,
      lastUpdateTime,
    }));
};

const checkTokenIsValid = async (token) => {
  try {
    const response = await fetch(balanceURL, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.status !== 401;
  } catch (err) {
    return false;
  }
};

const startNewSession = (token) => {
  setToken(token);
  chrome.runtime.reload();
};

const main = async (token) => {
  const isValidToken = await checkTokenIsValid(token);

  if (!isValidToken) {
    chrome.runtime.onMessage.addListener((req, info, cb) => {
      if (req.action === 'popup_opened') {
        cb('AuthorizationFailed');
      }
    });
  } else {
    // timer
    chrome.alarms.create('updater', {
      when: Date.now(),
      periodInMinutes: 5,
    });

    // updater
    chrome.alarms.onAlarm.addListener((alarm) => {
      try {
        getBalance(token).then((currentBalance) => {
          if (alarm.name === 'updater') {
            getStorageData().then(
              ({ prevBalance, spending, lastUpdateDate }) => {
                const currentDate = new Date().format('dd-mm-yyyy');
                const currentTime = new Date().format('hh:MM');

                if (
                  prevBalance - currentBalance !== 0 ||
                  lastUpdateDate !== currentDate
                ) {
                  setBalance(currentBalance);
                  getCampaignsSpending(token).then((spending) => {
                    setSpending(spending);
                    setLastUpdate({ currentDate, currentTime });
                    setBadge(spending);
                  });
                } else {
                  setLastUpdate({ currentDate, currentTime });
                  setBadge(spending);
                }
              }
            );
          }
        });
      } catch (e) {
        console.error(e);
      }
    });
  }
};

// entry point
chrome.storage.sync.get('token', ({ token }) => {
  main(token);
});

// options listener
chrome.runtime.onMessage.addListener((req, info, cb) => {
  if (req.action === 'get_token') startNewSession(req.token);
});

// popup listener
chrome.runtime.onMessage.addListener((req, info, cb) => {
  if (req.action === 'popup_opened') {
    getStorageData().then(({ prevBalance, spending, lastUpdateTime }) => {
      cb({
        prevBalance,
        spending: spending.toFixed(3),
        lastUpdateTime,
      });
    });
  }
  return true;
});
