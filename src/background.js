const url = 'https://ssp-api.propellerads.com/v5/adv/balance';
const token = '9f0c0095c2f6232ab841ff131b4a7e104f4e3f1ee63602f0';
const data = { balance: 0, spending: 0 };

const updater = () => {
  fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then(
      (result) => {
        chrome.storage.sync.get(['lastDateOfCheck'], function (res) {
          if (res.lastDateOfCheck - new Date().getDate() !== 0) {
            chrome.storage.sync.set({ startBalance: result });
          }

          chrome.storage.sync.set({ lastDateOfCheck: new Date().getDate() });
        });

        chrome.storage.sync.get(['startBalance'], function (res) {
          if (res.startBalance === undefined) {
            chrome.storage.sync.set({ startBalance: result });
          }
          data.spending = (res.startBalance - result).toFixed(2).toString();
          chrome.action.setBadgeText({
            text: (res.startBalance - result).toFixed(2).toString(),
          });
        });

        chrome.storage.sync.get(['newBalance'], function (res) {
          data.balance = res.newBalance;
          chrome.storage.sync.set({ newBalance: result });
        });

        chrome.action.setBadgeBackgroundColor({
          color: result < 5 ? 'red' : '#0080FF',
        });
      },
      (error) => {
        console.log(error);
      }
    );
};

chrome.alarms.create('updater', {
  when: Date.now(),
  periodInMinutes: 1,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'updater') updater();
});

chrome.runtime.onMessage.addListener((req, info, cb) => {
  if (req.action === 'update_data') {
    updater();
    cb(data);
  }
});
