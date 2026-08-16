/**
 * NeonVault Newsletter & Interactive Features
 * Handles form submission, validation, and user feedback
 */

(function () {
  'use strict';

  // Newsletter Form Handler
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterStatus = document.getElementById('newsletter-status');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
  }

  /**
   * Validates email format
   * @param {string} email - Email to validate
   * @returns {boolean}
   */
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Handles newsletter form submission
   * @param {Event} event - Form submit event
   */
  function handleNewsletterSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const emailInput = form.querySelector('input[type="email"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    const email = emailInput.value.trim();

    // Clear previous status
    newsletterStatus.textContent = '';
    newsletterStatus.className = 'newsletter-status';

    // Validate email
    if (!email) {
      showStatus('Please enter your email address.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }

    // Disable button during submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Joining...';

    // Simulate API call (replace with actual API endpoint)
    setTimeout(() => {
      showStatus('Welcome to NeonVault! 🎉', 'success');
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Join NeonVault';
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        newsletterStatus.textContent = '';
      }, 3000);
    }, 1000);
  }

  /**
   * Display status message to user
   * @param {string} message - Message to display
   * @param {string} type - 'success' or 'error'
   */
  function showStatus(message, type) {
    newsletterStatus.textContent = message;
    newsletterStatus.className = `newsletter-status ${type}`;
  }

  // Smooth scroll fallback for older browsers
  if (!('scrollBehavior' in document.documentElement.style)) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // Keyboard navigation for cards
  document.querySelectorAll('.category, .why-card').forEach(card => {
    card.addEventListener('keypress', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

})();
