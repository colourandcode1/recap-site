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

  /* ── Try-it demo: per-button click count in brackets ──── */
  document.querySelectorAll('.try-demo button').forEach(function (btn) {
    var countEl = btn.querySelector('.click-count');
    var count = 0;

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (!countEl) return;
      count += 1;
      countEl.textContent = '(' + count + ')';
    });
  });

  /* ── Tour tabs: swap the active tab and matching caption ── */
  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = tab.getAttribute('data-tab');

      tabs.forEach(function (t) {
        var isActive = t === tab;
        t.classList.toggle('active', isActive);
        t.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      document.querySelectorAll('[data-tab-content]').forEach(function (panel) {
        panel.hidden = panel.getAttribute('data-tab-content') !== target;
      });
    });
  });

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
