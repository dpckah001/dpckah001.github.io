(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* HUD clock — formatted like your waybar (HH:MM:SS) */
  var clk = document.getElementById('hud-clock');
  if (clk) {
    var tick = function () {
      var d = new Date(), p = function (n) { return String(n).padStart(2, '0'); };
      clk.textContent = p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
    };
    tick(); setInterval(tick, 1000);
  }

  /* scroll reveal — fire once, cheap */
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* reading progress bar (post pages) — transform only, GPU friendly */
  var bar = document.getElementById('read-bar');
  if (bar) {
    var onScroll = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? h.scrollTop / max : 0) + ')';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Build a table of contents from the rendered article headings. */
  var article = document.querySelector('.article');
  var toc = document.getElementById('article-toc');
  if (article && toc) {
    var tocList = toc.querySelector('ol');
    var headings = article.querySelectorAll('.article-content h1, .article-content h2, .article-content h3');
    var slugCounts = {};
    headings.forEach(function (heading) {
      var baseSlug = heading.textContent.trim().toLowerCase()
        .replace(/[^\w\u4e00-\u9fff\s-]/g, '').replace(/[\s-]+/g, '-');
      var slug = baseSlug || 'section';
      slugCounts[slug] = (slugCounts[slug] || 0) + 1;
      if (slugCounts[slug] > 1) slug += '-' + slugCounts[slug];
      heading.id = heading.id || slug;
      var item = document.createElement('li');
      if (heading.tagName === 'H3') item.className = 'toc-subitem';
      var link = document.createElement('a');
      link.href = '#' + heading.id;
      link.textContent = heading.textContent;
      item.appendChild(link);
      tocList.appendChild(item);
    });
    if (!headings.length) toc.hidden = true;
  }

  /* rare ambient glitch on the homepage title — dedsec pulse, mostly still */
  if (!reduce) {
    var g = document.querySelector('.site-head .glitch');
    if (g) {
      var fire = function () {
        g.classList.add('on');
        setTimeout(function () { g.classList.remove('on'); }, 420);
        setTimeout(fire, 5000 + Math.random() * 6000);
      };
      setTimeout(fire, 3000);
    }
  }

  /* theme toggle button */
  var themeButton = document.getElementById('theme-toggle');
  if (themeButton) {
    var themeRoot = document.documentElement;
    var setTheme = function (dark) {
      themeRoot.classList.toggle('dark-mode', dark);
      themeButton.textContent = dark ? '☀️' : '🌙';
      try { window.localStorage.setItem('site-theme', dark ? 'dark' : 'light'); } catch (e) {}
    };
    themeButton.addEventListener('click', function () {
      setTheme(!themeRoot.classList.contains('dark-mode'));
    });
    if (themeRoot.classList.contains('dark-mode')) {
      themeButton.textContent = '☀️';
    }
  }
})();
