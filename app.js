/**
 * ShopKeeper Landing Page Script
 * - Light (Default) / Dark Theme Toggle with LocalStorage Persistence
 * - Scroll Progress Bar Calculation
 * - Onboarding Form Validation & Redirection to shopkeeperonboarding@gmail.com
 * - Active Navigation Scroll Spy & Toast System
 */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================================
  // 1. THEME CONTROLLER (Light Mode Default)
  // ============================================================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeLabelText = document.getElementById('themeLabelText');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default strictly to 'light'
  const savedTheme = localStorage.getItem('shopkeeper_theme') || 'light';
  applyTheme(savedTheme);

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    if (themeLabelText) {
      themeLabelText.textContent = theme === 'dark' ? 'Dark' : 'Light';
    }
    localStorage.setItem('shopkeeper_theme', theme);
  }

  themeToggleBtn?.addEventListener('click', () => {
    const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
    showToast(`Switched to ${nextTheme === 'light' ? 'Light' : 'Dark'} theme`);
  });


  // ============================================================================
  // 2. MOBILE NAVIGATION DRAWER CONTROLLER
  // ============================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileDrawerCloseBtn = document.getElementById('mobileDrawerCloseBtn');
  const mobileDrawerBackdrop = document.getElementById('mobileDrawerBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-item, .mobile-drawer-cta-btn');

  function openMobileMenu() {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.classList.add('is-open');
    mobileMenuBtn?.classList.add('is-active');
    mobileMenuBtn?.setAttribute('aria-expanded', 'true');
    mobileNavDrawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('mobile-menu-active');
  }

  function closeMobileMenu() {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.classList.remove('is-open');
    mobileMenuBtn?.classList.remove('is-active');
    mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    mobileNavDrawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('mobile-menu-active');
  }

  mobileMenuBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = mobileNavDrawer?.classList.contains('is-open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileDrawerCloseBtn?.addEventListener('click', closeMobileMenu);
  mobileDrawerBackdrop?.addEventListener('click', closeMobileMenu);

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNavDrawer?.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });


  // ============================================================================
  // 3. SCROLL READING PROGRESS BAR & ACTIVE NAV
  // ============================================================================
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const navItems = document.querySelectorAll('.nav-item');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
  const sections = document.querySelectorAll('section[id], .metrics-banner[id], .feature-checklist[id]');

  function updateScrollProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    if (scrollHeight > 0 && scrollProgressBar) {
      const progress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
      scrollProgressBar.style.width = `${progress}%`;
    }

    // Nav Scroll Spy
    let currentSectionId = '';
    const scrollPosition = scrollTop + 140;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navItems.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    mobileNavItems.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateScrollProgress();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Initial call on load
  updateScrollProgress();


  // ============================================================================
  // 3. ONBOARDING FORM HANDLER & EMAIL REDIRECTION
  // ============================================================================
  const onboardingForm = document.getElementById('onboardingForm');
  const targetEmail = 'shopkeeperonboarding@gmail.com';

  onboardingForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const businessName = document.getElementById('businessName')?.value.trim() || 'Store';
    const contactName = document.getElementById('contactName')?.value.trim() || '';
    const phoneNumber = document.getElementById('phoneNumber')?.value.trim() || '';
    const emailAddress = document.getElementById('emailAddress')?.value.trim() || 'Not provided';
    const storeCategory = document.getElementById('storeCategory')?.value.trim() || 'Retail';
    const storeAddress = document.getElementById('storeAddress')?.value.trim() || 'Not provided';
    const additionalNotes = document.getElementById('additionalNotes')?.value.trim() || 'None';

    if (!businessName || !contactName || !phoneNumber) {
      showToast('Please fill in all required fields (Store Name, Contact Person, Phone Number).');
      return;
    }

    // Build the formatted mail body
    const emailSubject = `ShopKeeper Onboarding Request: ${businessName}`;
    const emailBody = [
      `Hello ShopKeeper Onboarding Team,`,
      ``,
      `I would like to onboard our store with ShopKeeper. Below are our business details:`,
      ``,
      `--------------------------------------------------`,
      `• Store / Business Name: ${businessName}`,
      `• Contact Person: ${contactName}`,
      `• Phone Number / WhatsApp: ${phoneNumber}`,
      `• Email Address: ${emailAddress}`,
      `• Store Category: ${storeCategory}`,
      `• Store Address / City: ${storeAddress}`,
      `--------------------------------------------------`,
      ``,
      `Additional Notes / Requirements:`,
      `${additionalNotes}`,
      ``,
      `Looking forward to your onboarding setup and walkthrough.`,
      `Best regards,`,
      `${contactName}`
    ].join('\n');

    // Construct mailto link
    const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // Show visual confirmation toast
    showToast(`Opening your email client to send onboarding request to ${targetEmail}...`, 5000);

    // Trigger email redirection
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 400);
  });


  // ============================================================================
  // 4. TOAST NOTIFICATIONS
  // ============================================================================
  const toastContainer = document.getElementById('toastContainer');

  function showToast(message, duration = 3500) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff2a73" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

});
