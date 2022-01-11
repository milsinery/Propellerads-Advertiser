const balanceText = document.getElementsByClassName('info__balance-data');
const spendingText = document.getElementsByClassName('info__spending-data');
const historyText = document.getElementsByClassName('info__history-data');

const renderLogin = () => {
  chrome.tabs.create({
    url: 'chrome://extensions/?options=' + chrome.runtime.id,
  });
};

const renderInfo = (balance, spending, history) => {
  balanceText[0].innerText = `$${balance}`;
  spendingText[0].innerText = `$${spending}`;

  if (history.length !== 0) {
    const result = [];
    for (item of history) {
      result.push(` ${item}`);
    }
    historyText[0].innerText = result.toString();
  } else {
    historyText[0].innerText = 'No data yet';
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
