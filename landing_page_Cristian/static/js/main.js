const navbar = document.getElementById('navbar');
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.prepend(progressBar);

const motionState = {
  ticking: false,
  reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
};

const updateScrollMotion = () => {
  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? scrollY / docHeight : 0;

  navbar.classList.toggle('scrolled', scrollY > 60);
  progressBar.style.transform = `scaleX(${progress})`;

  if (!motionState.reduced && window.innerWidth > 768) {
    document.documentElement.style.setProperty('--scroll-depth', scrollY.toFixed(0));
    document.querySelectorAll('[data-parallax]').forEach(layer => {
      const speed = Number(layer.dataset.parallax || 0.08);
      const rect = layer.getBoundingClientRect();
      const offset = (rect.top - window.innerHeight * 0.5) * speed;
      layer.style.setProperty('--parallax-y', `${offset.toFixed(2)}px`);
    });
  }

  motionState.ticking = false;
};

window.addEventListener('scroll', () => {
  if (!motionState.ticking) {
    requestAnimationFrame(updateScrollMotion);
    motionState.ticking = true;
  }
}, { passive: true });
updateScrollMotion();

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', event => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.28 });

document.querySelectorAll(
  '.sobre-grid, .pilar, .rep-card, .porque-card, .prog-card, .stat, .musica-content, .contato-content, .social-btn'
).forEach((el, index) => {
  el.classList.add('reveal-motion');
  el.style.setProperty('--reveal-delay', `${Math.min(index % 8, 6) * 70}ms`);
  observer.observe(el);
});

document.querySelectorAll('.btn, .social-btn').forEach(button => {
  button.classList.add('interactive-sheen');
  button.addEventListener('pointermove', event => {
    const rect = button.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
    button.style.setProperty('--mag-x', `${x.toFixed(2)}px`);
    button.style.setProperty('--mag-y', `${y.toFixed(2)}px`);
  });
  button.addEventListener('pointerleave', () => {
    button.style.setProperty('--mag-x', '0px');
    button.style.setProperty('--mag-y', '0px');
  });
  button.addEventListener('pointerdown', event => {
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'button-ripple';
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    button.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});

document.querySelectorAll('.rep-card, .porque-card, .prog-card, .gal-item').forEach(card => {
  card.addEventListener('pointermove', event => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const tiltX = (((event.clientY - rect.top) / rect.height) - 0.5) * -5;
    const tiltY = (((event.clientX - rect.left) / rect.width) - 0.5) * 5;
    card.style.setProperty('--spot-x', `${x}%`);
    card.style.setProperty('--spot-y', `${y}%`);
    card.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
    card.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
  });
  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
  });
});

document.querySelectorAll('.hero-img, .musica-bg img, .contato-bg img').forEach((layer, index) => {
  layer.dataset.parallax = index === 0 ? '0.035' : '0.055';
});

document.querySelectorAll('.musica, .contato').forEach(section => {
  sectionObserver.observe(section);
});

document.querySelectorAll('.sobre, .repertorio, .galeria, .porque, .programacao').forEach(section => {
  sectionObserver.observe(section);
});

document.body.classList.add('motion-ready');
