/**
 * KineticPulse Physiotherapy & Rehabilitation Clinic
 * Main Application Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgressBar();
  initHeaderScrollEffect();
  initScrollAnimations();
  initMobileMenu();
  initActiveNav();
  initAppointmentDrawer();
  initFAQAccordions();
  initBackToTop();
  initQuickBookingModal();
  updateAppointmentBadge();
});

/* ==========================================================================
   Scroll Reading Progress Bar & Header Morph
   ========================================================================== */
function initScrollProgressBar() {
  let bar = document.getElementById('scroll-progress-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'scroll-progress-bar';
    document.body.prepend(bar);
  }

  const updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (scrollTop / height) * 100 : 0;
    bar.style.width = `${scrolled}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

function initHeaderScrollEffect() {
  const header = document.querySelector('header.glass-nav');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   Scroll-Triggered Reveal Animations Engine
   ========================================================================== */
function initScrollAnimations() {
  // If AOS is available, initialize it
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      once: true,
      offset: 50
    });
  }

  // Native IntersectionObserver for zero-dependency high performance scroll reveals
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale')
      .forEach(el => el.classList.add('revealed'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Auto-target elements with reveal classes
  const manualElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale');
  manualElements.forEach(el => revealObserver.observe(el));

  // Auto-detect sections, card grids, headings, and stats for smooth natural scroll reveals
  const autoTargets = document.querySelectorAll(
    'section:not(.mesh-bg) > div, .service-card, .condition-card, .doctor-select-card, ' +
    '#services-cards-grid > div, #conditions-grid > div, #exercises-grid > div, ' +
    '.faq-group > div, article'
  );

  autoTargets.forEach((el, index) => {
    if (!el.classList.contains('reveal') && !el.classList.contains('reveal-up') && !el.hasAttribute('data-aos')) {
      el.classList.add('reveal-up');
      
      // Auto apply slight stagger for sibling grid items
      const delay = (index % 3) * 100;
      if (delay > 0) {
        el.style.transitionDelay = `${delay}ms`;
      }
      
      revealObserver.observe(el);
    }
  });
}

/* ==========================================================================
   Toast Notification System
   ========================================================================== */
window.showToast = function(title, message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0';
    document.body.appendChild(container);
  }

  const icons = {
    success: `<svg class="w-6 h-6 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
    info: `<svg class="w-6 h-6 text-cyan-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
    warning: `<svg class="w-6 h-6 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`
  };

  const toast = document.createElement('div');
  toast.className = 'pointer-events-auto flex items-start gap-3 p-4 bg-white rounded-xl shadow-2xl border border-slate-100 transform transition-all duration-300 translate-y-4 opacity-0';
  toast.innerHTML = `
    ${icons[type] || icons.success}
    <div class="flex-1">
      <h4 class="text-sm font-semibold text-slate-800">${title}</h4>
      <p class="text-xs text-slate-600 mt-0.5">${message}</p>
    </div>
    <button class="text-slate-400 hover:text-slate-600 focus:outline-none p-1" onclick="this.parentElement.remove()">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>
  `;

  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  }, 10);

  // Auto-remove after 4.5 seconds
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-x-full');
    setTimeout(() => toast.remove(), 300);
  }, 4500);
};

/* ==========================================================================
   Navigation & Mobile Menu
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('close-mobile-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-menu-overlay');

  if (!toggleBtn || !mobileMenu) return;

  const openMenu = () => {
    mobileMenu.classList.remove('translate-x-full');
    if (overlay) overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileMenu.classList.add('translate-x-full');
    if (overlay) overlay.classList.add('hidden');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close menu on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('translate-x-full')) {
      closeMenu();
    }
  });
}

function initActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('header nav a, #mobile-menu a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('text-teal-600', 'font-semibold');
      link.classList.remove('text-slate-600');
    }
  });
}

/* ==========================================================================
   Appointment Storage & Management Drawer
   ========================================================================== */
function getStoredAppointments() {
  try {
    return JSON.parse(localStorage.getItem('kp_appointments') || '[]');
  } catch (e) {
    return [];
  }
}

function saveAppointments(appointments) {
  localStorage.setItem('kp_appointments', JSON.stringify(appointments));
  updateAppointmentBadge();
}

function updateAppointmentBadge() {
  const badges = document.querySelectorAll('.my-appointments-count');
  const appointments = getStoredAppointments();
  badges.forEach(badge => {
    badge.textContent = appointments.length;
    if (appointments.length > 0) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  });
}

function initAppointmentDrawer() {
  const openButtons = document.querySelectorAll('.open-appointments-drawer');
  const drawer = document.getElementById('appointments-drawer');
  const closeBtn = document.getElementById('close-appointments-drawer');
  const backdrop = document.getElementById('drawer-backdrop');

  if (!drawer) return;

  const openDrawer = () => {
    renderAppointmentsList();
    drawer.classList.remove('translate-x-full');
    if (backdrop) backdrop.classList.remove('hidden');
  };

  const closeDrawer = () => {
    drawer.classList.add('translate-x-full');
    if (backdrop) backdrop.classList.add('hidden');
  };

  openButtons.forEach(btn => btn.addEventListener('click', openDrawer));
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);
}

function renderAppointmentsList() {
  const container = document.getElementById('drawer-appointments-list');
  if (!container) return;

  const appointments = getStoredAppointments();

  if (appointments.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 px-4">
        <div class="w-16 h-16 mx-auto mb-3 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        </div>
        <h3 class="text-base font-semibold text-slate-800">No Appointments Booked</h3>
        <p class="text-xs text-slate-500 mt-1 max-w-xs mx-auto">You have no upcoming clinical or virtual physiotherapy sessions scheduled.</p>
        <a href="booking.html" class="inline-block mt-4 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg shadow transition">
          Book an Appointment
        </a>
      </div>
    `;
    return;
  }

  container.innerHTML = appointments.map((apt, index) => `
    <div class="p-4 bg-white rounded-xl border border-slate-200/80 shadow-sm relative hover:border-teal-300 transition">
      <div class="flex items-start justify-between">
        <div>
          <span class="inline-block px-2.5 py-0.5 bg-teal-50 text-teal-700 font-mono text-[11px] font-bold rounded-md mb-1.5">
            #${apt.id || 'KP-' + (1000 + index)}
          </span>
          <h4 class="font-semibold text-slate-900 text-sm">${apt.service || 'Physiotherapy Consultation'}</h4>
          <p class="text-xs text-slate-500 mt-0.5">Specialist: <strong class="text-slate-700">${apt.doctor || 'Senior Physiotherapist'}</strong></p>
        </div>
        <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          Confirmed
        </span>
      </div>

      <div class="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
        <div class="flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          <span>${apt.date || 'Today'}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>${apt.time || '10:00 AM'}</span>
        </div>
      </div>

      <div class="mt-3 flex items-center justify-between text-xs pt-2">
        <span class="text-slate-500">Patient: ${apt.name || 'Self'}</span>
        <button onclick="cancelAppointment(${index})" class="text-red-500 hover:text-red-700 font-medium text-[11px] hover:underline">
          Cancel Session
        </button>
      </div>
    </div>
  `).join('');
}

window.cancelAppointment = function(index) {
  if (confirm('Are you sure you want to cancel this physiotherapy appointment?')) {
    const list = getStoredAppointments();
    list.splice(index, 1);
    saveAppointments(list);
    renderAppointmentsList();
    showToast('Appointment Cancelled', 'Your session has been cancelled without penalty.', 'warning');
  }
};

/* ==========================================================================
   Quick Booking / Lead Modal
   ========================================================================== */
function initQuickBookingModal() {
  const modal = document.getElementById('quick-consult-modal');
  const openBtns = document.querySelectorAll('.open-quick-modal');
  const closeBtn = document.getElementById('close-quick-modal');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('hidden');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }

  // Modal backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });

  const form = document.getElementById('quick-consult-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]').value;
      const phone = form.querySelector('[name="phone"]').value;
      const concern = form.querySelector('[name="concern"]').value;

      showToast('Callback Requested!', `Thank you ${name}. Our triage physiotherapist will call you at ${phone} within 15 minutes.`, 'success');
      form.reset();
      modal.classList.add('hidden');
    });
  }
}

/* ==========================================================================
   FAQ Accordions
   ========================================================================== */
function initFAQAccordions() {
  const triggers = document.querySelectorAll('.faq-trigger');

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isOpen = content.classList.contains('open');

      // Close other open accordions in the same group
      const parent = btn.closest('.faq-group') || document;
      parent.querySelectorAll('.accordion-content.open').forEach(openItem => {
        if (openItem !== content) {
          openItem.classList.remove('open');
          const trigger = openItem.previousElementSibling;
          if (trigger) {
            const trIcon = trigger.querySelector('.faq-icon');
            if (trIcon) trIcon.style.transform = 'rotate(0deg)';
          }
        }
      });

      if (isOpen) {
        content.classList.remove('open');
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        content.classList.add('open');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* ==========================================================================
   Back To Top Button
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.remove('opacity-0', 'pointer-events-none');
      btn.classList.add('opacity-100');
    } else {
      btn.classList.add('opacity-0', 'pointer-events-none');
      btn.classList.remove('opacity-100');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
