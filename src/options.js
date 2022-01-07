const loginInput = document.getElementById('login');
const loginSet = document.getElementById('loginSet');

document.getElementById('loginSet').addEventListener('click', () => {
  if (loginInput.value.length === 48) {
    chrome.runtime.sendMessage({
      action: 'options_opened',
      token: loginInput.value,
    });
    window.close();
  } else {
    alert("test")
  }
});
