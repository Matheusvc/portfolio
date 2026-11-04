// --- NAV SCROLL ---
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 50);
});

// --- MOBILE MENU ---
const toggle = document.querySelector('.nav__toggle');
const links = document.querySelector('.nav__links');

toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav__link, .nav__cta').forEach(link => {
  link.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// --- ACTIVE NAV LINK ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

function updateActiveLink() {
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

// --- REVEAL ON SCROLL ---
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

reveals.forEach(el => revealObserver.observe(el));

setTimeout(() => {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    el.classList.add('visible');
  });
}, 3000);

// --- METRICS COUNTER ---
const counters = document.querySelectorAll('.metrics__number');
let countersAnimated = false;

const metricsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersAnimated) {
      countersAnimated = true;
      counters.forEach(counter => {
        const target = parseInt(counter.dataset.target, 10);
        const duration = 1500;
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = Math.round(eased * target);

          if (progress < 1) {
            requestAnimationFrame(update);
          }
        }

        requestAnimationFrame(update);
      });
      metricsObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const metricsSection = document.querySelector('.metrics');
if (metricsSection) {
  metricsObserver.observe(metricsSection);
}

// --- CONTACT FORM ---
const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = form.querySelector('.contato__input');
    if (!email || !email.value.trim()) {
      if (feedback) {
        feedback.textContent = 'Preencha seu e-mail.';
        feedback.style.color = '#ff6b6b';
      }
      return;
    }

    if (feedback) {
      feedback.textContent = 'E-mail registrado! Entro em contato em breve.';
      feedback.style.color = 'var(--lime)';
    }
    form.reset();

    setTimeout(() => {
      if (feedback) {
        feedback.textContent = '';
      }
    }, 5000);
  });
}

// --- SMOOTH SCROLL ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
