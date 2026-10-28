/**
 * ajogalehlauak - Service Adapter & Mock Storage Layer
 * Menyediakan antarmuka REST API client standar yang dapat dialihkan antara mode MOCK (LocalStorage)
 * dan mode REAL API backend tanpa merusak arsitektur frontend.
 */
class AjoApiService {
  constructor() {
    this.useMock = true; // Set ke false jika REST API backend sudah tersedia
    this.apiBaseUrl = "https://api.ajogalehlauak.com/v1"; // Endpoint produksi / staging
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
    if (this.useMock) {
      await this._simulateDelay(80);
      return JSON.parse(localStorage.getItem(`ajo_${resourceKey}`)) || [];
    }
    const res = await fetch(`${this.apiBaseUrl}/${resourceKey}`, { headers: this.getHeaders() });
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    return await res.json();
  }

  async saveItem(resourceKey, item) {
    if (this.useMock) {
      await this._simulateDelay(120);
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
    const method = item.id ? "PUT" : "POST";
    const res = await fetch(`${this.apiBaseUrl}/${resourceKey}`, {
      method,
      headers: this.getHeaders(),
      body: JSON.stringify(item)
    });
    return await res.json();
  }

  async deleteItem(resourceKey, idVal) {
    if (this.useMock) {
      await this._simulateDelay(100);
      const items = await this.getCollection(resourceKey);
      const filtered = items.filter(i => (i.id !== idVal && i.sku !== idVal && i.orderId !== idVal));
      localStorage.setItem(`ajo_${resourceKey}`, JSON.stringify(filtered));
      return { success: true, deletedId: idVal };
    }
    const res = await fetch(`${this.apiBaseUrl}/${resourceKey}/${idVal}`, {
      method: "DELETE",
      headers: this.getHeaders()
    });
    return await res.json();
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
