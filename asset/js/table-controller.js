/**
 * ajogalehlauak - Advanced Table Controller
 * Mendukung Search Debounce, Multi-column Sort, Multi-filter Status/Kategori,
 * Dynamic Pagination, Row Checkboxes, Bulk Actions, dan CSV Export
 */
class AjoTableController {
  constructor(options) {
    this.tableId = options.tableId;
    this.resourceKey = options.resourceKey;
    this.columns = options.columns;
    this.pageSize = options.pageSize || 5;
    this.currentPage = 1;
    this.searchQuery = "";
    this.sortColumn = options.defaultSort || null;
    this.sortOrder = "asc"; // 'asc' or 'desc'
    this.filters = {};
    this.selectedIds = new Set();
    this.rawData = [];
    this.filteredData = [];

    this.init();
  }

  async init() {
    if (window.ajoApi) {
      this.rawData = await window.ajoApi.getCollection(this.resourceKey);
    } else {
      this.rawData = window.AjoData[this.resourceKey] || [];
    }
    this.setupListeners();
    this.applyFilterAndRender();
  }

  setupListeners() {
    const searchInput = document.getElementById(`${this.tableId}_search`);
    if (searchInput) {
      let timeout = null;
      searchInput.addEventListener("input", (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.searchQuery = e.target.value.toLowerCase().trim();
          this.currentPage = 1;
          this.applyFilterAndRender();
        }, 200);
      });
    }

    const pageSizeSelect = document.getElementById(`${this.tableId}_pagesize`);
    if (pageSizeSelect) {
      pageSizeSelect.addEventListener("change", (e) => {
        this.pageSize = parseInt(e.target.value, 10);
        this.currentPage = 1;
        this.applyFilterAndRender();
      });
    }

    const filterStatus = document.getElementById(`${this.tableId}_filter_status`);
    if (filterStatus) {
      filterStatus.addEventListener("change", (e) => {
        this.filters.status = e.target.value;
        this.currentPage = 1;
        this.applyFilterAndRender();
      });
    }

    const exportBtn = document.getElementById(`${this.tableId}_export_csv`);
    if (exportBtn) {
      exportBtn.addEventListener("click", () => this.exportCSV());
    }

    const selectAllCheck = document.getElementById(`${this.tableId}_select_all`);
    if (selectAllCheck) {
      selectAllCheck.addEventListener("change", (e) => {
        const checked = e.target.checked;
        const pageItems = this.getCurrentPageRecords();
        pageItems.forEach(item => {
          const id = this.getItemId(item);
          if (checked) this.selectedIds.add(id);
          else this.selectedIds.delete(id);
        });
        this.updateCheckboxVisuals();
      });
    }
  }

  getItemId(item) {
    return item.id || item.sku || item.orderId;
  }

  applyFilterAndRender() {
    // 1. Filter & Search
    this.filteredData = this.rawData.filter(item => {
      // Check filters
      if (this.filters.status && this.filters.status !== "ALL") {
        const itemStatus = item.status || item.deliveryStatus;
        if (itemStatus !== this.filters.status) return false;
      }
      // Check Search across all values
      if (this.searchQuery) {
        const match = Object.values(item).some(val => 
          String(val).toLowerCase().includes(this.searchQuery)
        );
        if (!match) return false;
      }
      return true;
    });

    // 2. Sorting
    if (this.sortColumn) {
      this.filteredData.sort((a, b) => {
        let valA = a[this.sortColumn];
        let valB = b[this.sortColumn];

        if (typeof valA === "string") valA = valA.toLowerCase();
        if (typeof valB === "string") valB = valB.toLowerCase();

        if (valA < valB) return this.sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return this.sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    // 3. Render HTML
    this.renderTableBody();
    this.renderPagination();
    this.updateInfoCount();
  }

  getCurrentPageRecords() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredData.slice(start, start + this.pageSize);
  }

  renderTableBody() {
    const tbody = document.getElementById(`${this.tableId}_tbody`) || document.getElementById(`${this.tableId}_body`);
    if (!tbody) return;

    const pageRecords = this.getCurrentPageRecords();

    if (pageRecords.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="${this.columns.length + 2}" style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
            <div style="margin-bottom: 8px;">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="opacity: 0.5;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <div style="font-weight: 600; font-size: 14px;">Tidak Ada Data yang Ditemukan</div>
            <div style="font-size: 12px; margin-top: 4px;">Coba gunakan kata kunci pencarian atau filter yang berbeda.</div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = pageRecords.map(item => {
      const id = this.getItemId(item);
      const isSelected = this.selectedIds.has(id);

      return `
        <tr class="${isSelected ? "row-selected" : ""}" data-id="${id}">
          <td style="width: 40px; text-align: center;">
            <input type="checkbox" class="row-checkbox" data-id="${id}" ${isSelected ? "checked" : ""}>
          </td>
          ${this.columns.map(col => `<td>${col.render ? col.render(item[col.key], item) : (item[col.key] || "-")}</td>`).join("")}
          <td style="text-align: right; white-space: nowrap;">
            <button class="btn btn-nm btn-sm btn-action-view" data-id="${id}" title="Lihat Rincian">Detail</button>
            <button class="btn btn-nm btn-sm btn-action-edit" data-id="${id}" title="Edit Data" style="color: #4a90e2;">Edit</button>
          </td>
        </tr>
      `;
    }).join("");

    // Attach row events
    tbody.querySelectorAll(".row-checkbox").forEach(chk => {
      chk.addEventListener("change", (e) => {
        const id = e.target.getAttribute("data-id");
        if (e.target.checked) this.selectedIds.add(id);
        else this.selectedIds.delete(id);
        this.updateCheckboxVisuals();
      });
    });

    tbody.querySelectorAll(".btn-action-view").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const item = this.rawData.find(i => this.getItemId(i) === id);
        if (window.ajoFramework && item) {
          window.ajoFramework.showToast("info", "Rincian Data", `${item.name || item.customer || id}`);
        }
      });
    });

    tbody.querySelectorAll(".btn-action-edit").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (window.ajoFramework) {
          window.ajoFramework.showToast("warning", "Edit Data", `Membuka form edit untuk ${id}`);
        }
      });
    });
  }

  updateCheckboxVisuals() {
    const selectAllCheck = document.getElementById(`${this.tableId}_select_all`);
    const pageItems = this.getCurrentPageRecords();
    const allOnPageChecked = pageItems.length > 0 && pageItems.every(i => this.selectedIds.has(this.getItemId(i)));

    if (selectAllCheck) selectAllCheck.checked = allOnPageChecked;

    const countBadge = document.getElementById(`${this.tableId}_selected_count`);
    if (countBadge) {
      countBadge.textContent = this.selectedIds.size;
      countBadge.style.display = this.selectedIds.size > 0 ? "inline-block" : "none";
    }

    const tbody = document.getElementById(`${this.tableId}_tbody`) || document.getElementById(`${this.tableId}_body`);
    if (tbody) {
      tbody.querySelectorAll("tr").forEach(tr => {
        const id = tr.getAttribute("data-id");
        if (this.selectedIds.has(id)) tr.classList.add("row-selected");
        else tr.classList.remove("row-selected");
      });
    }
  }

  renderPagination() {
    const totalPages = Math.ceil(this.filteredData.length / this.pageSize) || 1;
    const container = document.getElementById(`${this.tableId}_pagination`);
    if (!container) return;

    let html = `<button class="page-btn ${this.currentPage === 1 ? "disabled" : ""}" data-page="${this.currentPage - 1}">«</button>`;
    for (let p = 1; p <= totalPages; p++) {
      html += `<button class="page-btn ${p === this.currentPage ? "active" : ""}" data-page="${p}">${p}</button>`;
    }
    html += `<button class="page-btn ${this.currentPage === totalPages ? "disabled" : ""}" data-page="${this.currentPage + 1}">»</button>`;

    container.innerHTML = html;

    container.querySelectorAll(".page-btn:not(.disabled)").forEach(btn => {
      btn.addEventListener("click", () => {
        this.currentPage = parseInt(btn.getAttribute("data-page"), 10);
        this.applyFilterAndRender();
      });
    });
  }

  updateInfoCount() {
    const info = document.getElementById(`${this.tableId}_info`);
    if (!info) return;
    const start = this.filteredData.length === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage * this.pageSize, this.filteredData.length);
    info.textContent = `Menampilkan ${start} - ${end} dari ${this.filteredData.length} entri`;
  }

  exportCSV() {
    if (!this.filteredData.length) {
      if (window.ajoFramework) window.ajoFramework.showToast("warning", "Ekspor Gagal", "Tidak ada data untuk diekspor");
      return;
    }

    const headers = this.columns.map(c => `"${c.label}"`).join(",");
    const rows = this.filteredData.map(item => 
      this.columns.map(c => `"${item[c.key] !== undefined ? item[c.key] : ""}"`).join(",")
    );

    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `export_${this.resourceKey}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    if (window.ajoFramework) {
      window.ajoFramework.showToast("success", "Ekspor Berhasil", "Berkas CSV berhasil diunduh.");
    }
  }
}

window.AjoTableController = AjoTableController;
