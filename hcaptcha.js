window.addEventListener('load', function () {
    if (!navigator.clipboard) {
      document.getElementById('copybt').style.display = 'none';
    }
    document.getElementById('resp').value = '';
    const form = document.getElementById('hcaptcha-form');
    const sitekeyInput = document.getElementById('sitekey');
    let formContent = form.innerHTML;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const siteKey = urlParams.get('sitekey')
    if (siteKey && /^([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})$/.test(siteKey)) {
      formContent = `<div class="h-captcha" data-sitekey="${siteKey}"></div><br>${formContent}`;
      form.innerHTML = formContent;
      sitekeyInput.value = siteKey;
    } else {
      form.innerHTML = '<p class="error">No valid sitekey provided.</p>';
    }


    form.onsubmit = function(e) {
        e.preventDefault(); // avoid to execute the actual submit of the form.
        const resp = document.getElementsByName('h-captcha-response')[0].value;
        document.getElementById('resp').value = resp;
        window.scrollTo(0, document.body.scrollHeight);
    };
});
function copyToClipboard() {
  navigator.clipboard.writeText(document.getElementById('resp').value);
  document.getElementById('cpmessage').innerHTML = '<p>Copied to clipboard!</p>';
  setTimeout(function() {
    document.getElementById('cpmessage').innerHTML = '';
  }, 2500);
}

