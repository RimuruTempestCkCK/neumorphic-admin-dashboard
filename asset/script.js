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

  // Topbar Search Click -> Open Command Palette
  const searchBtn = document.querySelector('button[title="Pencarian Cepat"]');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      if (window.ajoFramework) window.ajoFramework.openCommandPalette();
    });
  }

  // Topbar Notification Click -> Open Notification Center
  const notifBtn = document.querySelector('button[title="Notifikasi Baru"]');
  if (notifBtn) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (window.ajoFramework) window.ajoFramework.openNotificationCenter();
    });
  }

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

  // Submenu Accordion Toggle (Click on item with submenu or click on its link/arrow)
  const submenuItems = document.querySelectorAll('.nav-item.has-submenu');
  submenuItems.forEach(item => {
    const trigger = item.querySelector('.submenu-toggle');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        const isCollapsed = container && container.classList.contains('sidebar-collapsed');
        if (!isCollapsed) {
          e.preventDefault();
          e.stopPropagation();
          // Toggle open state on this submenu
          item.classList.toggle('open');
        }
      });
    }
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

  // Smooth link transitions (exclude submenu toggles)
  const internalLinks = document.querySelectorAll('a[href$=".html"]:not(.submenu-toggle)');
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
