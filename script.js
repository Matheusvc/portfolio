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
    var step = function () {
      var card = scroller.querySelector('article');
      return card ? card.offsetWidth + 24 : 320;
    };
    prev.addEventListener('click', function () { scroller.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { scroller.scrollBy({ left: step(), behavior: 'smooth' }); });
  }
  bindCarousel('svcPrev', 'svcNext', 'svcScroller');
  bindCarousel('projPrev', 'projNext', 'projScroller');

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
