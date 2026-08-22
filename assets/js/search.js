(function () {
  var input = document.getElementById('search-input');
  var box = document.getElementById('search-results');
  if (!input || !box) return;
  var data = [];

  // Try fetching search index from a few sensible locations.
  var fetchIndex = function () {
    var base = window.__baseurl || '';
    var paths = [base + '/search.json', base + 'search.json', '/search.json', 'search.json'];
    return paths.reduce(function (p, url) {
      return p.catch(function () {
        return fetch(url).then(function (r) {
          if (!r.ok) throw new Error('bad status ' + r.status);
          return r.json();
        });
      });
    }, Promise.reject()).catch(function (err) {
      console.error('search index load failed:', err);
      return [];
    });
  };

  fetchIndex().then(function (d) { data = d || []; });

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function render(q) {
    q = q.trim().toLowerCase();
    if (!q) { box.classList.remove('open'); box.innerHTML = ''; return; }
    var terms = q.split(/\s+/).filter(Boolean);
    if (!Array.isArray(data) || !data.length) {
      box.innerHTML = '<div class="empty">&gt; 无搜索索引 — 请稍后重试</div>';
      box.classList.add('open');
      return;
    }
    var hits = data.filter(function (p) {
      var title = (p.title || '').toString().toLowerCase();
      var body = (p.body || '').toString().toLowerCase();
      var tags = (p.tags || []).join(' ').toLowerCase();
      var haystack = title + ' ' + tags + ' ' + body;
      return terms.every(function (term) { return haystack.indexOf(term) > -1; });
    }).slice(0, 8);

    if (!hits.length) {
      box.innerHTML = '<div class="empty">&gt; 未找到匹配结果</div>';
    } else {
      box.innerHTML = hits.map(function (p) {
        var text = (p.body || '').toString().replace(/\s+/g, ' ');
         var lowerText = text.toLowerCase();
         var matchAt = lowerText.indexOf(terms[0]);
         var start = matchAt > 70 ? matchAt - 70 : 0;
         var snippet = text.slice(start, start + 150);
         if (start > 0) snippet = '...' + snippet;
         if (start + 150 < text.length) snippet += '...';
        return '<a role="option" href="' + p.url + '">&gt; ' + esc(p.title) +
           '<br><span class="meta">' + esc(p.date) + '</span>' +
           '<br><span class="snippet">' + esc(snippet) + '</span></a>';
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
