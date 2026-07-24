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
})();
