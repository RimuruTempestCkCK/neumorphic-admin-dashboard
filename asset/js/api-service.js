/**
 * ajogalehlauak - Service Adapter & Mock Storage Layer
 * Menyediakan antarmuka REST API client standar yang dapat dialihkan antara mode MOCK (LocalStorage)
 * dan mode REAL API backend tanpa merusak arsitektur frontend.
 */
class AjoApiService {
  constructor() {
    this.useMock = true; // Mode demo lokal murni (tanpa backend/API eksternal)
    this.tokenKey = "ajo_auth_token";
    this.initLocalStorage();
  }

  initLocalStorage() {
    if (!localStorage.getItem("ajo_users")) {
      localStorage.setItem("ajo_users", JSON.stringify(window.AjoData.users));
    }
    if (!localStorage.getItem("ajo_inventory")) {
      localStorage.setItem("ajo_inventory", JSON.stringify(window.AjoData.inventory));
    }
    if (!localStorage.getItem("ajo_orders")) {
      localStorage.setItem("ajo_orders", JSON.stringify(window.AjoData.orders));
    }
    if (!localStorage.getItem("ajo_notifications")) {
      localStorage.setItem("ajo_notifications", JSON.stringify(window.AjoData.notifications));
    }
    if (!localStorage.getItem("ajo_activity_logs")) {
      localStorage.setItem("ajo_activity_logs", JSON.stringify(window.AjoData.activityLogs));
    }
    if (!localStorage.getItem("ajo_calendar_events")) {
      localStorage.getItem("ajo_calendar_events") || localStorage.setItem("ajo_calendar_events", JSON.stringify(window.AjoData.calendarEvents));
    }
    if (!localStorage.getItem("ajo_tasks")) {
      localStorage.getItem("ajo_tasks") || localStorage.setItem("ajo_tasks", JSON.stringify(window.AjoData.tasks));
    }
    if (!localStorage.getItem("ajo_blog_articles")) {
      localStorage.setItem("ajo_blog_articles", JSON.stringify(window.AjoData.blogArticles || []));
    } else {
      // Sinkronisasi field gambar jika versi lama di LocalStorage belum memiliki image
      try {
        const stored = JSON.parse(localStorage.getItem("ajo_blog_articles") || "[]");
        if (stored.length && !stored[0].image && window.AjoData && window.AjoData.blogArticles) {
          const mapImages = new Map((window.AjoData.blogArticles || []).map(a => [a.id, a.image]));
          stored.forEach(item => {
            if (!item.image && mapImages.has(item.id)) {
              item.image = mapImages.get(item.id);
            }
          });
          localStorage.setItem("ajo_blog_articles", JSON.stringify(stored));
        }
      } catch (err) {
        console.warn("Gagal sinkronisasi gambar artikel:", err);
      }
    }
  }

  // Helper HTTP Header (Simulasi Authorization)
  getHeaders() {
    const token = localStorage.getItem(this.tokenKey);
    return {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {})
    };
  }

  // --- GENERIC CRUD ADAPTERS ---
  async getCollection(resourceKey) {
    await this._simulateDelay(60);
    return JSON.parse(localStorage.getItem(`ajo_${resourceKey}`)) || [];
  }

  async saveItem(resourceKey, item) {
    await this._simulateDelay(80);
    const items = await this.getCollection(resourceKey);
    const idKey = item.id ? "id" : (item.sku ? "sku" : "orderId");
    const index = items.findIndex(i => i[idKey] === item[idKey]);

    if (index >= 0) {
      items[index] = { ...items[index], ...item };
    } else {
      items.unshift(item);
    }
    localStorage.setItem(`ajo_${resourceKey}`, JSON.stringify(items));
    return item;
  }

  async deleteItem(resourceKey, idVal) {
    await this._simulateDelay(80);
    const items = await this.getCollection(resourceKey);
    const filtered = items.filter(i => (i.id !== idVal && i.sku !== idVal && i.orderId !== idVal));
    localStorage.setItem(`ajo_${resourceKey}`, JSON.stringify(filtered));
    return { success: true, deletedId: idVal };
  }

  // --- NOTIFICATION SPECIFIC ADAPTERS ---
  async markNotificationRead(notifId) {
    const notifs = await this.getCollection("notifications");
    const target = notifs.find(n => n.id === notifId);
    if (target) {
      target.unread = false;
      localStorage.setItem("ajo_notifications", JSON.stringify(notifs));
    }
    return notifs;
  }

  async markAllNotificationsRead() {
    const notifs = await this.getCollection("notifications");
    notifs.forEach(n => n.unread = false);
    localStorage.setItem("ajo_notifications", JSON.stringify(notifs));
    return notifs;
  }

  // --- AUTHENTICATION DEMO ADAPTER ---
  async login(email, password) {
    await this._simulateDelay(250);
    if (password === "secret123" || password.length >= 6) {
      const user = window.AjoData.users.find(u => u.email === email) || window.AjoData.users[0];
      return { success: true, user, token: "demo-jwt-token-ajogaleh-2026" };
    }
    throw new Error("Password atau email tidak sesuai (Gunakan minimal 6 karakter)");
  }

  _simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

window.ajoApi = new AjoApiService();
