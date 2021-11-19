chrome.runtime.sendMessage(
  { action: 'update_data' },
  ({ balance, spending }) => {
    render(balance, spending);
  }
);

const balance = document.getElementsByClassName('info__balance-data');
const spending = document.getElementsByClassName('info__spending-data');

const render = (balance_data, spending_data) => {
  balance[0].innerText = `$${balance_data}`;
  spending[0].innerText = `$${spending_data}`;
};
