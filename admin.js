/**
 * Gupta's Dental - Clinic Admin Portal Script
 * Vanilla JavaScript (Zero external libraries, zero client-side password verification)
 */

const API_URL = (typeof window !== 'undefined' && window.API_URL && window.API_URL !== 'PASTE_APPS_SCRIPT_EXEC_URL_HERE')
  ? window.API_URL
  : 'https://script.google.com/macros/s/AKfycbw_wmmuPmkMQudFS8A2aw8vlN689ED1oa0b8phmxFZa_mezOICKdUqC7uJtZJDj4rpEmw/exec';

(function () {
  'use strict';

  // State Management
  let allBookings = [];
  let autoRefreshInterval = null;
  let isFetching = false;

  // DOM Elements
  const loginScreen = document.getElementById('login-screen');
  const dashboardScreen = document.getElementById('dashboard-screen');
  const loginForm = document.getElementById('login-form');
  const passwordInput = document.getElementById('admin-password');
  const btnTogglePwd = document.getElementById('btn-toggle-password');
  const loginError = document.getElementById('login-error');
  const btnLogin = document.getElementById('btn-login');

  const btnRefresh = document.getElementById('btn-refresh');
  const btnExportCsv = document.getElementById('btn-export-csv');
  const btnLogout = document.getElementById('btn-logout');

  const statTotal = document.getElementById('stat-total');
  const statToday = document.getElementById('stat-today');
  const statPending = document.getElementById('stat-pending');

  const filterSearch = document.getElementById('filter-search');
  const filterBranch = document.getElementById('filter-branch');
  const filterStatus = document.getElementById('filter-status');
  const filterDate = document.getElementById('filter-date');
  const btnClearDate = document.getElementById('btn-clear-date');
  const btnResetFilters = document.getElementById('btn-reset-filters');
  const resultsCount = document.getElementById('results-count');
  const tableBody = document.getElementById('table-body');
  const toastContainer = document.getElementById('toast-container');

  /* ==========================================================================
     1. Toast Notifications
     ========================================================================== */
  function showToast(message, type = 'info', duration = 3500) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const textSpan = document.createElement('span');
    textSpan.textContent = message;
    toast.appendChild(textSpan);

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, duration);
  }

  /* ==========================================================================
     2. Authentication & Session Handling
     ========================================================================== */
  function getSavedPassword() {
    return sessionStorage.getItem('gd_admin_password') || '';
  }

  function setSavedPassword(pwd) {
    sessionStorage.setItem('gd_admin_password', pwd);
  }

  function clearSavedPassword() {
    sessionStorage.removeItem('gd_admin_password');
  }

  function showLoginScreen(errorMsg = '') {
    if (autoRefreshInterval) {
      clearInterval(autoRefreshInterval);
      autoRefreshInterval = null;
    }
    dashboardScreen.style.display = 'none';
    loginScreen.style.display = 'flex';
    if (errorMsg) {
      loginError.textContent = errorMsg;
      loginError.style.display = 'block';
    } else {
      loginError.style.display = 'none';
      loginError.textContent = '';
    }
    passwordInput.value = '';
    passwordInput.focus();
  }

  function showDashboardScreen() {
    loginScreen.style.display = 'none';
    dashboardScreen.style.display = 'block';
    startAutoRefresh();
  }

  // Toggle password visibility
  if (btnTogglePwd && passwordInput) {
    btnTogglePwd.addEventListener('click', () => {
      const isPwd = passwordInput.type === 'password';
      passwordInput.type = isPwd ? 'text' : 'password';
      btnTogglePwd.setAttribute('aria-label', isPwd ? 'Hide password' : 'Show password');
    });
  }

  // Login form submission
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const enteredPassword = passwordInput.value.trim();
      if (!enteredPassword) {
        loginError.textContent = 'Please enter your password.';
        loginError.style.display = 'block';
        return;
      }

      btnLogin.disabled = true;
      const originalText = btnLogin.innerHTML;
      btnLogin.innerHTML = '<span>Verifying...</span>';
      loginError.style.display = 'none';

      // Check if API_URL is still placeholder
      if (!API_URL || API_URL === 'PASTE_APPS_SCRIPT_EXEC_URL_HERE') {
        btnLogin.disabled = false;
        btnLogin.innerHTML = originalText;
        loginError.textContent = 'Please configure API_URL in script.js and admin.js with your Google Apps Script URL.';
        loginError.style.display = 'block';
        return;
      }

      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            action: 'adminList',
            password: enteredPassword
          })
        });

        const data = await res.json();

        if (data && data.ok) {
          setSavedPassword(enteredPassword);
          allBookings = Array.isArray(data.bookings) ? data.bookings : [];
          showDashboardScreen();
          renderDashboard();
          showToast('Welcome back, Clinic Coordinator!', 'success');
        } else {
          // If 'Unauthorized' or bad password
          const msg = (data && (data.error === 'Unauthorized' || data.code === 'UNAUTHORIZED'))
            ? 'Incorrect password'
            : ((data && data.error) || 'Incorrect password');
          loginError.textContent = msg;
          loginError.style.display = 'block';
          passwordInput.value = '';
          passwordInput.focus();
        }
      } catch (err) {
        console.error('Login network error:', err);
        loginError.textContent = "Couldn't reach the server. Please check your connection and try again.";
        loginError.style.display = 'block';
      } finally {
        btnLogin.disabled = false;
        btnLogin.innerHTML = originalText;
      }
    });
  }

  // Logout handler
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      clearSavedPassword();
      allBookings = [];
      showLoginScreen();
      showToast('You have been logged out.', 'info');
    });
  }

  /* ==========================================================================
     3. Fetch Bookings from Google Apps Script
     ========================================================================== */
  async function fetchBookings(isSilent = false) {
    const password = getSavedPassword();
    if (!password) {
      showLoginScreen();
      return;
    }

    if (isFetching) return;
    isFetching = true;

    if (!isSilent) {
      renderSkeletons();
      if (btnRefresh) btnRefresh.classList.add('is-refreshing');
    }

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'adminList',
          password: password
        })
      });

      const data = await res.json();

      if (data && data.ok) {
        allBookings = Array.isArray(data.bookings) ? data.bookings : [];
        renderDashboard();
        if (!isSilent) {
          showToast('Bookings updated', 'success');
        }
      } else if (data && (data.error === 'Unauthorized' || data.code === 'UNAUTHORIZED')) {
        clearSavedPassword();
        showLoginScreen('Session expired. Please enter password again.');
      } else {
        renderErrorState((data && data.error) || 'Failed to fetch appointments.');
      }
    } catch (err) {
      console.error('Fetch bookings error:', err);
      if (!isSilent) {
        renderErrorState("Couldn't reach the server. Please check your network connection.");
      }
    } finally {
      isFetching = false;
      if (btnRefresh) btnRefresh.classList.remove('is-refreshing');
    }
  }

  function startAutoRefresh() {
    if (autoRefreshInterval) clearInterval(autoRefreshInterval);
    autoRefreshInterval = setInterval(() => {
      fetchBookings(true);
    }, 30000); // 30 seconds
  }

  if (btnRefresh) {
    btnRefresh.addEventListener('click', () => {
      fetchBookings(false);
    });
  }

  /* ==========================================================================
     4. Date & Time Parsing / Sorting
     ========================================================================== */
  function parseTimeSlotToMinutes(slotStr) {
    if (!slotStr) return 0;
    const match = slotStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return 0;
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const period = match[3].toUpperCase();

    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  }

  function sortBookings(list) {
    return list.slice().sort((a, b) => {
      const dateA = a.date || '';
      const dateB = b.date || '';
      // Primary sort: Date descending (newest dates first)
      if (dateA !== dateB) {
        return dateB.localeCompare(dateA);
      }
      // Secondary sort: Slot time ascending
      return parseTimeSlotToMinutes(a.slot) - parseTimeSlotToMinutes(b.slot);
    });
  }

  /* ==========================================================================
     5. Summary KPI Cards
     ========================================================================== */
  function updateKpis() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;

    const total = allBookings.length;
    const todayCount = allBookings.filter(b => b.date === todayStr).length;
    const pendingCount = allBookings.filter(b => (b.status || 'Pending').toLowerCase() === 'pending').length;

    if (statTotal) statTotal.textContent = total;
    if (statToday) statToday.textContent = todayCount;
    if (statPending) statPending.textContent = pendingCount;
  }

  /* ==========================================================================
     6. Filtering & Search
     ========================================================================== */
  function getFilteredBookings() {
    const q = (filterSearch ? filterSearch.value.trim().toLowerCase() : '');
    const selectedBranch = filterBranch ? filterBranch.value : '';
    const selectedStatus = filterStatus ? filterStatus.value.toLowerCase() : '';
    const selectedDate = filterDate ? filterDate.value : '';

    return allBookings.filter(b => {
      // Search match (Patient Name or Phone)
      if (q) {
        const nameMatch = (b.name || '').toLowerCase().includes(q);
        const phoneMatch = (b.phone || '').replace(/\D/g, '').includes(q.replace(/\D/g, ''));
        const idMatch = (b.bookingId || b.id || '').toLowerCase().includes(q);
        if (!nameMatch && !phoneMatch && !idMatch) return false;
      }

      // Branch match
      if (selectedBranch && (b.branch || '') !== selectedBranch) {
        return false;
      }

      // Status match
      if (selectedStatus && (b.status || 'Pending').toLowerCase() !== selectedStatus) {
        return false;
      }

      // Date match
      if (selectedDate && (b.date || '') !== selectedDate) {
        return false;
      }

      return true;
    });
  }

  // Attach Filter Listeners
  if (filterSearch) filterSearch.addEventListener('input', () => renderDashboard(false));
  if (filterBranch) filterBranch.addEventListener('change', () => renderDashboard(false));
  if (filterStatus) filterStatus.addEventListener('change', () => renderDashboard(false));

  if (filterDate) {
    filterDate.addEventListener('change', () => {
      if (btnClearDate) {
        btnClearDate.style.display = filterDate.value ? 'flex' : 'none';
      }
      renderDashboard(false);
    });
  }

  if (btnClearDate) {
    btnClearDate.addEventListener('click', () => {
      filterDate.value = '';
      btnClearDate.style.display = 'none';
      renderDashboard(false);
    });
  }

  if (btnResetFilters) {
    btnResetFilters.addEventListener('click', () => {
      if (filterSearch) filterSearch.value = '';
      if (filterBranch) filterBranch.value = '';
      if (filterStatus) filterStatus.value = '';
      if (filterDate) filterDate.value = '';
      if (btnClearDate) btnClearDate.style.display = 'none';
      renderDashboard(false);
    });
  }

  /* ==========================================================================
     7. Table Rendering (Strict textContent to prevent XSS)
     ========================================================================== */
  function renderSkeletons() {
    if (!tableBody) return;
    tableBody.innerHTML = '';
    for (let i = 0; i < 5; i++) {
      const tr = document.createElement('tr');
      tr.className = 'skeleton-row';
      for (let j = 0; j < 8; j++) {
        const td = document.createElement('td');
        const box = document.createElement('div');
        box.className = 'skeleton-box';
        box.style.width = j === 0 ? '70px' : j === 1 ? '120px' : '90px';
        td.appendChild(box);
        tr.appendChild(td);
      }
      tableBody.appendChild(tr);
    }
  }

  function renderEmptyState() {
    if (!tableBody) return;
    tableBody.innerHTML = '';
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 8;
    td.className = 'table-empty-cell';

    const wrap = document.createElement('div');
    wrap.className = 'empty-state-wrap';

    const title = document.createElement('div');
    title.className = 'empty-state-title';
    title.textContent = 'No appointments found';

    const sub = document.createElement('div');
    sub.className = 'empty-state-sub';
    sub.textContent = 'Try adjusting your search query, branch or date filters.';

    wrap.appendChild(title);
    wrap.appendChild(sub);
    td.appendChild(wrap);
    tr.appendChild(td);
    tableBody.appendChild(tr);
  }

  function renderErrorState(message) {
    if (!tableBody) return;
    tableBody.innerHTML = '';
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 8;
    td.className = 'table-error-cell';

    const wrap = document.createElement('div');
    wrap.className = 'error-state-wrap';

    const title = document.createElement('div');
    title.className = 'error-state-title';
    title.textContent = 'Failed to load bookings';

    const sub = document.createElement('div');
    sub.textContent = message || 'An error occurred while connecting to Google Sheets database.';

    const retryBtn = document.createElement('button');
    retryBtn.type = 'button';
    retryBtn.className = 'btn btn-outline btn-sm';
    retryBtn.style.marginTop = '10px';
    retryBtn.textContent = 'Retry Connection';
    retryBtn.addEventListener('click', () => fetchBookings(false));

    wrap.appendChild(title);
    wrap.appendChild(sub);
    wrap.appendChild(retryBtn);
    td.appendChild(wrap);
    tr.appendChild(td);
    tableBody.appendChild(tr);
  }

  function renderDashboard(updateStatsOnly = false) {
    updateKpis();

    const filtered = getFilteredBookings();
    const sorted = sortBookings(filtered);

    if (resultsCount) {
      resultsCount.textContent = sorted.length;
    }

    if (!tableBody) return;

    if (sorted.length === 0) {
      renderEmptyState();
      return;
    }

    tableBody.innerHTML = '';

    sorted.forEach(booking => {
      const tr = document.createElement('tr');

      // 1. Booking ID
      const tdId = document.createElement('td');
      const idTag = document.createElement('span');
      idTag.className = 'booking-id-tag';
      idTag.textContent = booking.bookingId || booking.id || 'GD-PENDING';
      tdId.appendChild(idTag);
      tr.appendChild(tdId);

      // 2. Patient
      const tdName = document.createElement('td');
      tdName.className = 'patient-name-cell';
      tdName.textContent = booking.name || '-';
      tr.appendChild(tdName);

      // 3. Phone (Click to Call Link)
      const tdPhone = document.createElement('td');
      if (booking.phone) {
        const phoneLink = document.createElement('a');
        phoneLink.className = 'phone-link';
        phoneLink.href = 'tel:' + String(booking.phone).replace(/\D/g, '');
        phoneLink.textContent = '+91 ' + String(booking.phone).replace(/^(\+91|91)/, '').trim();
        tdPhone.appendChild(phoneLink);
      } else {
        tdPhone.textContent = '-';
      }
      tr.appendChild(tdPhone);

      // 4. Treatment
      const tdTreatment = document.createElement('td');
      tdTreatment.textContent = booking.treatment || '-';
      tr.appendChild(tdTreatment);

      // 5. Branch
      const tdBranch = document.createElement('td');
      tdBranch.textContent = booking.branch || '-';
      tr.appendChild(tdBranch);

      // 6. Date
      const tdDate = document.createElement('td');
      tdDate.textContent = booking.date || '-';
      tr.appendChild(tdDate);

      // 7. Slot
      const tdSlot = document.createElement('td');
      tdSlot.textContent = booking.slot || '-';
      tr.appendChild(tdSlot);

      // 8. Status Dropdown (Optimistic update)
      const tdStatus = document.createElement('td');
      const statusSelect = document.createElement('select');
      const currentStatus = booking.status || 'Pending';
      statusSelect.className = `status-select status-${currentStatus.toLowerCase()}`;

      ['Pending', 'Confirmed', 'Completed', 'Cancelled'].forEach(statusOption => {
        const opt = document.createElement('option');
        opt.value = statusOption;
        opt.textContent = statusOption;
        if (currentStatus.toLowerCase() === statusOption.toLowerCase()) {
          opt.selected = true;
        }
        statusSelect.appendChild(opt);
      });

      // Handle status change
      statusSelect.addEventListener('change', async () => {
        const previousStatus = booking.status || 'Pending';
        const newStatus = statusSelect.value;
        const bookingId = booking.bookingId || booking.id;

        // Optimistic UI update
        booking.status = newStatus;
        statusSelect.className = `status-select status-${newStatus.toLowerCase()}`;
        updateKpis();

        try {
          const password = getSavedPassword();
          const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({
              action: 'adminUpdate',
              password: password,
              id: bookingId,
              status: newStatus
            })
          });

          const result = await res.json();

          if (result && result.ok) {
            showToast(`${bookingId} marked as ${newStatus}`, 'success');
          } else {
            throw new Error((result && result.error) || 'Server rejected status update');
          }
        } catch (err) {
          console.error('Failed to update status:', err);
          // Revert optimistic update
          booking.status = previousStatus;
          statusSelect.value = previousStatus;
          statusSelect.className = `status-select status-${previousStatus.toLowerCase()}`;
          updateKpis();
          showToast(`Failed to update status: ${err.message}`, 'error');
        }
      });

      tdStatus.appendChild(statusSelect);
      tr.appendChild(tdStatus);

      tableBody.appendChild(tr);
    });
  }

  /* ==========================================================================
     8. Export to CSV
     ========================================================================== */
  function exportBookingsToCsv() {
    const filtered = getFilteredBookings();
    if (!filtered.length) {
      showToast('No bookings to export.', 'info');
      return;
    }

    const headers = ['Booking ID', 'Patient Name', 'Phone', 'Treatment', 'Branch', 'Date', 'Slot', 'Status', 'Message'];
    const rows = filtered.map(b => [
      b.bookingId || b.id || '',
      b.name || '',
      b.phone || '',
      b.treatment || '',
      b.branch || '',
      b.date || '',
      b.slot || '',
      b.status || 'Pending',
      (b.message || '').replace(/[\r\n]+/g, ' ')
    ]);

    const csvLines = [];
    csvLines.push(headers.map(h => `"${h.replace(/"/g, '""')}"`).join(','));
    rows.forEach(row => {
      csvLines.push(row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','));
    });

    const csvContent = csvLines.join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const today = new Date().toISOString().slice(0, 10);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gupta-dental-bookings-${today}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`Exported ${filtered.length} bookings to CSV`, 'success');
  }

  if (btnExportCsv) {
    btnExportCsv.addEventListener('click', exportBookingsToCsv);
  }

  /* ==========================================================================
     9. Initialization & Auto-Login Check
     ========================================================================== */
  function init() {
    const savedPassword = getSavedPassword();
    if (savedPassword) {
      showDashboardScreen();
      fetchBookings(false);
    } else {
      showLoginScreen();
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
