const balanceText = document.getElementsByClassName('info__balance-data');
const spendingText = document.getElementsByClassName('info__spending-data');
const updateText = document.getElementsByClassName('info__update-data');

const renderOptions = () => {
  chrome.tabs.create({
    url: 'chrome://extensions/?options=' + chrome.runtime.id,
  });
};

const renderInfo = (balance, spending, lastUpdateTime) => {
  balanceText[0].innerText = `${balance}`;
  spendingText[0].innerText = `${spending}`;
  updateText[0].innerText = `Updated at ${lastUpdateTime}`;
};

chrome.runtime.sendMessage({ action: 'popup_opened' }, (data) => {
  if (data === 'AuthorizationFailed') {
    renderOptions();
  } else {
    renderInfo(data.prevBalance, data.spending, data.lastUpdateTime);
  }
});
