/* 交互：顶栏状态 / 移动端导航 / 滚动进场（无依赖） */
(function () {
  var header = document.querySelector('.site-header');
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');

  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-solid', window.scrollY > 40);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e, i) {
      if (!e.isIntersecting) return;
      var el = e.target;
      var siblings = Array.prototype.slice.call(el.parentElement.children).filter(function (n) {
        return n.classList && n.classList.contains('reveal');
      });
      var idx = Math.max(0, siblings.indexOf(el));
      el.style.transitionDelay = Math.min(idx * 90, 360) + 'ms';
      el.classList.add('is-in');
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
  items.forEach(function (el) { io.observe(el); });
})();
