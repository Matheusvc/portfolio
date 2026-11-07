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

  // --- TOOLS MARQUEE: duplicate the list so the loop is seamless ---
  var bandTrack = document.getElementById('bandTrack');
  if (bandTrack) {
    var bandClone = bandTrack.firstElementChild.cloneNode(true);
    bandClone.setAttribute('aria-hidden', 'true');
    bandClone.removeAttribute('aria-label');
    bandTrack.appendChild(bandClone);
  }

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

  // --- PROJECT SCREENS CAROUSEL (left -> laptop -> right -> left) ---
  var acao = document.getElementById('acaoCarousel');
  var acaoTabs = document.getElementById('acaoTabs');
  if (acao && acaoTabs) {
    var slots = [];
    acao.querySelectorAll('.acao__slot').forEach(function (s) { slots[Number(s.dataset.slot)] = s; });
    var screens = Array.prototype.slice.call(acao.querySelectorAll('.acao__screen'));
    var tabs = Array.prototype.slice.call(acaoTabs.querySelectorAll('.acao__tab'));
    var glare = acao.querySelector('.acao__glare');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var STEP_MS = 950;
    var busy = false;

    var rectIn = function (el, base) {
      var r = el.getBoundingClientRect();
      return { left: r.left - base.left, top: r.top - base.top, width: r.width, height: r.height };
    };

    var place = function () {
      var base = acao.getBoundingClientRect();
      screens.forEach(function (img) {
        var r = rectIn(slots[Number(img.dataset.pos)], base);
        img.style.left = r.left + 'px';
        img.style.top = r.top + 'px';
        img.style.width = r.width + 'px';
        img.style.height = r.height + 'px';
      });
      var g = rectIn(slots[1], base);
      glare.style.left = g.left + 'px';
      glare.style.top = g.top + 'px';
      glare.style.width = g.width + 'px';
      glare.style.height = g.height + 'px';
    };

    var depthFor = function (img) { return img.dataset.pos === '1' ? 3 : 1; };
    screens.forEach(function (img) {
      img.style.zIndex = depthFor(img);
      img.addEventListener('transitionend', function (e) {
        if (e.propertyName === 'left') img.style.zIndex = depthFor(img);
      });
    });

    var restartClass = function (el, cls) {
      el.classList.remove(cls);
      void el.offsetWidth;
      el.classList.add(cls);
    };

    var syncActive = function () {
      var active = screens.filter(function (img) { return img.dataset.pos === '1'; })[0];
      var idx = screens.indexOf(active);
      acao.style.setProperty('--glow', active.dataset.glow);
      tabs.forEach(function (tab, i) {
        var on = Number(tab.dataset.screen) === idx;
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
        if (on) restartClass(tab, 'is-active');
        else tab.classList.remove('is-active');
      });
    };

    var rotate = function () {
      screens.forEach(function (img) {
        var from = Number(img.dataset.pos);
        var to = (from + 1) % 3;
        img.dataset.pos = String(to);
        img.classList.remove('is-entering', 'is-leaving', 'is-wrapping');
        void img.offsetWidth;
        if (to === 1) img.classList.add('is-entering');
        else if (from === 1) img.classList.add('is-leaving');
        else img.classList.add('is-wrapping');
        // entering/leaving the laptop stay in front of the frame; the one going right -> left passes behind it
        img.style.zIndex = (to === 1 || from === 1) ? 3 : 1;
      });
      place();
      restartClass(glare, 'is-on');
      syncActive();
    };

    var goTo = function (screenIdx) {
      if (busy) return;
      var steps = (1 - Number(screens[screenIdx].dataset.pos) + 3) % 3;
      if (!steps) return;
      busy = true;
      rotate();
      setTimeout(function () {
        if (steps === 2) rotate();
        setTimeout(function () { busy = false; }, steps === 2 ? STEP_MS : 0);
      }, STEP_MS);
    };

    var placeStatic = function () {
      acao.classList.add('is-static');
      place();
      void acao.offsetWidth;
      acao.classList.remove('is-static');
    };

    placeStatic();
    syncActive();
    window.addEventListener('load', placeStatic);
    window.addEventListener('resize', placeStatic);

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () { goTo(Number(tab.dataset.screen)); });
    });

    // auto-advance when the active tab's progress bar finishes; pausing the bar pauses the carousel
    acaoTabs.addEventListener('animationend', function (e) {
      if (e.animationName === 'tabProgress' && !busy) rotate();
    });

    var visible = false;
    var hovering = false;
    var updatePause = function () {
      acaoTabs.classList.toggle('is-paused', !visible || hovering || document.hidden);
    };
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      updatePause();
    }, { threshold: 0.3 }).observe(acao);
    document.addEventListener('visibilitychange', updatePause);
    [acao, acaoTabs].forEach(function (el) {
      el.addEventListener('mouseenter', function () { hovering = true; updatePause(); });
      el.addEventListener('mouseleave', function () { hovering = false; updatePause(); });
      el.addEventListener('focusin', function () { hovering = true; updatePause(); });
      el.addEventListener('focusout', function () { hovering = false; updatePause(); });
    });
    updatePause();

    if (reduceMotion) acaoTabs.classList.add('is-paused');
  }

  // --- FALLING TAGS (physics pile) ---
  var pile = document.getElementById('precisaPile');
  if (pile) {
    var section = pile.parentElement;
    var pills = Array.prototype.slice.call(pile.querySelectorAll('.precisa__pill'));
    var M = window.Matter;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!M || reduce) {
      pile.classList.add('is-static');
    } else {
      pile.classList.add('is-physics');
      var engine = M.Engine.create();
      engine.gravity.y = 1.1;
      var bodies = [];
      var walls = [];
      var started = false;
      var running = false;
      var rafId = 0;

      var buildWalls = function () {
        if (walls.length) M.Composite.remove(engine.world, walls);
        var w = pile.clientWidth, h = pile.clientHeight, t = 400;
        walls = [
          M.Bodies.rectangle(w / 2, h + t / 2, w + t * 2, t, { isStatic: true }),
          M.Bodies.rectangle(-t / 2, h / 2 - 1000, t, h + 2000, { isStatic: true }),
          M.Bodies.rectangle(w + t / 2, h / 2 - 1000, t, h + 2000, { isStatic: true })
        ];
        M.Composite.add(engine.world, walls);
      };

      var render = function () {
        bodies.forEach(function (b) {
          b.el.style.transform = 'translate(' + (b.position.x - b.w / 2) + 'px,' + (b.position.y - b.h / 2) + 'px) rotate(' + b.angle + 'rad)';
        });
      };

      var tick = function () {
        M.Engine.update(engine, 1000 / 60);
        render();
        rafId = running ? requestAnimationFrame(tick) : 0;
      };

      var setRunning = function (on) {
        if (on === running) return;
        running = on;
        if (on) rafId = requestAnimationFrame(tick);
        else cancelAnimationFrame(rafId);
      };

      var drop = function () {
        started = true;
        buildWalls();
        var w = pile.clientWidth;
        pills.forEach(function (el, i) {
          var pw = el.offsetWidth, ph = el.offsetHeight;
          var x = pw / 2 + Math.random() * Math.max(1, w - pw);
          var y = -ph - i * 55 - Math.random() * 80;
          var b = M.Bodies.rectangle(x, y, pw, ph, {
            chamfer: { radius: ph / 2 },
            restitution: 0.35, friction: 0.5, frictionAir: 0.012,
            angle: (Math.random() - 0.5) * 0.8
          });
          b.el = el; b.w = pw; b.h = ph;
          bodies.push(b);
        });
        M.Composite.add(engine.world, bodies);

        if (window.matchMedia('(pointer: fine)').matches) {
          var mouse = M.Mouse.create(pile);
          // keep page scrolling working over the section
          mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
          mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);
          mouse.element.removeEventListener('wheel', mouse.mousewheel);
          var grab = M.MouseConstraint.create(engine, { mouse: mouse, constraint: { stiffness: 0.2, render: { visible: false } } });
          M.Composite.add(engine.world, grab);
        }
      };

      new IntersectionObserver(function (entries) {
        var visible = entries[0].isIntersecting;
        if (visible && !started) drop();
        if (started) setRunning(visible);
      }, { threshold: 0.25 }).observe(section);

      var resizeTimer = 0;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          if (!started) return;
          buildWalls();
          var w = pile.clientWidth;
          bodies.forEach(function (b) {
            if (b.position.x > w - b.w / 2) M.Body.setPosition(b, { x: w - b.w / 2, y: b.position.y - 40 });
          });
        }, 150);
      });
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
