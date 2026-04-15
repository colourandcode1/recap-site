(function () {
  'use strict';

  /* ── Install snippet: click to copy ───────────────────── */
  var snippet = document.getElementById('install-snippet');
  if (snippet) {
    function doCopy() {
      var text = snippet.querySelector('code').textContent.trim();
      var label = snippet.querySelector('.copy-label');

      function markCopied() {
        label.textContent = 'Copied!';
        snippet.classList.add('copied');
        setTimeout(function () {
          label.textContent = 'Copy';
          snippet.classList.remove('copied');
        }, 2000);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(markCopied).catch(fallback);
      } else {
        fallback();
      }

      function fallback() {
        try {
          var ta = document.createElement('textarea');
          ta.value = text;
          ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;';
          document.body.appendChild(ta);
          ta.focus();
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          markCopied();
        } catch (e) { /* silent fail */ }
      }
    }

    snippet.addEventListener('click', doCopy);
    snippet.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        doCopy();
      }
    });
  }

  /* ── Try-it demo: click → ✓ indicator ─────────────────── */
  document.querySelectorAll('.try-demo button').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();

      /* Remove any existing indicator right after this button */
      var next = btn.nextSibling;
      if (next && next.classList && next.classList.contains('click-indicator')) {
        next.remove();
      }

      var indicator = document.createElement('span');
      indicator.className = 'click-indicator';
      indicator.textContent = ' ✓';
      indicator.style.cssText =
        'color:#0066cc;font-size:0.875em;margin-left:3px;' +
        'opacity:0;transition:opacity 0.15s;pointer-events:none;';

      btn.parentNode.insertBefore(indicator, btn.nextSibling);

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          indicator.style.opacity = '1';
        });
      });

      setTimeout(function () {
        indicator.style.opacity = '0';
        setTimeout(function () {
          if (indicator.parentNode) indicator.remove();
        }, 200);
      }, 900);
    });
  });

})();
