const loginView = document.querySelector("#adminLogin");
const dashboardView = document.querySelector("#adminDashboard");
const loginForm = document.querySelector("#loginForm");
const loginError = document.querySelector("#loginError");
const logoutButton = document.querySelector("#logoutAdmin");
const reservationForm = document.querySelector("#reservationForm");
const resetFormButton = document.querySelector("#resetForm");
const closeEditorButton = document.querySelector("#closeEditor");
const newReservationButton = document.querySelector("#newReservation");
const refreshButton = document.querySelector("#refreshAdmin");
const formTitle = document.querySelector("#formTitle");
const reservationEditor = document.querySelector("#reservationEditor");
const reservationTable = document.querySelector("#reservationTable");
const searchInput = document.querySelector("#reservationSearch");
const statusFilter = document.querySelector("#statusFilter");
const sourceFilter = document.querySelector("#sourceFilter");
const exportButton = document.querySelector("#exportCsv");
const importButton = document.querySelector("#importMessage");
const messageImport = document.querySelector("#messageImport");
const calendarGrid = document.querySelector("#calendarGrid");
const calendarTitle = document.querySelector("#calendarTitle");
const prevMonthButton = document.querySelector("#prevMonth");
const nextMonthButton = document.querySelector("#nextMonth");
const backendStatus = document.querySelector("#backendStatus");
const adminViewTitle = document.querySelector("#adminViewTitle");
const viewButtons = document.querySelectorAll("[data-admin-view]");
const views = document.querySelectorAll(".admin-view");

const stats = {
  total: document.querySelector("#statTotal"),
  confirmed: document.querySelector("#statConfirmed"),
  pending: document.querySelector("#statPending"),
  upcoming: document.querySelector("#statUpcoming"),
};

const roomInventory = [
  { name: "Habitacion individual", capacity: 1, count: 4 },
  { name: "Habitacion doble", capacity: 2, count: 12 },
  { name: "Suite familiar", capacity: 5, count: 4 },
  { name: "Familia / grupo", capacity: 8, count: 3 },
];

let reservations = [];
let calendarDate = new Date();

async function api(path, options = {}) {
  const response = await fetch(path, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Error del servidor");
  return data;
}

function showDashboard() {
  loginView.hidden = true;
  dashboardView.hidden = false;
}

function showLogin() {
  loginView.hidden = false;
  dashboardView.hidden = true;
}

function setBackendStatus(message, type = "info") {
  if (!backendStatus) return;
  backendStatus.textContent = message;
  backendStatus.dataset.type = type;
  backendStatus.hidden = !message;
}

function setView(name) {
  viewButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.adminView === name));
  views.forEach((view) => {
    const isActive = view.id === `view-${name}`;
    view.classList.toggle("is-active", isActive);
    if (isActive) adminViewTitle.textContent = view.dataset.viewTitle || "Panel";
  });
}

function formatDate(dateString) {
  if (!dateString) return "-";
  return new Intl.DateTimeFormat("es", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${dateString}T00:00:00`));
}

function nightsBetween(checkin, checkout) {
  const start = new Date(`${checkin}T00:00:00`);
  const end = new Date(`${checkout}T00:00:00`);
  return Math.max(0, Math.round((end - start) / 86400000));
}

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

function toClientReservation(row) {
  return {
    id: row.id,
    guestName: row.guest_name,
    guestPhone: row.guest_phone || "",
    guestEmail: row.guest_email || "",
    checkin: row.checkin,
    checkout: row.checkout,
    guests: row.guests,
    roomType: row.room_type,
    source: row.source,
    status: row.status,
    notes: row.notes || "",
    termsAccepted: row.terms_accepted,
  };
}

function getFormData() {
  const data = new FormData(reservationForm);
  return {
    guestName: data.get("guestName").trim(),
    guestPhone: data.get("guestPhone").trim(),
    guestEmail: data.get("guestEmail").trim(),
    checkin: data.get("checkin"),
    checkout: data.get("checkout"),
    guests: data.get("guests"),
    roomType: data.get("roomType"),
    source: data.get("source"),
    status: data.get("status"),
    notes: data.get("notes").trim(),
    termsAccepted: true,
  };
}

function openEditor(mode = "new") {
  reservationEditor.classList.add("is-open");
  if (mode === "new") resetReservationForm();
}

function closeEditor() {
  reservationEditor.classList.remove("is-open");
}

function resetReservationForm() {
  reservationForm.reset();
  document.querySelector("#reservationId").value = "";
  document.querySelector("#adminGuests").value = "2";
  document.querySelector("#adminStatus").value = "Pendiente";
  document.querySelector("#adminSource").value = "Manual";
  formTitle.textContent = "Nueva reserva";
}

async function loadReservations() {
  setBackendStatus("Cargando reservas...");
  const data = await api("/api/reservations");
  reservations = data.reservations.map(toClientReservation);
  setBackendStatus("");
  render();
}

function currentReservations() {
  const today = todayString();
  return reservations.filter((item) => item.status !== "Cancelada" && item.checkin <= today && item.checkout > today);
}

function upcomingReservations(days = 14) {
  const today = todayString();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + days);
  const max = maxDate.toISOString().slice(0, 10);
  return reservations
    .filter((item) => item.status !== "Cancelada" && item.checkin >= today && item.checkin <= max)
    .sort((a, b) => a.checkin.localeCompare(b.checkin));
}

function renderStats() {
  stats.total.textContent = reservations.length;
  stats.confirmed.textContent = reservations.filter((item) => item.status === "Confirmada").length;
  stats.pending.textContent = reservations.filter((item) => item.status === "Pendiente").length;
  stats.upcoming.textContent = upcomingReservations(30).length;
}

function miniReservation(item) {
  return `
    <article class="mini-row">
      <div>
        <strong>${escapeHtml(item.guestName)}</strong>
        <span>${formatDate(item.checkin)} - ${formatDate(item.checkout)} · ${escapeHtml(item.guests)} pax</span>
      </div>
      <button type="button" data-action="edit" data-id="${item.id}">Abrir</button>
    </article>
  `;
}

function renderDashboard() {
  const today = todayString();
  const arrivals = reservations.filter((item) => item.checkin === today && item.status !== "Cancelada");
  const departures = reservations.filter((item) => item.checkout === today && item.status !== "Cancelada");
  const pending = reservations.filter((item) => item.status === "Pendiente").slice(0, 6);

  document.querySelector("#arrivalList").innerHTML = arrivals.length ? arrivals.map(miniReservation).join("") : empty("Sin llegadas hoy.");
  document.querySelector("#departureList").innerHTML = departures.length ? departures.map(miniReservation).join("") : empty("Sin salidas hoy.");
  document.querySelector("#pendingList").innerHTML = pending.length ? pending.map(miniReservation).join("") : empty("No hay reservas pendientes.");
  renderRoomBoard();
}

function renderRoomBoard() {
  const active = currentReservations();
  document.querySelector("#roomBoard").innerHTML = roomInventory.map((room) => {
    const occupied = active.filter((item) => item.roomType === room.name).length;
    const available = Math.max(0, room.count - occupied);
    const percent = room.count ? Math.round((occupied / room.count) * 100) : 0;
    return `
      <article class="room-board-card">
        <div>
          <strong>${room.name}</strong>
          <span>${room.count} unidades · hasta ${room.capacity} pax</span>
        </div>
        <div class="occupancy-bar"><span style="width:${percent}%"></span></div>
        <p>${available} disponibles ahora</p>
      </article>
    `;
  }).join("");
}

function filteredReservations() {
  const query = (searchInput.value || "").toLowerCase();
  const status = statusFilter.value;
  const source = sourceFilter.value;
  return reservations
    .filter((item) => !status || item.status === status)
    .filter((item) => !source || item.source === source)
    .filter((item) => JSON.stringify(item).toLowerCase().includes(query))
    .sort((a, b) => a.checkin.localeCompare(b.checkin));
}

function renderReservationTable() {
  const items = filteredReservations();
  if (!items.length) {
    reservationTable.innerHTML = `<tr><td colspan="6">${empty("No hay reservas con esos filtros.")}</td></tr>`;
    return;
  }

  reservationTable.innerHTML = items.map((item) => `
    <tr>
      <td>
        <strong>${escapeHtml(item.guestName)}</strong>
        <span>${escapeHtml(item.guestPhone || item.guestEmail || "Sin contacto")}</span>
      </td>
      <td>
        <strong>${formatDate(item.checkin)} - ${formatDate(item.checkout)}</strong>
        <span>${nightsBetween(item.checkin, item.checkout)} noches · ${escapeHtml(item.guests)} pax</span>
      </td>
      <td>${escapeHtml(item.roomType)}</td>
      <td>${escapeHtml(item.source)}</td>
      <td><span class="status-pill status-${item.status.toLowerCase()}">${escapeHtml(item.status)}</span></td>
      <td>
        <div class="row-actions">
          <button type="button" data-action="edit" data-id="${item.id}">Editar</button>
          <button type="button" data-action="delete" data-id="${item.id}">Eliminar</button>
        </div>
      </td>
    </tr>
  `).join("");
}

function renderCalendar() {
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = (firstDay.getDay() + 6) % 7;
  const monthName = new Intl.DateTimeFormat("es", { month: "long", year: "numeric" }).format(calendarDate);

  calendarTitle.textContent = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  const weekDays = ["L", "M", "M", "J", "V", "S", "D"];
  const cells = weekDays.map((day) => `<div class="calendar-weekday">${day}</div>`);

  for (let i = 0; i < offset; i += 1) cells.push(`<div class="calendar-day is-muted"></div>`);

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayReservations = reservations.filter((item) => item.status !== "Cancelada" && item.checkin <= date && item.checkout > date);
    cells.push(`
      <div class="calendar-day${dayReservations.length ? " has-booking" : ""}">
        <strong>${day}</strong>
        ${dayReservations.slice(0, 3).map((item) => `<button type="button" data-action="edit" data-id="${item.id}">${escapeHtml(item.guestName)}</button>`).join("")}
        ${dayReservations.length > 3 ? `<em>+${dayReservations.length - 3}</em>` : ""}
      </div>
    `);
  }

  calendarGrid.innerHTML = cells.join("");
}

function renderRooms() {
  const active = currentReservations();
  document.querySelector("#roomsGrid").innerHTML = roomInventory.map((room) => {
    const occupied = active.filter((item) => item.roomType === room.name);
    const available = Math.max(0, room.count - occupied.length);
    return `
      <article class="room-card">
        <div class="room-card-top">
          <div>
            <p class="eyebrow">${available > 0 ? "Disponible" : "Completo"}</p>
            <h2>${room.name}</h2>
          </div>
          <strong>${available}/${room.count}</strong>
        </div>
        <p>Capacidad sugerida: hasta ${room.capacity} huespedes por unidad.</p>
        <div class="mini-list">${occupied.length ? occupied.map(miniReservation).join("") : empty("Sin ocupacion actual.")}</div>
      </article>
    `;
  }).join("");
}

function renderGuests() {
  const map = new Map();
  reservations.forEach((item) => {
    const key = `${item.guestName}|${item.guestPhone}|${item.guestEmail}`;
    const existing = map.get(key) || { ...item, stays: 0, lastStay: item.checkout };
    existing.stays += 1;
    if (item.checkout > existing.lastStay) existing.lastStay = item.checkout;
    map.set(key, existing);
  });

  const guests = [...map.values()].sort((a, b) => a.guestName.localeCompare(b.guestName));
  document.querySelector("#guestDirectory").innerHTML = guests.length ? guests.map((guest) => `
    <article class="guest-card">
      <div>
        <strong>${escapeHtml(guest.guestName)}</strong>
        <span>${escapeHtml(guest.guestPhone || "Sin telefono")}</span>
        <span>${escapeHtml(guest.guestEmail || "Sin email")}</span>
      </div>
      <div>
        <strong>${guest.stays}</strong>
        <span>reservas</span>
      </div>
      <div>
        <strong>${formatDate(guest.lastStay)}</strong>
        <span>ultima salida</span>
      </div>
    </article>
  `).join("") : empty("Todavia no hay huespedes registrados.");
}

function renderOperations() {
  const upcoming = upcomingReservations(7);
  document.querySelector("#operationArrivals").innerHTML = upcoming.length ? upcoming.map((item) => `
    <article class="task-row">
      <input type="checkbox" aria-label="Marcar tarea">
      <div>
        <strong>Preparar llegada de ${escapeHtml(item.guestName)}</strong>
        <span>${formatDate(item.checkin)} · ${escapeHtml(item.roomType)} · ${escapeHtml(item.guests)} pax</span>
      </div>
    </article>
  `).join("") : empty("No hay llegadas en los proximos 7 dias.");

  document.querySelector("#operationRooms").innerHTML = roomInventory.map((room) => `
    <article class="task-row">
      <input type="checkbox" aria-label="Marcar tarea">
      <div>
        <strong>Revisar ${room.name}</strong>
        <span>Limpieza, amenities y preparacion general</span>
      </div>
    </article>
  `).join("");
}

function render() {
  renderStats();
  renderDashboard();
  renderReservationTable();
  renderCalendar();
  renderRooms();
  renderGuests();
  renderOperations();
}

function editReservation(id) {
  const item = reservations.find((reservation) => reservation.id === id);
  if (!item) return;

  document.querySelector("#reservationId").value = item.id;
  document.querySelector("#guestName").value = item.guestName;
  document.querySelector("#guestPhone").value = item.guestPhone;
  document.querySelector("#guestEmail").value = item.guestEmail;
  document.querySelector("#adminCheckin").value = item.checkin;
  document.querySelector("#adminCheckout").value = item.checkout;
  document.querySelector("#adminGuests").value = item.guests;
  document.querySelector("#adminRoomType").value = item.roomType;
  document.querySelector("#adminSource").value = item.source;
  document.querySelector("#adminStatus").value = item.status;
  document.querySelector("#adminNotes").value = item.notes;
  formTitle.textContent = "Editar reserva";
  openEditor("edit");
}

async function deleteReservation(id) {
  if (!confirm("Eliminar esta reserva?")) return;
  await api(`/api/reservations/${encodeURIComponent(id)}`, { method: "DELETE" });
  await loadReservations();
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function empty(message) {
  return `<p class="empty-state">${message}</p>`;
}

function parseMessage(text) {
  const findValue = (labels) => {
    for (const label of labels) {
      const match = text.match(new RegExp(`${label}\\s*:?\\s*([^\\n,]+)`, "i"));
      if (match) return match[1].trim();
    }
    return "";
  };

  return {
    guestName: findValue(["Nombre", "Name", "Huesped", "Huésped"]),
    guestPhone: findValue(["WhatsApp", "Telefono", "Teléfono", "Phone"]),
    guestEmail: findValue(["Email", "Correo"]),
    checkin: findValue(["Entrada", "Check-in", "Checkin"]),
    checkout: findValue(["Salida", "Check-out", "Checkout"]),
    guests: findValue(["Huespedes", "Huéspedes", "Guests"]),
    roomType: findValue(["Tipo", "Habitacion", "Habitación", "Room"]),
    notes: text.trim(),
  };
}

function exportCsv() {
  const headers = ["Nombre", "Telefono", "Email", "Entrada", "Salida", "Huespedes", "Habitacion", "Origen", "Estado", "Notas"];
  const rows = reservations.map((item) => [
    item.guestName,
    item.guestPhone,
    item.guestEmail,
    item.checkin,
    item.checkout,
    item.guests,
    item.roomType,
    item.source,
    item.status,
    item.notes,
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell || "").replaceAll('"', '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `reservas-or-haganuz-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginError.hidden = true;

  try {
    await api("/api/login", {
      method: "POST",
      body: JSON.stringify({
        username: document.querySelector("#adminUser").value,
        password: document.querySelector("#adminPassword").value,
      }),
    });
    showDashboard();
    await loadReservations();
  } catch (error) {
    loginError.textContent = error.message;
    loginError.hidden = false;
  }
});

logoutButton.addEventListener("click", async () => {
  await api("/api/logout", { method: "POST" }).catch(() => {});
  showLogin();
});

reservationForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!reservationForm.reportValidity()) return;

  const id = document.querySelector("#reservationId").value;
  const payload = getFormData();
  const method = id ? "PATCH" : "POST";
  const path = id ? `/api/reservations/${encodeURIComponent(id)}` : "/api/reservations";

  try {
    await api(path, {
      method,
      headers: { "X-Admin-Write": "true" },
      body: JSON.stringify(payload),
    });
    resetReservationForm();
    closeEditor();
    await loadReservations();
  } catch (error) {
    setBackendStatus(error.message, "error");
  }
});

resetFormButton.addEventListener("click", resetReservationForm);
closeEditorButton.addEventListener("click", closeEditor);
newReservationButton.addEventListener("click", () => openEditor("new"));
refreshButton.addEventListener("click", loadReservations);
searchInput.addEventListener("input", renderReservationTable);
statusFilter.addEventListener("change", renderReservationTable);
sourceFilter.addEventListener("change", renderReservationTable);
exportButton.addEventListener("click", exportCsv);

document.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  if (button.dataset.action === "edit") editReservation(button.dataset.id);
  if (button.dataset.action === "delete") {
    try {
      await deleteReservation(button.dataset.id);
    } catch (error) {
      setBackendStatus(error.message, "error");
    }
  }
});

viewButtons.forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.adminView));
});

importButton.addEventListener("click", () => {
  const parsed = parseMessage(messageImport.value);
  openEditor("new");
  if (parsed.guestName) document.querySelector("#guestName").value = parsed.guestName;
  if (parsed.guestPhone) document.querySelector("#guestPhone").value = parsed.guestPhone;
  if (parsed.guestEmail) document.querySelector("#guestEmail").value = parsed.guestEmail;
  if (parsed.checkin) document.querySelector("#adminCheckin").value = parsed.checkin;
  if (parsed.checkout) document.querySelector("#adminCheckout").value = parsed.checkout;
  if (parsed.guests) document.querySelector("#adminGuests").value = parsed.guests.replace(/\D/g, "") || "2";
  if (parsed.roomType) document.querySelector("#adminRoomType").value = parsed.roomType;
  document.querySelector("#adminSource").value = messageImport.value.toLowerCase().includes("email") ? "Email" : "WhatsApp";
  document.querySelector("#adminNotes").value = parsed.notes;
});

prevMonthButton.addEventListener("click", () => {
  calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1);
  renderCalendar();
});

nextMonthButton.addEventListener("click", () => {
  calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1);
  renderCalendar();
});

api("/api/session")
  .then(async () => {
    showDashboard();
    await loadReservations();
  })
  .catch(() => showLogin());
