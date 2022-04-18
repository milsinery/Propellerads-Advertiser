const loginInput = document.getElementById('login');
const loginSet = document.getElementById('loginSet');
const hint = document.getElementById('hint');

document.getElementById('loginSet').addEventListener('click', () => {
  if (loginInput.value.length === 48) {
    chrome.runtime.sendMessage({
      action: 'get_token',
      token: loginInput.value,
    });
    window.close();
  } else {
    hint.innerText = 'Invalid token';
  }
});

loginInput.addEventListener('click', () => {
  hint.innerHTML = `Get API token <a href="https://partners.propellerads.com/#/profile/api"target="_blank">in your account</a>`;
});
