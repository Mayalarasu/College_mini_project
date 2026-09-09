/**
 * ACADEMIC / COLLEGE PROTOTYPE - INTERACTIVE JAVASCRIPT LOGIC
 * Includes Theme Switcher, Department Filtering, Search, Modals, and Stats Counter.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initStatsCounter();
  initDepartmentFilters();
  initSearch();
  initModals();
  initContactForm();
});

/* -------------------------------------------------------------------------- */
/* 1. Theme Switcher (Dark / Light Mode)                                      */
/* -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('college_theme') || 'light';
  
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('college_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }
}

/* -------------------------------------------------------------------------- */
/* 2. Mobile Navigation Drawer                                                */
/* -------------------------------------------------------------------------- */
function initMobileNav() {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '80px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'var(--bg-card)';
        navLinks.style.padding = '1.5rem';
        navLinks.style.borderBottom = '1px solid var(--border-color)';
        navLinks.style.boxShadow = 'var(--shadow-lg)';
      }
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 3. Number Counter Animation on Scroll                                      */
/* -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target') || '0', 10);
          const suffix = counter.getAttribute('data-suffix') || '';
          let count = 0;
          const speed = Math.ceil(target / 60);

          const updateCounter = () => {
            count += speed;
            if (count >= target) {
              counter.innerText = target.toLocaleString() + suffix;
            } else {
              counter.innerText = count.toLocaleString() + suffix;
              setTimeout(updateCounter, 25);
            }
          };
          updateCounter();
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) observer.observe(statsSection);
}

/* -------------------------------------------------------------------------- */
/* 4. Academic Department Category Filtering                                  */
/* -------------------------------------------------------------------------- */
function initDepartmentFilters() {
  const filterBtns = document.querySelectorAll('.tag-btn');
  const deptCards = document.querySelectorAll('.dept-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      deptCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 5. Live Search Filter for Courses / Departments                            */
/* -------------------------------------------------------------------------- */
function initSearch() {
  const searchInput = document.getElementById('course-search');
  const deptCards = document.querySelectorAll('.dept-card');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      deptCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 6. Modal Dialog Handlers                                                   */
/* -------------------------------------------------------------------------- */
function initModals() {
  // Login Modal Trigger
  const loginBtn = document.getElementById('login-modal-btn');
  const loginModal = document.getElementById('login-modal');

  // Apply Modal Trigger
  const applyBtns = document.querySelectorAll('.apply-modal-trigger');
  const applyModal = document.getElementById('apply-modal');

  // All close buttons
  const closeBtns = document.querySelectorAll('.modal-close, .modal-backdrop');

  if (loginBtn && loginModal) {
    loginBtn.addEventListener('click', () => openModal(loginModal));
  }

  applyBtns.forEach(btn => {
    btn.addEventListener('click', () => openModal(applyModal));
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-close') || e.target.classList.contains('modal-backdrop')) {
        closeAllModals();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });
}

function openModal(modal) {
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.classList.remove('active');
  });
  document.body.style.overflow = 'auto';
}

/* -------------------------------------------------------------------------- */
/* 7. Contact & Application Form Submission                                    */
/* -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('inquiry-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Your admission inquiry has been received. Our counselor will contact you shortly.');
      contactForm.reset();
    });
  }

  const applyForm = document.getElementById('application-form');
  if (applyForm) {
    applyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Application submitted successfully! Check your registered email for login credentials.');
      closeAllModals();
      applyForm.reset();
    });
  }
}

/**
 * Open Department Detail Popup (Helper function used in HTML onclick)
 */
function showDeptDetail(title, desc, duration, fees) {
  const modal = document.getElementById('dept-detail-modal');
  if (!modal) return;

  document.getElementById('modal-dept-title').innerText = title;
  document.getElementById('modal-dept-desc').innerText = desc;
  document.getElementById('modal-dept-duration').innerText = duration;
  document.getElementById('modal-dept-fees').innerText = fees;

  openModal(modal);
}
