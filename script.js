/**
 * BILLIE GRACE BERRY — OFFICIAL AUTHOR WEBSITE
 * Master Vanilla JavaScript
 * Luxury Dark Fantasy & Celestial Mythology
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // 1. Data Store: Book Collection & Lore Records
  // ==========================================================================
  const booksData = {
    book1: {
      id: 'book1',
      title: 'The Lilith Chronicles Omnibus',
      subtitle: 'Volume I',
      genre: 'Dark Fantasy • Celestial Mythology • Epic Saga',
      cover: 'images/book1/book1.jpg',
      coverAlt: 'Book cover of The Lilith Chronicles Omnibus Volume I by Billie Grace Berry featuring Lilith with purple flames and a dragon',
      genresList: ['Celestial Myth', 'Dark Fantasy', 'Angelic Order', 'Reincarnation'],
      synopsis: `Captured by ancient celestial powers and subjected to an ambitious attempt at rehabilitation through reincarnation into mortal lives, Lilith's journey begins in the shadows of divine architecture. As lives pass beyond counting, fragments of her true primordial self begin to stir.\n\nVolume I chronicles the awakening of forgotten powers, the covert hierarchies of the angelic order, and the first harrowing trials of a warrior destined to shake heaven and earth.`,
      highlight: '“In every mortal breath, a fragment of celestial flame refused to die.”',
      themes: [
        'The Reincarnation Cycle across human epochs',
        'Celestial hierarchies and hidden divine archives',
        'The awakening of primordial soul memory'
      ],
      availabilityNote: 'Official publication & distribution details to be announced by the author.'
    },
    book2: {
      id: 'book2',
      title: 'The Lilith Chronicles Omnibus',
      subtitle: 'Volume II',
      genre: 'Dark Fantasy • Dragon Epic • Mythic Magic',
      cover: 'images/book2/book2.jpg',
      coverAlt: 'Book cover of The Lilith Chronicles Omnibus Volume II by Billie Grace Berry featuring Lilith wielding dual spheres of magic with a colossal dragon',
      genresList: ['Dragon Changeling', 'Goddess of Magic', 'Queen Mother Dragon', 'Cosmic Balance'],
      synopsis: `Restored at last to her true physical form, Lilith rises to claim her station as Guardian of Balance, Protector of Heaven, and Chief Angel. Yet the restoration of her ancient origins heralds an even more extraordinary metamorphosis: the Goddess of Magic, a legendary warrior, and a Dragon Changeling destined to ascend as the Queen Mother Dragon.\n\nFacing cataclysmic shadow legions, she creates three daughters—chief among them the True Lilith—to preserve the fragile equilibrium of all existence.`,
      highlight: '“When the dragon awakens within divine bone, balance is no longer asked for—it is commanded.”',
      themes: [
        'Ascension to Guardian of Balance & Chief Angel',
        'Awakening as the Queen Mother Dragon',
        'The creation of the three daughters and the True Lilith'
      ],
      availabilityNote: 'Official publication & distribution details to be announced by the author.'
    }
  };

  // ==========================================================================
  // 2. Navigation Header & Mobile Drawer
  // ==========================================================================
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

  // Handle header background transition on scroll
  function handleScrollHeader() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScrollHeader, { passive: true });
  handleScrollHeader();

  // Mobile menu toggle
  function toggleMobileMenu(open) {
    if (!menuToggle || !mainNav) return;
    const isOpen = open !== undefined ? open : !mainNav.classList.contains('open');
    menuToggle.classList.toggle('active', isOpen);
    mainNav.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      toggleMobileMenu(!isExpanded);
    });
  }

  // Close mobile navigation on clicking any link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav && mainNav.classList.contains('open')) {
        toggleMobileMenu(false);
      }
    });
  });

  // Close mobile navigation on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mainNav && mainNav.classList.contains('open')) {
        toggleMobileMenu(false);
      }
      closeModal();
    }
  });

  // Highlight active navigation section on scroll
  const sections = document.querySelectorAll('section[id]');
  function highlightActiveNav() {
    if (!sections.length) return;
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-link[href="#${id}"]`);

      if (targetNavLink) {
        if (scrollPos >= top && scrollPos < top + height) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav, { passive: true });

  // ==========================================================================
  // 3. Scroll Reveal Animations (Intersection Observer)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // ==========================================================================
  // 4. Subtle Celestial Particles Canvas
  // ==========================================================================
  const canvas = document.getElementById('celestial-canvas');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let particles = [];
    let animationFrameId;

    const PARTICLE_COUNT = 45;

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    }

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 10;
        this.size = Math.random() * 1.8 + 0.6;
        this.speedY = Math.random() * 0.3 + 0.1;
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.baseAlpha = Math.random() * 0.45 + 0.15;
        this.alpha = this.baseAlpha;
        this.pulseSpeed = Math.random() * 0.02 + 0.008;
        this.pulseAngle = Math.random() * Math.PI * 2;
        // 70% pale lavender, 30% warm gold dust
        this.isGold = Math.random() > 0.7;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.pulseAngle += this.pulseSpeed;
        this.alpha = this.baseAlpha + Math.sin(this.pulseAngle) * 0.18;

        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.reset(false);
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        if (this.isGold) {
          ctx.fillStyle = `rgba(198, 165, 104, ${Math.max(0, Math.min(1, this.alpha))})`;
        } else {
          ctx.fillStyle = `rgba(169, 139, 199, ${Math.max(0, Math.min(1, this.alpha))})`;
        }
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', () => {
      cancelAnimationFrame(animationFrameId);
      resizeCanvas();
      animateParticles();
    });

    resizeCanvas();
    animateParticles();
  }

  // ==========================================================================
  // 5. Interactive Book Detail Modal
  // ==========================================================================
  const modalOverlay = document.getElementById('book-modal');
  const modalCloseBtn = document.querySelector('.modal-close');
  const discoverBtns = document.querySelectorAll('[data-book-trigger]');
  let lastActiveTrigger = null;

  function openBookModal(bookKey) {
    const book = booksData[bookKey];
    if (!book || !modalOverlay) return;

    // Populate modal elements
    const coverEl = document.getElementById('modal-cover-img');
    const labelEl = document.getElementById('modal-book-label');
    const titleEl = document.getElementById('modal-book-title');
    const subtitleEl = document.getElementById('modal-book-subtitle');
    const genresEl = document.getElementById('modal-book-genres');
    const synopsisEl = document.getElementById('modal-book-synopsis');
    const excerptEl = document.getElementById('modal-book-excerpt');
    const noteEl = document.getElementById('modal-book-note');

    if (coverEl) {
      coverEl.src = book.cover;
      coverEl.alt = book.coverAlt;
    }
    if (labelEl) labelEl.textContent = `${book.subtitle} • EXCLUSIVE DISCOVERY`;
    if (titleEl) titleEl.textContent = book.title;
    if (subtitleEl) subtitleEl.textContent = book.subtitle;
    if (synopsisEl) synopsisEl.innerHTML = book.synopsis.replace(/\n\n/g, '<br><br>');
    if (excerptEl) excerptEl.textContent = book.highlight;
    if (noteEl) noteEl.textContent = book.availabilityNote;

    if (genresEl) {
      genresEl.innerHTML = book.genresList
        .map(genre => `<span class="genre-tag">${genre}</span>`)
        .join('');
    }

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (modalCloseBtn) {
      modalCloseBtn.focus();
    }
  }

  function closeModal() {
    if (!modalOverlay || !modalOverlay.classList.contains('active')) return;
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastActiveTrigger) {
      lastActiveTrigger.focus();
      lastActiveTrigger = null;
    }
  }

  discoverBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const bookKey = btn.getAttribute('data-book-trigger');
      lastActiveTrigger = btn;
      openBookModal(bookKey);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  // ==========================================================================
  // 6. Contact Form Validation & Submission State
  // ==========================================================================
  const contactForm = document.getElementById('author-contact-form');
  const formStatus = document.getElementById('form-status-message');

  if (contactForm) {
    const nameInput = document.getElementById('sender-name');
    const emailInput = document.getElementById('sender-email');
    const subjectSelect = document.getElementById('sender-subject');
    const messageInput = document.getElementById('sender-message');

    // Utility: Validate Email Pattern
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email.trim());
    }

    // Set field error
    function setFieldError(input, message) {
      const group = input.closest('.form-group');
      if (!group) return;
      group.classList.add('has-error');
      let errorEl = group.querySelector('.form-error');
      if (errorEl) {
        errorEl.textContent = message;
      }
    }

    // Clear field error
    function clearFieldError(input) {
      const group = input.closest('.form-group');
      if (!group) return;
      group.classList.remove('has-error');
    }

    // Clear errors on input
    [nameInput, emailInput, subjectSelect, messageInput].forEach(field => {
      if (field) {
        field.addEventListener('input', () => clearFieldError(field));
        field.addEventListener('blur', () => {
          if (field.value.trim() === '' && field.hasAttribute('required')) {
            setFieldError(field, 'This field is required.');
          }
        });
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let hasError = false;

      // Validate Name
      if (!nameInput || nameInput.value.trim().length < 2) {
        setFieldError(nameInput, 'Please provide your full name (at least 2 characters).');
        hasError = true;
      } else {
        clearFieldError(nameInput);
      }

      // Validate Email
      if (!emailInput || !isValidEmail(emailInput.value)) {
        setFieldError(emailInput, 'Please enter a valid email address.');
        hasError = true;
      } else {
        clearFieldError(emailInput);
      }

      // Validate Subject
      if (!subjectSelect || subjectSelect.value === '') {
        setFieldError(subjectSelect, 'Please select an inquiry subject.');
        hasError = true;
      } else {
        clearFieldError(subjectSelect);
      }

      // Validate Message
      if (!messageInput || messageInput.value.trim().length < 10) {
        setFieldError(messageInput, 'Please write a message of at least 10 characters.');
        hasError = true;
      } else {
        clearFieldError(messageInput);
      }

      if (hasError) {
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Please correct the highlighted fields above before submitting.';
          formStatus.style.display = 'block';
        }
        return;
      }

      // Valid frontend submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'SEND MESSAGE';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg style="animation: spin 1s linear infinite; width: 14px; height: 14px; display: inline-block;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10"></path>
          </svg>
          VALIDATING...
        `;
      }

      // Simulate network verification and show transparent production integration state
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }

        if (formStatus) {
          // Transparent notice explaining endpoint integration without false success claim
          formStatus.className = 'form-status notice';
          formStatus.innerHTML = `
            <strong>Inquiry Verified (Client Validation Complete):</strong><br>
            Thank you, <em>${nameInput.value.trim()}</em>. Your inquiry has been formatted and validated.<br>
            <span style="display:block; margin-top: 0.5rem; font-size: 0.825rem; opacity: 0.9;">
              ✦ Note for site administrator: To route messages to your preferred inbox (e.g. Formspree, EmailJS, or private correspondence endpoint), configure the <code>action</code> attribute on the form element.
            </span>
            <div style="margin-top: 0.85rem;">
              <a href="mailto:?subject=${encodeURIComponent(subjectSelect.value + ' - ' + nameInput.value.trim())}&body=${encodeURIComponent(messageInput.value.trim())}" class="btn btn-secondary" style="font-size: 0.75rem; padding: 0.5rem 1rem;">
                Open in Email Client Directly
              </a>
            </div>
          `;
          formStatus.style.display = 'block';
        }
      }, 700);
    });
  }

  // ==========================================================================
  // 7. Dynamic Copyright Year
  // ==========================================================================
  const yearSpans = document.querySelectorAll('.copyright-year, #year');
  const currentYear = new Date().getFullYear();
  yearSpans.forEach(span => {
    span.textContent = currentYear;
  });

  // ==========================================================================
  // 8. Back to Top Smooth Scroll
  // ==========================================================================
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Quick style injection for button spinner
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(styleSheet);
});
