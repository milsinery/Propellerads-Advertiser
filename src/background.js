const balanceURL = 'https://ssp-api.propellerads.com/v5/adv/balance';
const campaignList = 'https://ssp-api.propellerads.com/v5/adv/campaigns?status%5B%5D=6&status%5B%5D=5&status%5B%5D=7&status%5B%5D=8&is_archived=0&page_size=1000';
const statisticsURL = 'https://ssp-api.propellerads.com/v5/adv/statistics'; 
const addFunds = 'https://partners.propellerads.com/#/finance/add';
const iconUrl = "/src/icons/Icon128.png";

const statusColors = {
  colorNormalBalance: '#84CCFF',
  colorLowBalance: '#FFBB33',
  colorCriticalBalance: '#EB1616',
}

const dateFormatter = (date, format) => {
  const replaces = {
    yyyy: date.getFullYear(),
    mm: ('0' + (date.getMonth() + 1)).slice(-2),
    dd: ('0' + date.getDate()).slice(-2),
    hh: ('0' + date.getHours()).slice(-2),
    MM: ('0' + date.getMinutes()).slice(-2),
    ss: ('0' + date.getSeconds()).slice(-2),
  };

  let result = format;

  for (const replace in replaces) {
    result = result.replace(replace, replaces[replace]);
  }

  return result;
};

const sendMessage = (id, title, message, buttons, iconUrl) => chrome.notifications.create(id, { type: "basic", title, message, iconUrl, buttons }, () => setLastNotify(Date.now()));

const notifyAboutLowDailyBudgetCampain = (campaigns, lastNotificationTime, interval) => {
  if(!lastNotificationTime) setLastNotify(Date.now() - interval); // first initialization
  if(!campaigns || campaigns.length < 1) return;
  if (Date.now() - lastNotificationTime < interval) return; 
  const buttons = [{ title: 'Close' }];

  sendMessage('10', 'Low daily budget', `You have ${campaigns.length} ${campaigns.length > 1 ? "campaigns" : "campaign"} with a daily budget of less than 20%.`, buttons, iconUrl);
}

const notifyAboutBalance = (currentBalance, prevBalance, lastNotificationTime, interval) => {
  if(!lastNotificationTime) setLastNotify(Date.now() - interval); // first initialization
  if (Date.now() - lastNotificationTime < interval) return; 

  const fixedCurrentBalance = parseInt(currentBalance);
  const fixedprevBalance = parseInt(prevBalance);
  const buttons = [{ title: 'Top up now' }, { title: 'Later' }];

  if(fixedCurrentBalance <= 0) sendMessage('01', 'Empty balance', `Your current balance is $0 or less.`, buttons, iconUrl);
  if (fixedCurrentBalance > 0 && fixedCurrentBalance < 50) sendMessage('02', 'Low balance', `Your current balance less than $50.`, buttons, iconUrl);
  if (fixedCurrentBalance < fixedprevBalance / 2) sendMessage('03', 'Your balance is fast ending', `In half an hour he has changed from ${prevBalance} to ${currentBalance}.`, buttons, iconUrl);
}

const setToken = (key) => chrome.storage.sync.set({ token: key });

const setBadge = (balance) => {
  const numberFormatterForBadge = (num) => {
    const formatedNum = parseInt(num);

    if (formatedNum === 0) return formatedNum.toString();
    if (formatedNum < 10) return formatedNum.toString();
    if (formatedNum >= 10 && formatedNum <= 99) return num.toFixed(2).toString();
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
  
  chrome.action.setBadgeText({ text: numberFormatterForBadge(balance) });
};

const calculateBalanceStatusColor = (balance) => {
  const formatedBalance = parseInt(balance);
  return formatedBalance < 50 && formatedBalance > 0 ? "colorLowBalance" : formatedBalance <= 0 ? "colorCriticalBalance" : "colorNormalBalance";
}

const setBadgeColor = (color) => chrome.action.setBadgeBackgroundColor({ color: statusColors[color] });

const setBalance = (balance) => chrome.storage.sync.set({ prevBalance: balance });

const setSpending = (spending) => chrome.storage.sync.set({ spending });

const setSProfit = (profit) => chrome.storage.sync.set({ profit });

const setBalanceStatusColor = (balanceStatusColor) => chrome.storage.sync.set({ balanceStatusColor });

const setLastUpdate = () => {
  const today = new Date();
  const currentDate = dateFormatter(today, 'dd-mm-yyyy');
  const currentTime = dateFormatter(today, 'hh:MM');

  chrome.storage.sync.set({ lastUpdateDate: currentDate });
  chrome.storage.sync.set({ lastUpdateTime: currentTime });
};

const setLastNotify = (time) => chrome.storage.sync.set({ lastNotifyTime: time });

const setMostProfitableCampaigns = (mostProfitableCampaigns) => chrome.storage.sync.set({ mostProfitableCampaigns });

const setMostSpentCampaigns = (campaigns) => chrome.storage.sync.set({ mostSpentCampaigns: campaigns });

const setCampaignsWithLowDailyBudget = (campaigns) => chrome.storage.sync.set({ campaignsWithLowDailyBudget: campaigns });

const getBalance = async (token) => {
  const appVersion = chrome.runtime.getManifest().version;

  const headers = new Headers({
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'X-PropellerAds-Advertiser': appVersion,
  });

  const response = await fetch(balanceURL, {
    headers: headers
  });

  const balance = await response.json();

  return balance;
};

const isLowBudget = (spent, limit) => { 
  const percentOfLimit = limit * 0.2;
 
  return limit - spent <= percentOfLimit;
};

const getCampaignList = async (token) => {
  const response = await fetch(campaignList, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const { result } = await response.json();

  return result;
};

const getStatistics = async (token) => {
  const today = dateFormatter(new Date(), 'yyyy-mm-dd');

  const headers = new Headers({
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  const response = await fetch(statisticsURL, {
    body: `{
      "group_by": "campaign_id",
      "day_from": "${today} 00:00:00",
      "day_to": "${today} 23:59:59"
      }`,
    headers: headers,
    method: 'POST'
  }); 

  const campaigns = await response.json(); 

  return campaigns;
};

const getCampaignWithLowDailyBudget = async (token, statistics) => {
  if(statistics.length === 0) return [];

  const campaignList = await getCampaignList(token);

  if(campaignList.length === 0) return [];

  const campaignListWithTotalLimits = campaignList.filter(({limit_daily_amount}) => limit_daily_amount !== null);
  const statisticsWithSpent = statistics.filter(({spent}) => spent > 0);

  const result = [];

  for (let i = 0; i < campaignListWithTotalLimits.length; i++) {
    const obj1 = campaignListWithTotalLimits[i];
    
    for (let j = 0; j < statisticsWithSpent.length; j++) {
      const obj2 = statisticsWithSpent[j];
      
      if (obj1.id === obj2.campaign_id) {
        result.push({ campaign_id: obj1.id, campaign_name: obj1.name, limit_daily_amount: obj1.limit_daily_amount, spent: obj2.spent});
        break;
      }
    }
  }

  const campaignsWithLowDailyLimit = result.filter(item => isLowBudget(item.spent, item.limit_daily_amount));

  return campaignsWithLowDailyLimit;
}

const getTotalByProperty = (campaigns, property) => { 
  if(campaigns.length < 1) return 0;
  return campaigns.reduce((acc, item) => acc + item[property], 0);
};

const getMostCampaignsByProperty = (campaigns, property, maxNum=3) => {
  if(campaigns.length < 1) return [];

  const campaignsByProperty = campaigns.filter(campaign => campaign[property] > 0);

  return campaignsByProperty.length < 1 ? [] : campaignsByProperty.sort((a, b) => b[property] - a[property]).slice(0, maxNum);
}

const getStorageData = async () => {
  return chrome.storage.sync
    .get(['balanceStatusColor', 'prevBalance', 'spending', 'profit', 'mostProfitableCampaigns', 'mostSpentCampaigns', 'campaignsWithLowDailyBudget', 'lastUpdateDate', 'lastUpdateTime', 'lastNotifyDate', 'lastNotifyTime'])
    .then(({ balanceStatusColor, prevBalance, spending, profit, mostProfitableCampaigns, mostSpentCampaigns, campaignsWithLowDailyBudget, lastUpdateDate, lastUpdateTime, lastNotifyDate, lastNotifyTime }) => ({
      balanceStatusColor,
      prevBalance,
      spending,
      profit,
      mostProfitableCampaigns,
      mostSpentCampaigns,
      campaignsWithLowDailyBudget,
      lastUpdateDate,
      lastUpdateTime,
      lastNotifyDate, 
      lastNotifyTime
    }));
};

const checkTokenIsValid = async (token) => {
  try {
    const response = await fetch(balanceURL, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
    });

    return response.status !== 401;
  } catch (err) {
    return false;
  }
};

const startNewSession = (token) => {
  chrome.storage.sync.clear();
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
      periodInMinutes: 60,
    });
    
    // updater
    chrome.alarms.onAlarm.addListener((alarm) => {
      if (alarm.name === 'updater') {
        getBalance(token).then((currentBalance) => {
          setBalance(currentBalance);
          setBadge(currentBalance);

          getStorageData().then(({ prevBalance, lastNotifyTime }) => {
            notifyAboutBalance(currentBalance, prevBalance, lastNotifyTime, 180000);
          });  

          const balanceStatusColor = calculateBalanceStatusColor(currentBalance);
          setBadgeColor(balanceStatusColor);
          setBalanceStatusColor(balanceStatusColor);
        });

        getStatistics(token).then((campaigns) => {
          const spending = getTotalByProperty(campaigns, "spent");
          const profit = getTotalByProperty(campaigns, "profit");
          const mostProfitableCampaigns = getMostCampaignsByProperty(campaigns, "profit");
          const mostSpentCampaigns = getMostCampaignsByProperty(campaigns, "spent");
          
          getCampaignWithLowDailyBudget(token, campaigns).then(campaigns => {
            setCampaignsWithLowDailyBudget(campaigns);
          });

          getStorageData().then(({ campaignsWithLowDailyBudget, lastNotifyTime }) => {
            notifyAboutLowDailyBudgetCampain(campaignsWithLowDailyBudget, lastNotifyTime, 180000);
          });  

          setSpending(spending);
          setSProfit(profit);
          setMostProfitableCampaigns(mostProfitableCampaigns);
          setMostSpentCampaigns(mostSpentCampaigns);
          setLastUpdate();
        });
      }
    });
  }
};

// options listener
chrome.runtime.onMessage.addListener((req, info, cb) => {
  if (req.action === 'get_token') startNewSession(req.token);
  return true;
});

// popup listener
chrome.runtime.onMessage.addListener((req, info, cb) => {
  if (req.action === 'popup_opened') {
    getStorageData().then(({ balanceStatusColor, prevBalance, spending, profit, mostProfitableCampaigns, mostSpentCampaigns, campaignsWithLowDailyBudget, lastUpdateTime }) => {
      cb({
        balanceStatusColor,
        prevBalance,
        spending: spending,
        profit: profit,
        mostProfitableCampaigns,
        mostSpentCampaigns,
        campaignsWithLowDailyBudget,
        lastUpdateTime,
      });
    });
  }
  return true;
});

// notification buttons listener
chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
  if (notificationId === '01' || notificationId === '02' || notificationId === '03') {
    if (buttonIndex === 0) chrome.tabs.create({ url: addFunds });
    if (buttonIndex === 1) chrome.notifications.clear(notificationId, () => {});
  }

  if (notificationId === '10') {
    if (buttonIndex === 0) chrome.notifications.clear(notificationId, () => {});
  }
});

// entry point
chrome.storage.sync.get('token', ({ token }) => {
  main(token);
});