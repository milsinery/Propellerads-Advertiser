const loginInput = document.getElementById('login');
const loginSet = document.getElementById('loginSet');

document.getElementById('loginSet').addEventListener('click', function () {
  chrome.runtime.sendMessage({ action: 'options_opened', token:  loginInput.value });
});
