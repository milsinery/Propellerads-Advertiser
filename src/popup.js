const balance = document.getElementsByClassName('info__balance-data');
const spending = document.getElementsByClassName('info__spending-data');
const history = document.getElementsByClassName('info__history-data');

const renderLogin = () => {
  chrome.tabs.create({
    url: 'chrome://extensions/?options=' + chrome.runtime.id,
  });
};

const renderInfo = (balance_data, spending_data, history_data) => {
  balance[0].innerText = `$${balance_data}`;
  spending[0].innerText = `$${spending_data}`;

  if (history_data.length !== 0) {
    const result = [];
    for (item of history_data) {
      result.push(` ${item}`);
    }
    history[0].innerText = result.toString();
  } else {
    history[0].innerText = 'No data yet';
  }
};

chrome.runtime.sendMessage({ action: 'popup_opened' }, (data) => {
  console.log(data);
  if (data === null) {
    renderLogin();
  } else {
    renderInfo(data.nowBalance, data.spending, data.history);
  }
});
