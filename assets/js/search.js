(function () {
  var input = document.getElementById('search-input');
  var box = document.getElementById('search-results');
  if (!input || !box) return;
  var data = [];

  fetch((window.__baseurl || '') + '/search.json')
    .then(function (r) { return r.json(); })
    .then(function (d) { data = d; })
    .catch(function () {});

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function render(q) {
    q = q.trim().toLowerCase();
    if (!q) { box.classList.remove('open'); box.innerHTML = ''; return; }
    var hits = data.filter(function (p) {
      return p.title.toLowerCase().indexOf(q) > -1 ||
             p.body.toLowerCase().indexOf(q) > -1;
    }).slice(0, 6);

    if (!hits.length) {
      box.innerHTML = '<div class="empty">&gt; no match — target not found</div>';
    } else {
      box.innerHTML = hits.map(function (p) {
        return '<a role="option" href="' + p.url + '">&gt; ' + esc(p.title) +
               '<br><span class="meta">' + esc(p.date) + '</span></a>';
      }).join('');
    }
    box.classList.add('open');
  }

  input.addEventListener('input', function () { render(this.value); });
  input.addEventListener('focus', function () { if (this.value) render(this.value); });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.search')) box.classList.remove('open');
  });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { box.classList.remove('open'); this.blur(); }
  });
})();
