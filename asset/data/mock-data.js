/**
 * ajogalehlauak - Mock Data Store
 * Data terpusat untuk Dashboard, Tabel, Logistik, Pengguna, Kalender, Notifikasi & Laporan
 */
window.AjoData = {
  users: [
    { id: "USR-001", name: "Jessica Miller", email: "jessica@ajogaleh.com", role: "Super Admin", status: "Active", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80", phone: "+62 812-3456-7890", location: "Padang, Sumatera Barat", joined: "2025-01-15" },
    { id: "USR-002", name: "Rizky Pratama", email: "rizky@ajogaleh.com", role: "Manager Logistik", status: "Active", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80", phone: "+62 813-7890-1234", location: "Pariaman, Sumatera Barat", joined: "2025-03-20" },
    { id: "USR-003", name: "Ahmad Hidayat", email: "ahmad@ajogaleh.com", role: "Staff Cold Storage", status: "Active", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80", phone: "+62 821-4567-8901", location: "Muaro, Padang", joined: "2025-05-10" },
    { id: "USR-004", name: "Sarah Jenkins", email: "sarah@mitraresto.id", role: "Mitra Restoran", status: "Active", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80", phone: "+62 811-9876-5432", location: "Bukittinggi", joined: "2025-06-01" },
    { id: "USR-005", name: "David Beckham", email: "david@selamat.co", role: "Mitra Restoran", status: "Inactive", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80", phone: "+62 852-1234-5678", location: "Payakumbuh", joined: "2025-08-14" },
    { id: "USR-006", name: "Emma Watson", email: "emma@creativebunda.id", role: "Viewer / Auditor", status: "Active", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80", phone: "+62 819-2345-6789", location: "Padang", joined: "2025-09-12" }
  ],

  inventory: [
    { sku: "SEA-001", name: "Kakap Merah Segar", category: "Ikan Laut", weight: 450, unit: "kg", pricePerKg: 80000, batch: "B-20261028-01", supplier: "Nelayan Muaro Padang", receivedDate: "2026-10-28", expiryDate: "2026-11-04", status: "In Stock", minStock: 100, rack: "RAK-01A", temp: -18.4 },
    { sku: "SEA-002", name: "Ikan Tongkol Sisik", category: "Ikan Laut", weight: 820, unit: "kg", pricePerKg: 40000, batch: "B-20261028-02", supplier: "Pendaratan Bungus", receivedDate: "2026-10-28", expiryDate: "2026-11-03", status: "In Stock", minStock: 150, rack: "RAK-01B", temp: -18.2 },
    { sku: "SEA-003", name: "Tenggiri Batang Super", category: "Ikan Laut", weight: 95, unit: "kg", pricePerKg: 95000, batch: "B-20261027-01", supplier: "Koperasi Nelayan Pariaman", receivedDate: "2026-10-27", expiryDate: "2026-11-02", status: "Low Stock", minStock: 100, rack: "RAK-02A", temp: -17.9 },
    { sku: "SEA-004", name: "Udang Windu Grade A", category: "Krustasea", weight: 240, unit: "kg", pricePerKg: 120000, batch: "B-20261027-02", supplier: "Tambak Pesisir Selatan", receivedDate: "2026-10-27", expiryDate: "2026-11-05", status: "In Stock", minStock: 80, rack: "RAK-02B", temp: -19.1 },
    { sku: "SEA-005", name: "Cumi-Cumi Sero", category: "Moluska", weight: 310, unit: "kg", pricePerKg: 75000, batch: "B-20261026-01", supplier: "Nelayan Muaro Padang", receivedDate: "2026-10-26", expiryDate: "2026-11-01", status: "In Stock", minStock: 90, rack: "RAK-03A", temp: -18.0 },
    { sku: "SEA-006", name: "Kerapu Cantik Hidup/Es", category: "Ikan Karang", weight: 60, unit: "kg", pricePerKg: 140000, batch: "B-20261026-02", supplier: "Keramba Mandeh", receivedDate: "2026-10-26", expiryDate: "2026-11-02", status: "Low Stock", minStock: 75, rack: "RAK-03B", temp: -16.5 },
    { sku: "SEA-007", name: "Ikan Kembung Banjar", category: "Ikan Laut", weight: 640, unit: "kg", pricePerKg: 38000, batch: "B-20261028-03", supplier: "TPI Carocok", receivedDate: "2026-10-28", expiryDate: "2026-11-04", status: "In Stock", minStock: 120, rack: "RAK-01C", temp: -18.1 },
    { sku: "SEA-008", name: "Kepiting Bakau Segar", category: "Krustasea", weight: 35, unit: "kg", pricePerKg: 160000, batch: "B-20261025-01", supplier: "Tambak Tiku Agam", receivedDate: "2026-10-25", expiryDate: "2026-10-31", status: "Low Stock", minStock: 50, rack: "RAK-04A", temp: -15.5 }
  ],

  orders: [
    { orderId: "ORD-2026-881", customer: "Restoran Sederhana Padang", items: "Kakap Merah (120 Kg)", total: 9600000, orderDate: "2026-10-28", destination: "Jl. Bagindo Aziz Chan, Padang", deliveryStatus: "Delivered", paymentStatus: "Paid", driver: "Budi Santoso (Armada 01)", batch: "B-20261028-01" },
    { orderId: "ORD-2026-882", customer: "Rumah Makan Selamat Bukittinggi", items: "Ikan Tongkol (85 Kg)", total: 3400000, orderDate: "2026-10-28", destination: "Jl. Ahmad Yani, Bukittinggi", deliveryStatus: "In Transit", paymentStatus: "Pending", driver: "Hendra Wijaya (Armada 03)", batch: "B-20261028-02" },
    { orderId: "ORD-2026-883", customer: "Depot Ikan Basah Muaro", items: "Tenggiri Pilihan (40 Kg)", total: 3800000, orderDate: "2026-10-27", destination: "Kawasan Muaro Pantai, Padang", deliveryStatus: "Returned", paymentStatus: "Refunded", driver: "Budi Santoso (Armada 01)", batch: "B-20261027-01" },
    { orderId: "ORD-2026-884", customer: "Katering Bunda Mandiri", items: "Cumi-Cumi & Udang (60 Kg)", total: 6850000, orderDate: "2026-10-27", destination: "Jl. Khatib Sulaiman, Padang", deliveryStatus: "Delivered", paymentStatus: "Paid", driver: "Eko Prasetyo (Armada 02)", batch: "B-20261027-02" },
    { orderId: "ORD-2026-885", customer: "Hotel Grand Inna Padang", items: "Kakap Merah & Kerapu (75 Kg)", total: 8100000, orderDate: "2026-10-26", destination: "Jl. Gereja No. 34, Padang", deliveryStatus: "Delivered", paymentStatus: "Paid", driver: "Eko Prasetyo (Armada 02)", batch: "B-20261026-02" },
    { orderId: "ORD-2026-886", customer: "RM Simpang Raya Payakumbuh", items: "Ikan Kembung Banjar (110 Kg)", total: 4180000, orderDate: "2026-10-28", destination: "Jl. Sudirman, Payakumbuh", deliveryStatus: "Processing", paymentStatus: "Paid", driver: "Hendra Wijaya (Armada 03)", batch: "B-20261028-03" }
  ],

  temperatureSensors: [
    { id: "SENS-01", room: "Cold Storage Sentral 01", location: "Muaro Padang", currentTemp: -18.4, thresholdMin: -22.0, thresholdMax: -16.0, status: "Normal", lastUpdated: "2026-10-28 14:45", history: [-18.2, -18.5, -18.4, -18.3, -18.6, -18.4] },
    { id: "SENS-02", room: "Freezer Ruang Pembekuan Cepat", location: "Muaro Padang", currentTemp: -24.8, thresholdMin: -28.0, thresholdMax: -20.0, status: "Normal", lastUpdated: "2026-10-28 14:48", history: [-24.1, -24.5, -25.0, -24.7, -24.8, -24.8] },
    { id: "SENS-03", room: "Cold Storage Cabang Pariaman", location: "Pariaman Hub", currentTemp: -15.1, thresholdMin: -20.0, thresholdMax: -16.0, status: "Warning", lastUpdated: "2026-10-28 14:40", history: [-17.5, -17.0, -16.2, -15.8, -15.4, -15.1] },
    { id: "SENS-04", room: "Armada Berpendingin 01 (ThermoKing)", location: "Rute Padang - Bukittinggi", currentTemp: -17.9, thresholdMin: -20.0, thresholdMax: -14.0, status: "Normal", lastUpdated: "2026-10-28 14:50", history: [-18.0, -17.8, -17.9, -18.1, -17.7, -17.9] },
    { id: "SENS-05", room: "Armada Berpendingin 03", location: "Rute Padang - Payakumbuh", currentTemp: -13.8, thresholdMin: -20.0, thresholdMax: -15.0, status: "Critical", lastUpdated: "2026-10-28 14:51", history: [-16.2, -15.5, -14.8, -14.2, -13.9, -13.8] }
  ],

  notifications: [
    { id: "NOTIF-1", title: "Pembaruan Rantai Dingin Berhasil", message: "Seluruh tangkapan laut hari ini dari Muaro Padang telah disinkronkan ke cold storage.", time: "10 menit lalu", type: "success", unread: true },
    { id: "NOTIF-2", title: "Peringatan Suhu: Armada 03", message: "Suhu kompartemen Armada 03 naik ke -13.8°C (ambang batas -15°C). Segera hubungi driver.", time: "25 menit lalu", type: "danger", unread: true },
    { id: "NOTIF-3", title: "Pesanan Baru Masuk #ORD-886", message: "RM Simpang Raya Payakumbuh memesan 110 Kg Ikan Kembung Banjar.", time: "1 jam lalu", type: "info", unread: true },
    { id: "NOTIF-4", title: "Stok Menipis: Tenggiri Batang", message: "Sisa stok di Rak RAK-02A tinggal 95 Kg (di bawah batas minimum 100 Kg).", time: "3 jam lalu", type: "warning", unread: true },
    { id: "NOTIF-5", title: "Pengiriman Selesai #ORD-881", message: "Armada 01 berhasil mengantarkan 120 Kg Kakap Merah ke Restoran Sederhana.", time: "5 jam lalu", type: "success", unread: false }
  ],

  activityLogs: [
    { id: "LOG-101", user: "Jessica Miller", role: "Super Admin", action: "UPDATE", entity: "Inventory #SEA-001", details: "Menambahkan batch stok Kakap Merah 450 Kg dari TPI Muaro", timestamp: "2026-10-28 14:15:20", ip: "192.168.1.14" },
    { id: "LOG-102", user: "Rizky Pratama", role: "Manager Logistik", action: "DISPATCH", entity: "Shipment #ORD-882", details: "Menugaskan Armada 03 menuju Bukittinggi", timestamp: "2026-10-28 13:40:11", ip: "192.168.1.28" },
    { id: "LOG-103", user: "Ahmad Hidayat", role: "Staff Cold Storage", action: "CHECK", entity: "Sensors #SENS-01", details: "Inspeksi rutin kompresor Cold Storage Padang Sentral - Suhu normal", timestamp: "2026-10-28 12:20:05", ip: "192.168.1.45" },
    { id: "LOG-104", user: "System Automator", role: "Cron Job", action: "SYNC", entity: "IoT Gateway", details: "Sinkronisasi otomatis telemetri 5 titik sensor suhu", timestamp: "2026-10-28 12:00:00", ip: "127.0.0.1" },
    { id: "LOG-105", user: "Jessica Miller", role: "Super Admin", action: "APPROVE", entity: "Invoice #ORD-881", details: "Konfirmasi pelunasan pembayaran Rp 9.600.000", timestamp: "2026-10-28 11:10:45", ip: "192.168.1.14" }
  ],

  calendarEvents: [
    { id: "EVT-1", title: "Penerimaan Kapal Nelayan Muaro", date: "2026-10-28", time: "06:00 - 09:00", category: "Penerimaan", priority: "Tinggi", location: "Dermaga TPI Muaro", status: "Selesai" },
    { id: "EVT-2", title: "Inspeksi Berkala Cold Storage", date: "2026-10-28", time: "14:00 - 15:30", category: "Maintenance", priority: "Sedang", location: "Gudang Sentral Padang", status: "Berlangsung" },
    { id: "EVT-3", title: "Jadwal Distribusi Wilayah Bukittinggi", date: "2026-10-29", time: "07:00 - 12:00", category: "Logistik", priority: "Tinggi", location: "Rute Padang - Bukittinggi", status: "Terjadwal" },
    { id: "EVT-4", title: "Audit Mutu & Kebersihan HACCP", date: "2026-10-30", time: "09:00 - 11:30", category: "Audit", priority: "Penting", location: "Semua Fasilitas", status: "Terjadwal" },
    { id: "EVT-5", title: "Pertemuan Evaluasi Mitra Restoran", date: "2026-10-31", time: "13:30 - 16:00", category: "Meeting", priority: "Sedang", location: "Ruang Rapat Utama", status: "Terjadwal" }
  ],

  tasks: [
    { id: "TSK-1", title: "Kalibrasi Sensor Suhu Armada 03", dueDate: "2026-10-28", priority: "Tinggi", category: "Maintenance", status: "In Progress", assignee: "Ahmad Hidayat" },
    { id: "TSK-2", title: "Cetak Ulang Dokumen Sertifikat Karantina", dueDate: "2026-10-29", priority: "Sedang", category: "Administrasi", status: "Pending", assignee: "Jessica Miller" },
    { id: "TSK-3", title: "Pengecekan Stok Box Sterofoam & Es Curah", dueDate: "2026-10-29", priority: "Rendah", category: "Logistik", status: "Pending", assignee: "Rizky Pratama" },
    { id: "TSK-4", title: "Konfirmasi Pasokan Kakap Merah 500 Kg", dueDate: "2026-10-30", priority: "Tinggi", category: "Pengadaan", status: "Completed", assignee: "Jessica Miller" }
  ],

  reports: {
    monthlySummary: {
      totalVolumeKg: 3230,
      totalRevenueRp: 258400000,
      activePartners: 84,
      onTimeDeliveryRate: 99.2,
      averageStorageTemp: -18.2
    },
    topCommodities: [
      { name: "Kakap Merah", volumeKg: 1250, revenueRp: 100000000, percentage: 38.7 },
      { name: "Ikan Tongkol Sisik", volumeKg: 980, revenueRp: 39200000, percentage: 30.3 },
      { name: "Tenggiri Batang Super", volumeKg: 420, revenueRp: 39900000, percentage: 13.0 },
      { name: "Udang Windu", volumeKg: 350, revenueRp: 42000000, percentage: 10.8 },
      { name: "Cumi-Cumi Sero", volumeKg: 230, revenueRp: 17250000, percentage: 7.2 }
    ]
  }
};
