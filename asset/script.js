// Global Interactivity Script for Neumorphic Dashboard Suite
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.dashboard-container');
  const sidebar = document.querySelector('.sidebar');
  const toggleBtn = document.querySelector('.sidebar-toggle-btn');
  const backdrop = document.querySelector('.sidebar-backdrop');

  // Sidebar Toggle (Desktop Collapse & Mobile Drawer)
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (window.innerWidth <= 992) {
        // Mobile toggle
        if (sidebar) sidebar.classList.toggle('mobile-open');
        if (backdrop) backdrop.classList.toggle('mobile-open');
      } else {
        // Desktop collapse
        if (container) container.classList.toggle('sidebar-collapsed');
      }
    });
  }

  // Close sidebar on backdrop click
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      if (sidebar) sidebar.classList.remove('mobile-open');
      backdrop.classList.remove('mobile-open');
    });
  }

  // Top Tabs active switch
  const tabLinks = document.querySelectorAll('.tab-link');
  tabLinks.forEach(tab => {
    tab.addEventListener('click', (e) => {
      if (tab.getAttribute('href') === '#') {
        e.preventDefault();
      }
      tabLinks.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // Calendar dates click
  const calDates = document.querySelectorAll('.cal-date:not(.muted)');
  calDates.forEach(date => {
    date.addEventListener('click', () => {
      calDates.forEach(d => d.classList.remove('active-teal'));
      date.classList.add('active-teal');
    });
  });

  // Modal open/close handlers
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  modalTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-modal-target');
      const targetModal = document.getElementById(targetId);
      if (targetModal) targetModal.classList.add('open');
    });
  });

  const modalCloses = document.querySelectorAll('[data-modal-close]');
  modalCloses.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.nm-modal-backdrop');
      if (modal) modal.classList.remove('open');
    });
  });

  // Close modal when clicking outside of modal box
  const modals = document.querySelectorAll('.nm-modal-backdrop');
  modals.forEach(m => {
    m.addEventListener('click', (e) => {
      if (e.target === m) {
        m.classList.remove('open');
      }
    });
  });

  // Submenu Accordion Toggle
  const submenuTriggers = document.querySelectorAll('.nav-item.has-submenu > a');
  submenuTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      // Hanya cegah default jika tidak dalam mode collapsed
      const isCollapsed = container && container.classList.contains('sidebar-collapsed');
      if (!isCollapsed) {
        e.preventDefault();
        const parentItem = trigger.closest('.nav-item.has-submenu');
        if (parentItem) {
          parentItem.classList.toggle('open');
        }
      }
    });
  });

  // Alert close handler
  const alertCloses = document.querySelectorAll('.nm-alert-close');
  alertCloses.forEach(btn => {
    btn.addEventListener('click', () => {
      const alert = btn.closest('.nm-alert');
      if (alert) {
        alert.style.opacity = '0';
        alert.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          alert.remove();
        }, 300);
      }
    });
  });

  // Smooth link transitions
  const internalLinks = document.querySelectorAll('a[href$=".html"]');
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetUrl = link.getAttribute('href');
      if (targetUrl && !targetUrl.startsWith('#') && targetUrl !== window.location.pathname.split('/').pop()) {
        e.preventDefault();
        const main = document.querySelector('.main-content');
        if (main) {
          main.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
          main.style.opacity = '0';
          main.style.transform = 'translateY(6px)';
        }
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 200);
      }
    });
  });
});
