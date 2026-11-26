(function () {
  'use strict';

  /* ── Primary CTA: open the Recap panel directly ────────── */
  var openPanelBtn = document.getElementById('open-panel-btn');
  if (openPanelBtn) {
    openPanelBtn.addEventListener('click', function () {
      /* The UMD build nests the API under `.default`; fall back to the
         flat shape in case a future release exposes it directly. */
      var api = window.Recap && (window.Recap.default || window.Recap);
      if (api && typeof api.openPanel === 'function') {
        api.openPanel();
      }
    });
  }

  /* ── Closing CTA: copy install command ─────────────────── */
  var copyBtn = document.getElementById('copy-install-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var text = 'npm install recap-ux';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      }
      var original = copyBtn.textContent;
      copyBtn.textContent = 'Copied';
      setTimeout(function () { copyBtn.textContent = original; }, 1500);
    });
  }

})();
