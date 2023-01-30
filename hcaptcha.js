window.addEventListener('load', function () {
    if (!navigator.clipboard) {
      document.getElementById('copybt').style.display = 'none';
    }
    document.querySelector('#hcaptcha-form').onsubmit = function(e) {
      e.preventDefault(); // avoid to execute the actual submit of the form.
      const resp = document.getElementsByName('h-captcha-response')[0].value;
      document.getElementById('resp').value = resp;
      window.scrollTo(0, document.body.scrollHeight);
    };
    document.getElementById('resp').value = '';
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const siteKey = urlParams.get('sitekey');
    if (siteKey && /^([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})$/.test(siteKey)) {
      const hdiv = document.getElementById("h-captcha-div");
      hdiv.dataset.sitekey=siteKey;
      this.document.querySelector('#sitekey').value = siteKey;
      hcaptcha.render('h-captcha-div', {
        sitekey: siteKey,
      });
    } else {
      this.document.querySelector('#error2').innerHTML = 'No valid sitekey provided.';
    }
});
function copyToClipboard() {
  navigator.clipboard.writeText(document.getElementById('resp').value);
  document.getElementById('cpmessage').innerHTML = '<p>Copied to clipboard!</p>';
  setTimeout(function() {
    document.getElementById('cpmessage').innerHTML = '';
  }, 2500);
}

