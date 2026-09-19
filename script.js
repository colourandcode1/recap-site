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

})();
