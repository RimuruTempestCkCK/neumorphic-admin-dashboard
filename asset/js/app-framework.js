/**
 * ajogalehlauak - Central UI Framework (Theme Customizer, Command Palette, Toasts, Modals)
 */
class AjoFramework {
  constructor() {
    this.initTheme();
    this.initCommandPalette();
    this.initNotificationDropdown();
    this.initToastContainer();
  }

  /* ================= 1. THEME CUSTOMIZER & DARK MODE ================= */
  initTheme() {
    const savedTheme = localStorage.getItem("ajo_theme") || "light";
    const savedAccent = localStorage.getItem("ajo_accent") || "#38c8a7";
    const savedRadius = localStorage.getItem("ajo_radius") || "22px";

    this.applyTheme(savedTheme, false);
    if (savedAccent) document.documentElement.style.setProperty("--teal-btn", savedAccent);
    if (savedRadius) document.documentElement.style.setProperty("--card-radius", savedRadius);

    // Watch system preference if set to 'system'
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (localStorage.getItem("ajo_theme") === "system") {
        this.applyTheme(e.matches ? "dark" : "light", false);
      }
    });
  }

  applyTheme(themeName, save = true) {
    let activeTheme = themeName;
    if (themeName === "system") {
      activeTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    if (activeTheme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    if (save) localStorage.setItem("ajo_theme", themeName);
  }

  toggleTheme() {
    const isDark = document.body.classList.contains("dark-mode");
    this.applyTheme(isDark ? "light" : "dark", true);
    this.showToast("info", "Tema Diubah", `Beralih ke mode ${isDark ? "Terang" : "Gelap"}`);
  }

  /* ================= 2. TOAST NOTIFICATION SYSTEM ================= */
  initToastContainer() {
    let container = document.getElementById("ajoToastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "ajoToastContainer";
      container.className = "toast-container";
      document.body.appendChild(container);
    }
  }

  showToast(type = "info", title = "Pemberitahuan", message = "", duration = 4000) {
    const container = document.getElementById("ajoToastContainer");
    if (!container) return;

    const icons = {
      success: "✓",
      info: "ℹ",
      warning: "⚠",
      danger: "✕"
    };

    const toast = document.createElement("div");
    toast.className = `nm-toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-icon">${icons[type] || "•"}</div>
      <div class="toast-body">
        <div class="toast-title">${title}</div>
        <div class="toast-msg">${message}</div>
      </div>
      <button class="toast-close" title="Tutup">&times;</button>
    `;

    toast.querySelector(".toast-close").addEventListener("click", () => {
      toast.classList.add("toast-hiding");
      setTimeout(() => toast.remove(), 250);
    });

    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add("toast-hiding");
        setTimeout(() => toast.remove(), 250);
      }
    }, duration);
  }

  /* ================= 3. COMMAND PALETTE (CTRL+K / CMD+K) ================= */
  initCommandPalette() {
    let modal = document.getElementById("commandPaletteModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "commandPaletteModal";
      modal.className = "cmd-palette-backdrop";
      modal.innerHTML = `
        <div class="cmd-palette-card">
          <div class="cmd-palette-header">
            <svg class="cmd-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" id="cmdInput" class="cmd-input" placeholder="Ketik perintah atau cari menu... (Gunakan ↑ ↓ dan Enter)" autocomplete="off">
            <span class="cmd-badge">ESC</span>
          </div>
          <div class="cmd-results" id="cmdResults">
            <!-- Dynamic Commands -->
          </div>
          <div class="cmd-footer">
            <span>Navigasi: <strong>↑</strong> <strong>↓</strong></span>
            <span>Buka: <strong>Enter</strong></span>
            <span>Tutup: <strong>ESC</strong></span>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.addEventListener("click", (e) => {
        if (e.target === modal) this.closeCommandPalette();
      });
    }

    const input = document.getElementById("cmdInput");
    if (input) {
      input.addEventListener("input", () => this.filterCommands(input.value));
      input.addEventListener("keydown", (e) => this.handleCommandKeydown(e));
    }

    // Keyboard Shortcuts (Ctrl+K & Cmd+K)
    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        this.openCommandPalette();
      }
      if (e.key === "Escape") {
        this.closeCommandPalette();
      }
    });

    // Populate initial commands
    this.filterCommands("");
  }

  getCommandList() {
    return [
      { category: "Halaman Utama", title: "Buka Dashboard Utama", url: "index.html", icon: "📊" },
      { category: "Halaman Utama", title: "Buka Galeri Chart & Statistik", url: "charts.html", icon: "📈" },
      { category: "Halaman Utama", title: "Buka Data Tabel & Logistik", url: "tables.html", icon: "📋" },
      { category: "Halaman Utama", title: "Buka Komponen Form Input", url: "forms.html", icon: "📝" },
      { category: "Halaman Utama", title: "Buka Variasi Tombol UI", url: "buttons.html", icon: "🔘" },
      { category: "Halaman Utama", title: "Buka Berita & Artikel Blog", url: "blog.html", icon: "📰" },
      { category: "Halaman Utama", title: "Buka Profil Pengguna", url: "profile.html", icon: "👤" },
      { category: "Manajemen Administrasi", title: "Manajemen Pengguna (User Management)", url: "users.html", icon: "👥" },
      { category: "Manajemen Administrasi", title: "Laporan & Analitik Bisnis", url: "reports.html", icon: "📑" },
      { category: "Manajemen Administrasi", title: "Jadwal & Task Management (Kalender)", url: "calendar.html", icon: "📅" },
      { category: "Manajemen Administrasi", title: "Log Aktivitas Sistem (Audit Log)", url: "activity-log.html", icon: "📜" },
      { category: "Pengaturan & Preferensi", title: "Pengaturan Akun Pengguna", url: "account-settings.html", icon: "⚙️" },
      { category: "Pengaturan & Preferensi", title: "Pengaturan Sistem & Branding", url: "system-settings.html", icon: "🛠️" },
      { category: "Aksi Cepat", title: "Ganti Tema Gelap / Terang (Dark Mode)", action: () => this.toggleTheme(), icon: "🌓" },
      { category: "Aksi Cepat", title: "Buka Theme Customizer", action: () => this.openThemeCustomizer(), icon: "🎨" },
      { category: "Aksi Cepat", title: "Kirim Uji Toast Notifikasi", action: () => this.showToast("success", "Sistem Siap", "Telemetri pangkalan aktif."), icon: "🔔" }
    ];
  }

  openCommandPalette() {
    const modal = document.getElementById("commandPaletteModal");
    if (!modal) return;
    modal.classList.add("open");
    const input = document.getElementById("cmdInput");
    if (input) {
      input.value = "";
      this.filterCommands("");
      setTimeout(() => input.focus(), 80);
    }
  }

  closeCommandPalette() {
    const modal = document.getElementById("commandPaletteModal");
    if (modal) modal.classList.remove("open");
  }

  filterCommands(query) {
    const list = this.getCommandList();
    const cleanQ = query.toLowerCase().trim();
    const filtered = cleanQ ? list.filter(c => c.title.toLowerCase().includes(cleanQ) || c.category.toLowerCase().includes(cleanQ)) : list;
    const container = document.getElementById("cmdResults");
    if (!container) return;

    if (filtered.length === 0) {
      container.innerHTML = `<div class="cmd-empty">Tidak ada perintah atau menu yang cocok dengan "<strong>${query}</strong>"</div>`;
      return;
    }

    let currentCat = "";
    let html = "";
    filtered.forEach((cmd, idx) => {
      if (cmd.category !== currentCat) {
        currentCat = cmd.category;
        html += `<div class="cmd-category-title">${currentCat}</div>`;
      }
      html += `
        <div class="cmd-item ${idx === 0 ? "active" : ""}" data-index="${idx}">
          <span class="cmd-item-icon">${cmd.icon}</span>
          <span class="cmd-item-title">${cmd.title}</span>
          <span class="cmd-item-enter">↵</span>
        </div>
      `;
    });
    container.innerHTML = html;

    // Attach click events
    container.querySelectorAll(".cmd-item").forEach(el => {
      el.addEventListener("click", () => {
        const idx = parseInt(el.getAttribute("data-index"), 10);
        this.executeCommand(filtered[idx]);
      });
    });

    this.activeCmdList = filtered;
    this.selectedCmdIndex = 0;
  }

  handleCommandKeydown(e) {
    const items = document.querySelectorAll(".cmd-item");
    if (!items.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[this.selectedCmdIndex]?.classList.remove("active");
      this.selectedCmdIndex = (this.selectedCmdIndex + 1) % items.length;
      items[this.selectedCmdIndex]?.classList.add("active");
      items[this.selectedCmdIndex]?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[this.selectedCmdIndex]?.classList.remove("active");
      this.selectedCmdIndex = (this.selectedCmdIndex - 1 + items.length) % items.length;
      items[this.selectedCmdIndex]?.classList.add("active");
      items[this.selectedCmdIndex]?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (this.activeCmdList && this.activeCmdList[this.selectedCmdIndex]) {
        this.executeCommand(this.activeCmdList[this.selectedCmdIndex]);
      }
    }
  }

  executeCommand(cmd) {
    this.closeCommandPalette();
    if (cmd.action) {
      cmd.action();
    } else if (cmd.url) {
      window.location.href = cmd.url;
    }
  }

  /* ================= 4. NOTIFICATION CENTER ================= */
  initNotificationDropdown() {
    // Populate dynamic badge
    this.updateNotificationBadge();
  }

  async updateNotificationBadge() {
    const badge = document.querySelector(".notification-badge");
    if (!badge || !window.ajoApi) return;
    try {
      const notifs = await window.ajoApi.getCollection("notifications");
      const unreadCount = notifs.filter(n => n.unread).length;
      badge.textContent = unreadCount;
      badge.style.display = unreadCount > 0 ? "flex" : "none";
    } catch (e) {
      console.warn("Failed to load badge:", e);
    }
  }

  async openNotificationCenter() {
    let panel = document.getElementById("ajoNotifPanel");
    if (!panel) {
      panel = document.createElement("div");
      panel.id = "ajoNotifPanel";
      panel.className = "notif-panel-overlay";
      panel.innerHTML = `
        <div class="notif-panel-card">
          <div class="notif-panel-header">
            <div>
              <h3 class="notif-panel-title">Pusat Notifikasi</h3>
              <p class="notif-panel-subtitle">Peringatan operasional dan telemetri logistik</p>
            </div>
            <button class="btn btn-nm btn-sm" id="btnMarkAllRead">Tandai Dibaca</button>
          </div>
          <div class="notif-list-container" id="notifListContainer">
            <!-- Dynamic Notifs -->
          </div>
          <div class="notif-panel-footer">
            <button class="btn btn-nm btn-sm" id="btnCloseNotif">Tutup</button>
          </div>
        </div>
      `;
      document.body.appendChild(panel);

      panel.addEventListener("click", (e) => {
        if (e.target === panel) panel.classList.remove("open");
      });
      document.getElementById("btnCloseNotif").addEventListener("click", () => panel.classList.remove("open"));
      document.getElementById("btnMarkAllRead").addEventListener("click", async () => {
        await window.ajoApi.markAllNotificationsRead();
        this.renderNotifications();
        this.updateNotificationBadge();
        this.showToast("success", "Semua Dibaca", "Seluruh notifikasi telah ditandai dibaca.");
      });
    }

    panel.classList.add("open");
    this.renderNotifications();
  }

  async renderNotifications() {
    const list = document.getElementById("notifListContainer");
    if (!list || !window.ajoApi) return;
    const notifs = await window.ajoApi.getCollection("notifications");

    if (!notifs.length) {
      list.innerHTML = `<div class="cmd-empty">Tidak ada notifikasi saat ini.</div>`;
      return;
    }

    list.innerHTML = notifs.map(n => `
      <div class="notif-item ${n.unread ? "unread" : ""}" data-id="${n.id}">
        <div class="notif-indicator ${n.type}"></div>
        <div class="notif-body">
          <div class="notif-head">
            <span class="notif-name">${n.title}</span>
            <span class="notif-time">${n.time}</span>
          </div>
          <div class="notif-desc">${n.message}</div>
        </div>
      </div>
    `).join("");

    list.querySelectorAll(".notif-item").forEach(el => {
      el.addEventListener("click", async () => {
        const id = el.getAttribute("data-id");
        await window.ajoApi.markNotificationRead(id);
        el.classList.remove("unread");
        this.updateNotificationBadge();
      });
    });
  }

  /* ================= 5. THEME CUSTOMIZER DRAWER ================= */
  openThemeCustomizer() {
    let customizer = document.getElementById("ajoThemeCustomizer");
    if (!customizer) {
      customizer = document.createElement("div");
      customizer.id = "ajoThemeCustomizer";
      customizer.className = "customizer-drawer-overlay";
      customizer.innerHTML = `
        <div class="customizer-drawer">
          <div class="customizer-header">
            <h3>Kustomisasi Tema & Tampilan</h3>
            <button class="modal-close" id="btnCloseCustomizer">&times;</button>
          </div>
          <div class="customizer-body">
            <div class="form-group">
              <label class="nm-label">Mode Warna Latar</label>
              <div style="display: flex; gap: 10px;">
                <button class="btn btn-nm btn-sm btn-mode" data-mode="light">Terang</button>
                <button class="btn btn-nm btn-sm btn-mode" data-mode="dark">Gelap</button>
                <button class="btn btn-nm btn-sm btn-mode" data-mode="system">Sistem</button>
              </div>
            </div>

            <div class="form-group">
              <label class="nm-label">Warna Aksen Utama</label>
              <div style="display: flex; gap: 12px; margin-top: 6px;">
                <button class="accent-circle" data-accent="#38c8a7" style="background: #38c8a7;"></button>
                <button class="accent-circle" data-accent="#9d75c2" style="background: #9d75c2;"></button>
                <button class="accent-circle" data-accent="#4a90e2" style="background: #4a90e2;"></button>
                <button class="accent-circle" data-accent="#f06a88" style="background: #f06a88;"></button>
                <button class="accent-circle" data-accent="#f7ca45" style="background: #f7ca45;"></button>
              </div>
            </div>

            <div class="form-group">
              <label class="nm-label">Kelengkungan Sudut (Border Radius)</label>
              <div style="display: flex; gap: 10px;">
                <button class="btn btn-nm btn-sm btn-radius" data-radius="14px">Kompak</button>
                <button class="btn btn-nm btn-sm btn-radius" data-radius="22px">Standar</button>
                <button class="btn btn-nm btn-sm btn-radius" data-radius="30px">Bulat</button>
              </div>
            </div>

            <button class="btn btn-danger btn-sm" id="btnResetTheme" style="width: 100%; margin-top: 20px;">Reset ke Default</button>
          </div>
        </div>
      `;
      document.body.appendChild(customizer);

      customizer.addEventListener("click", (e) => {
        if (e.target === customizer) customizer.classList.remove("open");
      });
      document.getElementById("btnCloseCustomizer").addEventListener("click", () => customizer.classList.remove("open"));

      customizer.querySelectorAll(".btn-mode").forEach(btn => {
        btn.addEventListener("click", () => {
          this.applyTheme(btn.getAttribute("data-mode"), true);
          this.showToast("info", "Mode Diperbarui", `Mode diatur ke ${btn.textContent}`);
        });
      });

      customizer.querySelectorAll(".accent-circle").forEach(btn => {
        btn.addEventListener("click", () => {
          const col = btn.getAttribute("data-accent");
          document.documentElement.style.setProperty("--teal-btn", col);
          localStorage.setItem("ajo_accent", col);
          this.showToast("success", "Warna Aksen", "Warna aksen tema telah diterapkan.");
        });
      });

      customizer.querySelectorAll(".btn-radius").forEach(btn => {
        btn.addEventListener("click", () => {
          const r = btn.getAttribute("data-radius");
          document.documentElement.style.setProperty("--card-radius", r);
          localStorage.setItem("ajo_radius", r);
          this.showToast("info", "Radius Diubah", `Radius diatur ke ${r}`);
        });
      });

      document.getElementById("btnResetTheme").addEventListener("click", () => {
        localStorage.removeItem("ajo_theme");
        localStorage.removeItem("ajo_accent");
        localStorage.removeItem("ajo_radius");
        this.applyTheme("light", true);
        document.documentElement.style.setProperty("--teal-btn", "#38c8a7");
        document.documentElement.style.setProperty("--card-radius", "22px");
        this.showToast("warning", "Reset Tema", "Seluruh pengaturan tema dikembalikan ke awal.");
      });
    }

    customizer.classList.add("open");
  }
}

window.ajoFramework = new AjoFramework();
