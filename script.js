'use strict';

(function () {
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__link');

  // --- NAV SCROLL + ACTIVE LINK ---
  function onScroll() {
    nav.classList.toggle('nav--scrolled', window.scrollY > 50);
    var y = window.scrollY + 140;
    sections.forEach(function (section) {
      if (y >= section.offsetTop && y < section.offsetTop + section.offsetHeight) {
        var id = '#' + section.id;
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === id);
        });
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- MOBILE MENU ---
  toggle.addEventListener('click', function () {
    var isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // --- FAQ ACCORDION ---
  document.querySelectorAll('.faq-item__q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.parentElement;
      var wasOpen = item.getAttribute('data-open') === 'true';
      document.querySelectorAll('.faq-item').forEach(function (other) {
        other.setAttribute('data-open', 'false');
        other.querySelector('.faq-item__q').setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.setAttribute('data-open', 'true');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --- CAROUSEL ARROWS ---
  function bindCarousel(prevId, nextId, scrollerId) {
    var prev = document.getElementById(prevId);
    var next = document.getElementById(nextId);
    var scroller = document.getElementById(scrollerId);
    if (!prev || !next || !scroller) return;
    var step = function () {
      var card = scroller.querySelector('article');
      return card ? card.offsetWidth + 24 : 320;
    };
    prev.addEventListener('click', function () { scroller.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { scroller.scrollBy({ left: step(), behavior: 'smooth' }); });
  }
  bindCarousel('svcPrev', 'svcNext', 'svcScroller');
  bindCarousel('projPrev', 'projNext', 'projScroller');

  // --- PROJECT SCREENS CAROUSEL (left -> laptop -> right -> left) ---
  var acao = document.getElementById('acaoCarousel');
  if (acao) {
    var slots = [];
    acao.querySelectorAll('.acao__slot').forEach(function (s) { slots[Number(s.dataset.slot)] = s; });
    var screens = acao.querySelectorAll('.acao__screen');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var place = function () {
      var base = acao.getBoundingClientRect();
      screens.forEach(function (img) {
        var r = slots[Number(img.dataset.pos)].getBoundingClientRect();
        img.style.left = (r.left - base.left) + 'px';
        img.style.top = (r.top - base.top) + 'px';
        img.style.width = r.width + 'px';
        img.style.height = r.height + 'px';
      });
    };

    var depthFor = function (img) { return img.dataset.pos === '1' ? 3 : 1; };
    var setDepth = function () {
      screens.forEach(function (img) { img.style.zIndex = depthFor(img); });
    };
    screens.forEach(function (img) {
      img.addEventListener('transitionend', function (e) {
        if (e.propertyName === 'left') img.style.zIndex = depthFor(img);
      });
    });

    var placeStatic = function () {
      acao.classList.add('is-static');
      place();
      void acao.offsetWidth;
      acao.classList.remove('is-static');
    };

    var rotate = function () {
      screens.forEach(function (img) {
        var from = Number(img.dataset.pos);
        var to = (from + 1) % 3;
        img.dataset.pos = String(to);
        // leaving the laptop: stay in front until it clears the frame; going right->left: pass behind it
        img.style.zIndex = (to === 1 || from === 1) ? 3 : 1;
      });
      place();
    };

    setDepth();
    placeStatic();
    window.addEventListener('load', placeStatic);
    window.addEventListener('resize', placeStatic);

    var visible = false;
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
    }, { threshold: 0.3 }).observe(acao);

    if (!reduceMotion) {
      setInterval(function () {
        if (visible && !document.hidden) rotate();
      }, 3500);
    }
  }

  // --- TESTIMONIALS ---
  var depos = [
    {
      quote: '"Matheus entendeu exatamente o que precisávamos e entregou um sistema completo, com login seguro e relatórios claros. Comunicação direta, prazos cumpridos — recomendo de olhos fechados."',
      name: 'Castro Advocacia',
      place: 'SÃO LUÍS, MA'
    }
  ];
  var current = 0;
  var quoteEl = document.getElementById('depoQuote');
  var nameEl = document.getElementById('depoName');
  var placeEl = document.getElementById('depoPlace');
  var people = document.querySelectorAll('.depo__person');

  function showDepo(i) {
    current = (i + depos.length) % depos.length;
    quoteEl.style.opacity = 0;
    setTimeout(function () {
      quoteEl.textContent = depos[current].quote;
      nameEl.textContent = depos[current].name;
      placeEl.textContent = depos[current].place;
      quoteEl.style.opacity = 1;
    }, 200);
    people.forEach(function (p, idx) { p.classList.toggle('is-active', idx === current); });
  }
  document.getElementById('depoPrev').addEventListener('click', function () { showDepo(current - 1); });
  document.getElementById('depoNext').addEventListener('click', function () { showDepo(current + 1); });
  people.forEach(function (p) {
    p.addEventListener('click', function () { showDepo(Number(p.dataset.index)); });
  });

  // --- YEAR ---
  document.getElementById('currentYear').textContent = new Date().getFullYear();
})();
