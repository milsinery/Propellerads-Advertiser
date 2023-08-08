const lightPadColors = {
  colorNormalBalance: 'linear-gradient(180deg, #CCE6FF 0%, rgba(204, 230, 255, 0.991353) 6.67%, rgba(206, 230, 255, 0.96449) 13.33%, rgba(208, 232, 255, 0.91834) 20%, rgba(212, 233, 255, 0.852589) 26.67%, rgba(216, 235, 255, 0.768225) 33.33%, rgba(221, 238, 255, 0.668116) 40%, rgba(227, 241, 255, 0.557309) 46.67%, rgba(232, 244, 255, 0.442691) 53.33%, rgba(238, 247, 255, 0.331884) 60%, rgba(243, 249, 255, 0.231775) 66.67%, rgba(247, 251, 255, 0.147411) 73.33%, rgba(251, 253, 255, 0.0816599) 80%, rgba(253, 254, 255, 0.03551) 86.67%, rgba(255, 255, 255, 0.0086472) 93.33%, rgba(255, 255, 255, 0) 100%)',
  colorLowBalance: 'linear-gradient(180deg, #FFEECC 0%, rgba(255, 238, 204, 0.991353) 6.67%, rgba(255, 239, 206, 0.96449) 13.33%, rgba(255, 239, 208, 0.91834) 20%, rgba(255, 241, 212, 0.852589) 26.67%, rgba(255, 242, 216, 0.768225) 33.33%, rgba(255, 244, 221, 0.668116) 40%, rgba(255, 246, 227, 0.557309) 46.67%, rgba(255, 247, 232, 0.442691) 53.33%, rgba(255, 249, 238, 0.331884) 60%, rgba(255, 251, 243, 0.231775) 66.67%, rgba(255, 252, 247, 0.147411) 73.33%, rgba(255, 254, 251, 0.0816599) 80%, rgba(255, 254, 253, 0.03551) 86.67%, rgba(255, 255, 255, 0.0086472) 93.33%, rgba(255, 255, 255, 0) 100%)',
  colorCriticalBalance: 'linear-gradient(180deg, #FFCCCC 0%, rgba(255, 204, 204, 0.991353) 6.67%, rgba(255, 206, 206, 0.96449) 13.33%, rgba(255, 208, 208, 0.91834) 20%, rgba(255, 212, 212, 0.852589) 26.67%, rgba(255, 216, 216, 0.768225) 33.33%, rgba(255, 221, 221, 0.668116) 40%, rgba(255, 227, 227, 0.557309) 46.67%, rgba(255, 232, 232, 0.442691) 53.33%, rgba(255, 238, 238, 0.331884) 60%, rgba(255, 243, 243, 0.231775) 66.67%, rgba(255, 247, 247, 0.147411) 73.33%, rgba(255, 251, 251, 0.0816599) 80%, rgba(255, 253, 253, 0.03551) 86.67%, rgba(255, 255, 255, 0.0086472) 93.33%, rgba(255, 255, 255, 0) 100%)',
}

const darkPadColors = {
  colorNormalBalance: 'linear-gradient(180deg, rgba(0, 51, 102, 0.5) 0%, rgba(0, 51, 101, 0.5) 6.67%, rgba(2, 51, 100, 0.5) 13.33%, rgba(4, 50, 97, 0.5) 20%, rgba(6, 50, 93, 0.5) 26.67%, rgba(10, 49, 89, 0.5) 33.33%, rgba(15, 49, 83, 0.5) 40%, rgba(19, 48, 76, 0.5) 46.67%, rgba(25, 47, 70, 0.5) 53.33%, rgba(29, 46, 63, 0.5) 60%, rgba(34, 46, 57, 0.5) 66.67%, rgba(38, 45, 53, 0.5) 73.33%, rgba(40, 45, 49, 0.5) 80%, rgba(42, 44, 46, 0.5) 86.67%, rgba(44, 44, 45, 0.5) 93.33%, rgba(44, 44, 44, 0.5) 100%)',
  colorLowBalance: 'linear-gradient(180deg, rgba(102, 68, 0, 0.5) 0%, rgba(101, 68, 0, 0.5) 6.67%, rgba(100, 67, 2, 0.5) 13.33%, rgba(97, 66, 4, 0.5) 20%, rgba(93, 64, 6, 0.5) 26.67%, rgba(89, 62, 10, 0.5) 33.33%, rgba(83, 60, 15, 0.5) 40%, rgba(76, 57, 19, 0.5) 46.67%, rgba(70, 55, 25, 0.5) 53.33%, rgba(63, 52, 29, 0.5) 60%, rgba(57, 50, 34, 0.5) 66.67%, rgba(53, 48, 38, 0.5) 73.33%, rgba(49, 46, 40, 0.5) 80%, rgba(46, 45, 42, 0.5) 86.67%, rgba(45, 44, 44, 0.5) 93.33%, rgba(44, 44, 44, 0.5) 100%)',
  colorCriticalBalance: 'linear-gradient(180deg, rgba(102, 0, 0, 0.5) 0%, rgba(101, 0, 0, 0.5) 6.67%, rgba(100, 2, 2, 0.5) 13.33%, rgba(97, 4, 4, 0.5) 20%, rgba(93, 6, 6, 0.5) 26.67%, rgba(89, 10, 10, 0.5) 33.33%, rgba(83, 15, 15, 0.5) 40%, rgba(76, 19, 19, 0.5) 46.67%, rgba(70, 25, 25, 0.5) 53.33%, rgba(63, 29, 29, 0.5) 60%, rgba(57, 34, 34, 0.5) 66.67%, rgba(53, 38, 38, 0.5) 73.33%, rgba(49, 40, 40, 0.5) 80%, rgba(46, 42, 42, 0.5) 86.67%, rgba(45, 44, 44, 0.5) 93.33%, rgba(44, 44, 44, 0.5) 100%)',
}

const balanceColors = {
  colorBetterBalance: '#00B359',
  colorNormalBalance: 'init',
  colorLowBalance: '#F79A2C',
  colorCriticalBalance: '#EB1616',
};

const getCorrectColor = (status) => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
    return darkPadColors[status];
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return lightPadColors[status];
  } else {
    return 'init';
  }
}

// sections visible by condition
const profitCampaignsSection = document.getElementsByClassName('info__profit-campaigns-section');
const spentCampaignsSection = document.getElementsByClassName('info__spent-campaigns-section');
const lowDailyCampaignsSection = document.getElementsByClassName('info__low-daily-campaigns-section');
const description = document.getElementsByClassName('info__description');

const renderMainBlock = ( { balanceStatusColor, spending, balance, profit } ) => {
  // elements for translation
  const spentTitle = document.getElementsByClassName('info__title_spent');
  const statisticsLink = document.getElementsByClassName('info__statistics-link');
  const balanceTitle = document.getElementsByClassName('info__title-balance');
  const addFundsLink = document.getElementsByClassName('info__add-funds-link');
  const profitTitle = document.getElementsByClassName('info__title-profit');
  const profitCampaignsTitle = document.getElementsByClassName('info__title-profit-campaigns');
  const spentCampaignsTitle = document.getElementsByClassName('info__title-spent-campaigns');
  const lowDailyCampaignsTitle = document.getElementsByClassName('info__title-low-daily-campaigns');
  const descriptionText = document.getElementsByClassName('info__description-text');
  const updateData = document.getElementsByClassName('info__update-title');

  // elements for data
  const spendingText = document.getElementsByClassName('info__spending-data');
  const balanceText = document.getElementsByClassName('info__balance-data');
  const profitText = document.getElementsByClassName('info__profit-data');

  // text translation
  balanceTitle[0].innerText = `${chrome.i18n.getMessage('popup_balance')}, $ ·`;
  addFundsLink[0].innerText = chrome.i18n.getMessage('popup_add_funds');
  spentTitle[0].innerText = `${chrome.i18n.getMessage('popup_spent')} ·`;
  statisticsLink[0].innerText = chrome.i18n.getMessage('popup_statistics');
  profitTitle[0].innerText = `${chrome.i18n.getMessage('popup_profit')}`;
  profitCampaignsTitle[0].innerText = `${chrome.i18n.getMessage('popup_most_profitable_campaigns')}`;
  spentCampaignsTitle[0].innerText = `${chrome.i18n.getMessage('popup_most_spent_campaigns')}`;
  lowDailyCampaignsTitle[0].innerText = `${chrome.i18n.getMessage('popup_low_daily_campaigns')}`;
  descriptionText[0].innerText = `${chrome.i18n.getMessage('popup_description')}`;
  updateData[0].innerText = chrome.i18n.getMessage('popup_updated_info');

  // setting data
  spendingText[0].innerText = `${spending.toFixed(3)}`;
  balanceText[0].innerText = `${balance}`;
  profitText[0].innerText = `${profit.toFixed(3)}`;

  // painting balance text and pad
  mainSection[0].style.background = getCorrectColor(balanceStatusColor);
  balanceText[0].style.color = balanceColors[balanceStatusColor];
};

const renderCampaignsList = (campaigns, key) => {
  const fillData = ( htmlLink, htmlName, htmlData, htmlMeta, { campaign_name, profit, campaign_id } ) => {
    htmlLink.href = "https://partners.propellerads.com/#/statistics/" + campaign_id;
    htmlName.innerText = campaign_name;
    htmlData.innerText = profit;
    htmlMeta.innerText = campaign_id;
  }

  const setCampaignToCampaignsList = (profitCampaignsList, campaign) => {
    const campaignTemplate = document.getElementsByClassName('template-campaign');
    const mockup = campaignTemplate[0].content.cloneNode(true);
    profitCampaignsList[0].appendChild(mockup);

    const campaignLink = document.getElementsByClassName('campaign__link');
    const campaignName = document.getElementsByClassName('campaign__name');
    const campaignData = document.getElementsByClassName('campaign__data');
    const campaignMeta = document.getElementsByClassName('campaign__meta');

 
    fillData(campaignLink[0], campaignName[0], campaignData[0], campaignMeta[0], campaign);

    campaignLink[0].className = "campaign";
    campaignName[0].className = "name";
    campaignData[0].className = "data";
    campaignMeta[0].className = "meta";
  }

  const profitCampaignsList = document.getElementsByClassName(key);

  for(campaign of campaigns) {
    setCampaignToCampaignsList(profitCampaignsList, campaign);
  }
}

const renderUpdateDate = (lastUpdateTime) => {
  const updateText = document.getElementsByClassName('info__update-data');
  updateText[0].innerText = `${lastUpdateTime}`;
}

//elements for rendering
const mainSection = document.getElementsByClassName('info__main-section');

const renderOptions = () => chrome.tabs.create({url: 'chrome://extensions/?options=' + chrome.runtime.id});

const renderInfo = ( balanceStatusColor='colorNormalBalance', spending = 0.000, balance = 0.00, profit = 0.000, mostProfitableCampaigns=[], mostSpentCampaigns=[], campaignsWithLowDailyBudget=[], lastUpdateTime="now" ) => {
  renderMainBlock( { balanceStatusColor, spending, balance, profit } );

  let thereIsOneSectionWithData = false;
  
  if (mostProfitableCampaigns.length === 0) {
    profitCampaignsSection[0].style.display = 'none';
  } else {
    renderCampaignsList(mostProfitableCampaigns, 'info__profit-campaigns-data');
    thereIsOneSectionWithData = true;
  }

  if (mostSpentCampaigns.length === 0) {
    spentCampaignsSection[0].style.display = 'none';
  } else {
    renderCampaignsList(mostSpentCampaigns, 'info__spent-campaigns-data');
    thereIsOneSectionWithData = true;
  }

  if (campaignsWithLowDailyBudget.length === 0) {
    lowDailyCampaignsSection[0].style.display = 'none';
  } else {
    renderCampaignsList(campaignsWithLowDailyBudget, 'info__low-daily-campaigns-data');
    thereIsOneSectionWithData = true;
  }

  if(thereIsOneSectionWithData) {
    description[0].style.display = 'none';
  }

  renderUpdateDate(lastUpdateTime);
};

chrome.runtime.sendMessage({ action: 'popup_opened' }, (data) => {
  if (data === 'AuthorizationFailed') {
    renderOptions();
  } else {
    renderInfo( data.balanceStatusColor, data.spending, data.prevBalance, data.profit, data.mostProfitableCampaigns, data.mostSpentCampaigns, data.campaignsWithLowDailyBudget ,data.lastUpdateTime );
  }
});
