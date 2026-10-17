document.addEventListener('DOMContentLoaded', () => {
  // 1. STICKY HEADER & SCROLL BEHAVIOR
  const header = document.querySelector('.site-header');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
      if (backToTopBtn) backToTopBtn.style.opacity = '1';
    } else {
      header?.classList.remove('scrolled');
      if (backToTopBtn) backToTopBtn.style.opacity = '0.7';
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 2. MOBILE HAMBURGER MENU
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. DYNAMIC TYPEWRITER EFFECT (Hero subtitle)
  const typewriterTarget = document.getElementById('typewriter');
  if (typewriterTarget) {
    const phrases = [
      'Frontend Web Developer',
      'UI/UX Design Enthusiast',
      'Responsive Website Specialist',
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typewriterTarget.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        typewriterTarget.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 90;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400; // Pause before new word
      }

      setTimeout(type, typeSpeed);
    }

    type();
  }

  // 4. FAQ ACCORDION INTERACTION (Contact page)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all other items
        faqItems.forEach(other => other.classList.remove('active'));
        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 5. CONTACT FORM HANDLER (Formspree AJAX)
  const contactForm = document.getElementById('portfolioContactForm');
  const formFeedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const phone = document.getElementById('phone')?.value.trim() || 'N/A';
      const service = document.getElementById('service')?.value || 'General Inquiry';
      const budget = document.getElementById('budget')?.value || 'Not specified';
      const message = document.getElementById('message')?.value.trim();

      if (!name || !email || !message) {
        showFeedback('Please fill in your name, email, and message before sending.', 'error');
        return;
      }

      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFeedback('Please provide a valid email address.', 'error');
        return;
      }

      // Update button state to loading
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';
      }

      try {
        const response = await fetch('https://formspree.io/f/xredoqwd', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            service,
            budget,
            message
          })
        });

        if (response.ok) {
          showFeedback('🎉 Thank you, ' + name + '! Your message has been sent successfully. I will get back to you within 24 hours.', 'success');
          contactForm.reset();
        } else {
          const data = await response.json().catch(() => ({}));
          showFeedback(data.error || 'Oops! There was an issue sending your message. Please reach out via WhatsApp or email directly.', 'error');
        }
      } catch (err) {
        console.error('Submission error:', err);
        showFeedback('Network error. Please try reaching me via WhatsApp (+234 704 904 5720) directly.', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
        }
      }
    });
  }

  function showFeedback(msg, type) {
    if (!formFeedback) return;
    formFeedback.textContent = msg;
    formFeedback.className = `form-feedback ${type}`;
    formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // 6. SCROLL REVEAL ANIMATIONS
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '40px',
      duration: 900,
      delay: 150,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      reset: false
    });

    sr.reveal('.hero-content, .page-hero');
    sr.reveal('.hero-visual, .about-photo-wrapper', { delay: 300, origin: 'right' });
    sr.reveal('.stat-item', { interval: 150 });
    sr.reveal('.tech-item', { interval: 80 });
    sr.reveal('.project-card', { interval: 200 });
    sr.reveal('.feature-card, .service-card-modern, .pricing-card-modern', { interval: 180 });
    sr.reveal('.skill-category-card', { interval: 200 });
    sr.reveal('.timeline-item', { interval: 180 });
    sr.reveal('.hobby-card', { interval: 100 });
    sr.reveal('.contact-info-panel', { origin: 'left' });
    sr.reveal('.contact-form-panel', { origin: 'right', delay: 200 });
  }
});