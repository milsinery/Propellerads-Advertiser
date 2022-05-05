// elements for translation
const spentTitle = document.getElementsByClassName('info__title_spent');
const statisticsLink = document.getElementsByClassName('info__statistics-link');
const balanceTitle = document.getElementsByClassName('info__title-balance');
const addFundsLink = document.getElementsByClassName('info__add-funds-link');
const updateData = document.getElementsByClassName('info__update-title');
const specialTitle = document.getElementsByClassName('info__special_title');
const specialDescription = document.getElementsByClassName('info__special_description');

// elements for data
const spendingText = document.getElementsByClassName('info__spending-data');
const balanceText = document.getElementsByClassName('info__balance-data');
const updateText = document.getElementsByClassName('info__update-data');

const renderOptions = () => {
  chrome.tabs.create({
    url: 'chrome://extensions/?options=' + chrome.runtime.id,
  });
};

const renderInfo = (balance, spending, lastUpdateTime) => {
  // text translation
  spentTitle[0].innerText = `${chrome.i18n.getMessage('popup_spent')} $`;
  statisticsLink[0].innerText = chrome.i18n.getMessage('popup_statistics');
  balanceTitle[0].innerText = `${chrome.i18n.getMessage('popup_balance')} $`;
  addFundsLink[0].innerText = chrome.i18n.getMessage('popup_add_funds');
  updateData[0].innerText = chrome.i18n.getMessage('popup_updated_info');
  specialTitle[0].innerText = chrome.i18n.getMessage('popup_promo_app_title');
  specialDescription[0].innerText = chrome.i18n.getMessage('popup_promo_app_description');

  // data setting
  balanceText[0].innerText = `${balance}`;
  spendingText[0].innerText = `${spending}`;
  updateText[0].innerText = `${lastUpdateTime}`;
};

chrome.runtime.sendMessage({ action: 'popup_opened' }, (data) => {
  if (data === 'AuthorizationFailed') {
    renderOptions();
  } else {
    renderInfo(data.prevBalance, data.spending, data.lastUpdateTime);
  }
});
