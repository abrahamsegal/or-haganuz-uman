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
const calendarEyebrow = document.querySelector("#calendarEyebrow");
const calendarSubtitle = document.querySelector("#calendarSubtitle");
const prevMonthButton = document.querySelector("#prevMonth");
const nextMonthButton = document.querySelector("#nextMonth");
const todayMonthButton = document.querySelector("#todayMonth");
const adminLanguageButtons = document.querySelectorAll("[data-calendar-lang]");
const calendarPanel = document.querySelector(".calendar-panel");
const calendarAgenda = document.querySelector("#calendarAgenda");
const calendarAgendaEyebrow = document.querySelector("#calendarAgendaEyebrow");
const calendarAgendaTitle = document.querySelector("#calendarAgendaTitle");
const calendarLegend = document.querySelector("#calendarLegend");
const calendarSummary = {
  arrivals: document.querySelector("#calendarSummaryArrivals"),
  departures: document.querySelector("#calendarSummaryDepartures"),
  occupancy: document.querySelector("#calendarSummaryOccupancy"),
  revenue: document.querySelector("#calendarSummaryRevenue"),
  arrivalsLabel: document.querySelector("#calendarSummaryArrivalsLabel"),
  departuresLabel: document.querySelector("#calendarSummaryDeparturesLabel"),
  occupancyLabel: document.querySelector("#calendarSummaryOccupancyLabel"),
  revenueLabel: document.querySelector("#calendarSummaryRevenueLabel"),
};
const backendStatus = document.querySelector("#backendStatus");
const adminViewTitle = document.querySelector("#adminViewTitle");
const adminCurrentUser = document.querySelector("#adminCurrentUser");
const viewButtons = document.querySelectorAll("[data-admin-view]");
const views = document.querySelectorAll(".admin-view");
const ownerOnlyNodes = document.querySelectorAll("[data-owner-only]");
const usersTable = document.querySelector("#usersTable");
const userForm = document.querySelector("#userForm");
const resetUserFormButton = document.querySelector("#resetUserForm");
const roomTypeSelect = document.querySelector("#adminRoomType");
const catalogForm = document.querySelector("#catalogForm");
const resetCatalogButton = document.querySelector("#resetCatalog");
const roomsCatalog = document.querySelector("#roomsCatalog");
const mealsCatalog = document.querySelector("#mealsCatalog");
const servicesCatalog = document.querySelector("#servicesCatalog");
const adminDatePicker = document.querySelector("#adminDatePicker");
const adminCheckinInput = document.querySelector("#adminCheckin");
const adminCheckoutInput = document.querySelector("#adminCheckout");
const calendarViewButtons = document.querySelectorAll("[data-calendar-view]");

const stats = {
  total: document.querySelector("#statTotal"),
  confirmed: document.querySelector("#statConfirmed"),
  pending: document.querySelector("#statPending"),
  upcoming: document.querySelector("#statUpcoming"),
};

const calendarTexts = {
  es: {
    locale: "es",
    dir: "ltr",
    firstDay: 1,
    weekdays: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
    eyebrow: "Calendario",
    subtitle: "Reservas, ocupacion y llegadas del mes.",
    today: "Hoy",
    prev: "Mes anterior",
    next: "Mes siguiente",
    arrivals: "Llegadas",
    departures: "Salidas",
    occupancy: "Ocupacion estimada",
    revenue: "Ingresos del mes",
    agenda: "Agenda",
    agendaTitle: "Movimientos del mes",
    confirmed: "Confirmada",
    pending: "Pendiente",
    completed: "Completada",
    cancelled: "Cancelada",
    empty: "Sin reservas",
    available: "disp.",
    nights: "noches",
    guests: "pax",
    more: "mas",
    newReservation: "Nueva",
    open: "Abrir",
    noAgenda: "No hay movimientos registrados este mes.",
  },
  he: {
    locale: "he-IL",
    dir: "rtl",
    firstDay: 0,
    weekdays: ["א", "ב", "ג", "ד", "ה", "ו", "ש"],
    eyebrow: "לוח שנה",
    subtitle: "הזמנות, תפוסה וכניסות לחודש.",
    today: "היום",
    prev: "חודש קודם",
    next: "חודש הבא",
    arrivals: "כניסות",
    departures: "יציאות",
    occupancy: "תפוסה משוערת",
    revenue: "הכנסות החודש",
    agenda: "יומן",
    agendaTitle: "תנועות החודש",
    confirmed: "מאושרת",
    pending: "ממתינה",
    completed: "הושלמה",
    cancelled: "מבוטלת",
    empty: "אין הזמנות",
    available: "פנוי",
    nights: "לילות",
    guests: "אורחים",
    more: "נוספות",
    newReservation: "חדש",
    open: "פתיחה",
    noAgenda: "אין תנועות רשומות החודש.",
  },
  uk: {
    locale: "uk-UA",
    dir: "ltr",
    firstDay: 1,
    weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
    eyebrow: "Календар",
    subtitle: "Бронювання, завантаження та заїзди за місяць.",
    today: "Сьогодні",
    prev: "Попередній місяць",
    next: "Наступний місяць",
    arrivals: "Заїзди",
    departures: "Виїзди",
    occupancy: "Орієнтовна зайнятість",
    revenue: "Дохід за місяць",
    agenda: "План",
    agendaTitle: "Події місяця",
    confirmed: "Підтверджено",
    pending: "Очікує",
    completed: "Завершено",
    cancelled: "Скасовано",
    empty: "Немає бронювань",
    available: "вільно",
    nights: "ночей",
    guests: "гостей",
    more: "ще",
    newReservation: "Нове",
    open: "Відкрити",
    noAgenda: "Немає подій цього місяця.",
  },
};

const adminTexts = {
  es: {
    loginTitle: "Panel privado",
    loginSubtitle: "Gestion de reservas, huespedes, habitaciones y operacion diaria.",
    user: "Usuario",
    password: "Clave",
    enterPanel: "Entrar al panel",
    badLogin: "Usuario o clave incorrectos.",
    navDashboard: "Resumen",
    navReservations: "Reservas",
    navCalendar: "Calendario",
    navCatalog: "Catalogo",
    navGuests: "Huespedes",
    navOperations: "Operacion",
    navUsers: "Usuarios",
    bookingPage: "Pagina de reservas",
    publicSite: "Ver sitio publico",
    logout: "Cerrar sesion",
    backoffice: "Backoffice",
    refresh: "Actualizar",
    exportCsv: "Exportar CSV",
    newReservationFull: "Nueva reserva",
    titleDashboard: "Resumen operativo",
    titleReservations: "Reservas",
    titleCalendar: "Calendario",
    titleCatalog: "Catalogo del hotel",
    titleGuests: "Huespedes",
    titleOperations: "Operacion",
    titleUsers: "Usuarios y accesos",
    kpiTotal: "Reservas totales",
    kpiConfirmed: "Confirmadas",
    kpiPending: "Pendientes",
    kpiUpcoming: "Proximas llegadas",
    today: "Hoy",
    todayMovement: "Movimiento del dia",
    arrivals: "Llegadas",
    departures: "Salidas",
    priority: "Prioridad",
    pendingReservations: "Reservas pendientes",
    availability: "Disponibilidad",
    roomsOccupancy: "Habitaciones y ocupacion",
    searchReservations: "Buscar por nombre, telefono, email, estado o origen",
    allStatuses: "Todos los estados",
    allSources: "Todos los origenes",
    guest: "Huesped",
    dates: "Fechas",
    room: "Habitacion",
    source: "Origen",
    cost: "Costo",
    status: "Estado",
    actions: "Acciones",
    editable: "Editable",
    catalogMainTitle: "Habitaciones, comidas y servicios",
    savedBackend: "Se guarda en backend",
    rooms: "Habitaciones",
    roomTypes: "Tipos, capacidad y unidades",
    addRoom: "Agregar habitacion",
    meals: "Comidas",
    mealsTitle: "Desayunos, Shabat y grupos",
    addMeal: "Agregar comida",
    services: "Servicios",
    servicesTitle: "Servicios visibles del hotel",
    addService: "Agregar servicio",
    undoChanges: "Deshacer cambios",
    saveCatalog: "Guardar catalogo",
    occupancy: "Ocupacion",
    activeRooms: "Habitaciones activas",
    prepareArrivals: "Preparar llegadas",
    roomsToReview: "Habitaciones por revisar",
    import: "Importar",
    loadFromMessage: "Cargar reserva desde WhatsApp o email",
    messagePlaceholder: "Pega aqui el mensaje recibido. Ejemplo: Nombre: David, Entrada: 2026-07-10, Salida: 2026-07-14, Huespedes: 4...",
    loadForm: "Cargar al formulario",
    singleOwner: "Dueno unico",
    mainAdmin: "Administrador principal",
    ownerNote: "Este usuario principal vive en variables privadas del servidor. No se puede borrar ni modificar desde la pagina.",
    newAccess: "Nuevo acceso",
    createUser: "Crear usuario",
    name: "Nombre",
    accessType: "Tipo de acceso",
    fullAccess: "Completo",
    limitedAccess: "Limitado",
    activeUser: "Usuario activo",
    clear: "Limpiar",
    saveUser: "Guardar usuario",
    team: "Equipo",
    secondaryUsers: "Usuarios secundarios",
    access: "Acceso",
    reservation: "Reserva",
    guestName: "Nombre del huesped",
    phoneWhatsapp: "Telefono / WhatsApp",
    checkin: "Entrada",
    checkout: "Salida",
    guestsLabel: "Huespedes",
    currency: "Moneda",
    totalCost: "Costo total",
    deposit: "Anticipo / reserva",
    paymentStatus: "Estado de pago",
    internalNotes: "Notas internas",
    notesPlaceholder: "Precio acordado, peticiones, comidas, hora de llegada, etc.",
    saveReservation: "Guardar reserva",
    editReservation: "Editar reserva",
    loadingReservations: "Cargando reservas...",
    serverError: "No se pudo cargar el panel.",
    noArrivalsToday: "Sin llegadas hoy.",
    noDeparturesToday: "Sin salidas hoy.",
    noPendingReservations: "No hay reservas pendientes.",
    noActiveRooms: "No hay habitaciones activas en el catalogo.",
    noCurrentOccupancy: "Sin ocupacion actual.",
    available: "Disponible",
    full: "Completo",
    suggestedCapacity: "Capacidad sugerida: hasta",
    guestsPerUnit: "huespedes por unidad",
    currentAvailable: "disponibles ahora",
    noReservationFilters: "No hay reservas con esos filtros.",
    noSecondaryUsers: "Todavia no hay usuarios secundarios.",
    ownerConfigured: "Dueno principal configurado por variables privadas.",
    fixed: "Fijo",
    active: "Activo",
    inactive: "Inactivo",
    edit: "Editar",
    delete: "Eliminar",
    open: "Abrir",
    reservationsWord: "reservas",
    lastCheckout: "ultima salida",
    noGuests: "Todavia no hay huespedes registrados.",
    prepareArrivalOf: "Preparar llegada de",
    review: "Revisar",
    roomPrep: "Limpieza, amenities y preparacion general",
    noNextArrivals: "No hay llegadas en los proximos 7 dias.",
    noRoomsReview: "No hay habitaciones activas para revisar.",
    deleteReservationConfirm: "Eliminar esta reserva?",
    deleteUserConfirm: "Eliminar este usuario?",
    passwordRequired: "La clave es obligatoria para usuarios nuevos.",
    userSaved: "Usuario guardado.",
    catalogReloaded: "Catalogo recargado.",
    catalogSaved: "Catalogo guardado.",
    entering: "Entrando...",
    manual: "Manual",
    noPayment: "Sin pago",
    depositPending: "Anticipo pendiente",
    depositReceived: "Anticipo recibido",
    paid: "Pagado",
    pending: "Pendiente",
    confirmed: "Confirmada",
    cancelled: "Cancelada",
    completed: "Completada",
    web: "Web",
    whatsapp: "WhatsApp",
    email: "Email",
  },
  he: {
    loginTitle: "פאנל פרטי",
    loginSubtitle: "ניהול הזמנות, אורחים, חדרים ותפעול יומי.",
    user: "משתמש",
    password: "סיסמה",
    enterPanel: "כניסה לפאנל",
    badLogin: "משתמש או סיסמה שגויים.",
    navDashboard: "סיכום",
    navReservations: "הזמנות",
    navCalendar: "לוח שנה",
    navCatalog: "קטלוג",
    navGuests: "אורחים",
    navOperations: "תפעול",
    navUsers: "משתמשים",
    bookingPage: "עמוד הזמנות",
    publicSite: "צפייה באתר",
    logout: "יציאה",
    backoffice: "ניהול מלון",
    refresh: "רענון",
    exportCsv: "ייצוא CSV",
    newReservationFull: "הזמנה חדשה",
    titleDashboard: "סיכום תפעולי",
    titleReservations: "הזמנות",
    titleCalendar: "לוח שנה",
    titleCatalog: "קטלוג המלון",
    titleGuests: "אורחים",
    titleOperations: "תפעול",
    titleUsers: "משתמשים והרשאות",
    kpiTotal: "סהכ הזמנות",
    kpiConfirmed: "מאושרות",
    kpiPending: "ממתינות",
    kpiUpcoming: "כניסות קרובות",
    today: "היום",
    todayMovement: "תנועת היום",
    arrivals: "כניסות",
    departures: "יציאות",
    priority: "עדיפות",
    pendingReservations: "הזמנות ממתינות",
    availability: "זמינות",
    roomsOccupancy: "חדרים ותפוסה",
    searchReservations: "חיפוש לפי שם, טלפון, אימייל, סטטוס או מקור",
    allStatuses: "כל הסטטוסים",
    allSources: "כל המקורות",
    guest: "אורח",
    dates: "תאריכים",
    room: "חדר",
    source: "מקור",
    cost: "עלות",
    status: "סטטוס",
    actions: "פעולות",
    editable: "ניתן לעריכה",
    catalogMainTitle: "חדרים, ארוחות ושירותים",
    savedBackend: "נשמר בשרת",
    rooms: "חדרים",
    roomTypes: "סוגים, קיבולת ויחידות",
    addRoom: "הוספת חדר",
    meals: "ארוחות",
    mealsTitle: "ארוחות בוקר, שבת וקבוצות",
    addMeal: "הוספת ארוחה",
    services: "שירותים",
    servicesTitle: "שירותים המוצגים באתר",
    addService: "הוספת שירות",
    undoChanges: "ביטול שינויים",
    saveCatalog: "שמירת קטלוג",
    occupancy: "תפוסה",
    activeRooms: "חדרים פעילים",
    prepareArrivals: "הכנת כניסות",
    roomsToReview: "חדרים לבדיקה",
    import: "ייבוא",
    loadFromMessage: "טעינת הזמנה מוואטסאפ או אימייל",
    messagePlaceholder: "הדבק כאן את ההודעה שהתקבלה. לדוגמה: שם: דוד, כניסה: 2026-07-10, יציאה: 2026-07-14, אורחים: 4...",
    loadForm: "טעינה לטופס",
    singleOwner: "בעלים יחיד",
    mainAdmin: "מנהל ראשי",
    ownerNote: "המשתמש הראשי מוגדר במשתני שרת פרטיים. אי אפשר למחוק או לשנות אותו מהעמוד.",
    newAccess: "גישה חדשה",
    createUser: "יצירת משתמש",
    name: "שם",
    accessType: "סוג גישה",
    fullAccess: "מלאה",
    limitedAccess: "מוגבלת",
    activeUser: "משתמש פעיל",
    clear: "ניקוי",
    saveUser: "שמירת משתמש",
    team: "צוות",
    secondaryUsers: "משתמשים משניים",
    access: "גישה",
    reservation: "הזמנה",
    guestName: "שם האורח",
    phoneWhatsapp: "טלפון / וואטסאפ",
    checkin: "כניסה",
    checkout: "יציאה",
    guestsLabel: "אורחים",
    currency: "מטבע",
    totalCost: "עלות כוללת",
    deposit: "מקדמה / שריון",
    paymentStatus: "סטטוס תשלום",
    internalNotes: "הערות פנימיות",
    notesPlaceholder: "מחיר שסוכם, בקשות, ארוחות, שעת הגעה וכו.",
    saveReservation: "שמירת הזמנה",
    editReservation: "עריכת הזמנה",
    loadingReservations: "טוען הזמנות...",
    serverError: "לא ניתן לטעון את הפאנל.",
    noArrivalsToday: "אין כניסות היום.",
    noDeparturesToday: "אין יציאות היום.",
    noPendingReservations: "אין הזמנות ממתינות.",
    noActiveRooms: "אין חדרים פעילים בקטלוג.",
    noCurrentOccupancy: "אין תפוסה נוכחית.",
    available: "זמין",
    full: "מלא",
    suggestedCapacity: "קיבולת מומלצת: עד",
    guestsPerUnit: "אורחים ליחידה",
    currentAvailable: "זמינים עכשיו",
    noReservationFilters: "אין הזמנות לפי הסינון הזה.",
    noSecondaryUsers: "עדיין אין משתמשים משניים.",
    ownerConfigured: "הבעלים הראשי מוגדר במשתני שרת פרטיים.",
    fixed: "קבוע",
    active: "פעיל",
    inactive: "לא פעיל",
    edit: "עריכה",
    delete: "מחיקה",
    open: "פתיחה",
    reservationsWord: "הזמנות",
    lastCheckout: "יציאה אחרונה",
    noGuests: "עדיין אין אורחים רשומים.",
    prepareArrivalOf: "הכנת הגעה של",
    review: "בדיקת",
    roomPrep: "ניקיון, ציוד והכנה כללית",
    noNextArrivals: "אין כניסות ב-7 הימים הקרובים.",
    noRoomsReview: "אין חדרים פעילים לבדיקה.",
    deleteReservationConfirm: "למחוק את ההזמנה?",
    deleteUserConfirm: "למחוק את המשתמש?",
    passwordRequired: "סיסמה חובה למשתמש חדש.",
    userSaved: "המשתמש נשמר.",
    catalogReloaded: "הקטלוג נטען מחדש.",
    catalogSaved: "הקטלוג נשמר.",
    entering: "נכנס...",
    manual: "ידני",
    noPayment: "ללא תשלום",
    depositPending: "מקדמה ממתינה",
    depositReceived: "מקדמה התקבלה",
    paid: "שולם",
    pending: "ממתינה",
    confirmed: "מאושרת",
    cancelled: "מבוטלת",
    completed: "הושלמה",
    web: "אתר",
    whatsapp: "וואטסאפ",
    email: "אימייל",
  },
  uk: {
    loginTitle: "Приватна панель",
    loginSubtitle: "Керування бронюваннями, гостями, кімнатами та щоденною роботою.",
    user: "Користувач",
    password: "Пароль",
    enterPanel: "Увійти до панелі",
    badLogin: "Невірний користувач або пароль.",
    navDashboard: "Огляд",
    navReservations: "Бронювання",
    navCalendar: "Календар",
    navCatalog: "Каталог",
    navGuests: "Гості",
    navOperations: "Операції",
    navUsers: "Користувачі",
    bookingPage: "Сторінка бронювання",
    publicSite: "Відкрити сайт",
    logout: "Вийти",
    backoffice: "Backoffice",
    refresh: "Оновити",
    exportCsv: "Експорт CSV",
    newReservationFull: "Нове бронювання",
    titleDashboard: "Операційний огляд",
    titleReservations: "Бронювання",
    titleCalendar: "Календар",
    titleCatalog: "Каталог готелю",
    titleGuests: "Гості",
    titleOperations: "Операції",
    titleUsers: "Користувачі та доступи",
    kpiTotal: "Усього бронювань",
    kpiConfirmed: "Підтверджені",
    kpiPending: "Очікують",
    kpiUpcoming: "Найближчі заїзди",
    today: "Сьогодні",
    todayMovement: "Події дня",
    arrivals: "Заїзди",
    departures: "Виїзди",
    priority: "Пріоритет",
    pendingReservations: "Бронювання в очікуванні",
    availability: "Доступність",
    roomsOccupancy: "Кімнати та зайнятість",
    searchReservations: "Пошук за іменем, телефоном, email, статусом або джерелом",
    allStatuses: "Усі статуси",
    allSources: "Усі джерела",
    guest: "Гість",
    dates: "Дати",
    room: "Кімната",
    source: "Джерело",
    cost: "Вартість",
    status: "Статус",
    actions: "Дії",
    editable: "Редагується",
    catalogMainTitle: "Кімнати, харчування та послуги",
    savedBackend: "Зберігається на сервері",
    rooms: "Кімнати",
    roomTypes: "Типи, місткість та одиниці",
    addRoom: "Додати кімнату",
    meals: "Харчування",
    mealsTitle: "Сніданки, Шабат і групи",
    addMeal: "Додати харчування",
    services: "Послуги",
    servicesTitle: "Видимі послуги готелю",
    addService: "Додати послугу",
    undoChanges: "Скасувати зміни",
    saveCatalog: "Зберегти каталог",
    occupancy: "Зайнятість",
    activeRooms: "Активні кімнати",
    prepareArrivals: "Підготувати заїзди",
    roomsToReview: "Кімнати для перевірки",
    import: "Імпорт",
    loadFromMessage: "Завантажити бронювання з WhatsApp або email",
    messagePlaceholder: "Вставте отримане повідомлення. Наприклад: Ім'я: David, Заїзд: 2026-07-10, Виїзд: 2026-07-14, Гості: 4...",
    loadForm: "Завантажити у форму",
    singleOwner: "Єдиний власник",
    mainAdmin: "Головний адміністратор",
    ownerNote: "Головний користувач зберігається у приватних змінних сервера. Його не можна видалити або змінити зі сторінки.",
    newAccess: "Новий доступ",
    createUser: "Створити користувача",
    name: "Ім'я",
    accessType: "Тип доступу",
    fullAccess: "Повний",
    limitedAccess: "Обмежений",
    activeUser: "Активний користувач",
    clear: "Очистити",
    saveUser: "Зберегти користувача",
    team: "Команда",
    secondaryUsers: "Додаткові користувачі",
    access: "Доступ",
    reservation: "Бронювання",
    guestName: "Ім'я гостя",
    phoneWhatsapp: "Телефон / WhatsApp",
    checkin: "Заїзд",
    checkout: "Виїзд",
    guestsLabel: "Гості",
    currency: "Валюта",
    totalCost: "Загальна вартість",
    deposit: "Передоплата / резерв",
    paymentStatus: "Статус оплати",
    internalNotes: "Внутрішні нотатки",
    notesPlaceholder: "Узгоджена ціна, прохання, харчування, час прибуття тощо.",
    saveReservation: "Зберегти бронювання",
    editReservation: "Редагувати бронювання",
    loadingReservations: "Завантаження бронювань...",
    serverError: "Не вдалося завантажити панель.",
    noArrivalsToday: "Сьогодні немає заїздів.",
    noDeparturesToday: "Сьогодні немає виїздів.",
    noPendingReservations: "Немає бронювань в очікуванні.",
    noActiveRooms: "Немає активних кімнат у каталозі.",
    noCurrentOccupancy: "Поточної зайнятості немає.",
    available: "Доступно",
    full: "Заповнено",
    suggestedCapacity: "Рекомендована місткість: до",
    guestsPerUnit: "гостей на одиницю",
    currentAvailable: "доступно зараз",
    noReservationFilters: "Немає бронювань за цими фільтрами.",
    noSecondaryUsers: "Додаткових користувачів ще немає.",
    ownerConfigured: "Головний власник налаштований у приватних змінних сервера.",
    fixed: "Фіксовано",
    active: "Активний",
    inactive: "Неактивний",
    edit: "Редагувати",
    delete: "Видалити",
    open: "Відкрити",
    reservationsWord: "бронювань",
    lastCheckout: "останній виїзд",
    noGuests: "Гостей ще не зареєстровано.",
    prepareArrivalOf: "Підготувати заїзд",
    review: "Перевірити",
    roomPrep: "Прибирання, зручності та загальна підготовка",
    noNextArrivals: "Немає заїздів у найближчі 7 днів.",
    noRoomsReview: "Немає активних кімнат для перевірки.",
    deleteReservationConfirm: "Видалити це бронювання?",
    deleteUserConfirm: "Видалити цього користувача?",
    passwordRequired: "Пароль обов'язковий для нових користувачів.",
    userSaved: "Користувача збережено.",
    catalogReloaded: "Каталог перезавантажено.",
    catalogSaved: "Каталог збережено.",
    entering: "Вхід...",
    manual: "Вручну",
    noPayment: "Без оплати",
    depositPending: "Передоплата очікується",
    depositReceived: "Передоплату отримано",
    paid: "Оплачено",
    pending: "Очікує",
    confirmed: "Підтверджено",
    cancelled: "Скасовано",
    completed: "Завершено",
    web: "Сайт",
    whatsapp: "WhatsApp",
    email: "Email",
  },
};

const defaultHotelSettings = {
  rooms: [
    { id: "single-room", name: "Habitacion individual", capacity: 1, count: 4, price: "", active: true, description: "Habitacion comoda para una persona." },
    { id: "double-room", name: "Habitacion doble", capacity: 2, count: 12, price: "", active: true, description: "Habitacion para pareja o dos huespedes." },
    { id: "family-suite", name: "Suite familiar", capacity: 5, count: 4, price: "", active: true, description: "Opcion amplia para familias." },
    { id: "group-room", name: "Familia / grupo", capacity: 8, count: 3, price: "", active: true, description: "Coordinacion para familias grandes o grupos." },
  ],
  meals: [
    { id: "kosher-breakfast", name: "Desayuno kosher", type: "Desayuno", price: "", active: true, description: "Desayuno kosher sujeto a disponibilidad y coordinacion previa." },
    { id: "shabbat-meals", name: "Comidas de Shabat", type: "Shabat", price: "", active: true, description: "Comidas para Shabat y grupos, bajo reserva." },
  ],
  services: [
    { id: "mikve", name: "Mikve", category: "Servicio", price: "", active: true, description: "Mikve dentro del hotel." },
    { id: "near-tziyun", name: "Cerca del Tziyun", category: "Ubicacion", price: "", active: true, description: "Ubicacion en Bilansky 2, cerca del Tziyun." },
  ],
};

let reservations = [];
let adminUsers = [];
let hotelSettings = cloneSettings(defaultHotelSettings);
let currentUser = null;
let calendarDate = new Date();
let calendarLang = localStorage.getItem("ohCalendarLang") || "es";
let calendarView = localStorage.getItem("ohCalendarView") || "week";
let activeDateField = null;
let pickerDate = new Date();

function text(key) {
  return adminTexts[calendarLang]?.[key] || adminTexts.es[key] || calendarTexts[calendarLang]?.[key] || calendarTexts.es[key] || key;
}

function applyStaticTranslations() {
  const dict = calendarCopy();
  document.documentElement.lang = calendarLang === "uk" ? "uk" : calendarLang;
  document.documentElement.dir = dict.dir;
  document.body.dir = dict.dir;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = text(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", text(node.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-title-key]").forEach((node) => {
    node.dataset.viewTitle = text(node.dataset.titleKey);
  });
  translateSelectOptions();
  const activeView = document.querySelector(".admin-view.is-active");
  if (activeView && adminViewTitle) adminViewTitle.textContent = activeView.dataset.viewTitle || text("titleDashboard");
}

function optionText(select, values) {
  if (!select) return;
  [...select.options].forEach((option) => {
    const key = values[option.value || option.textContent];
    if (key) option.textContent = text(key);
  });
}

function translateSelectOptions() {
  optionText(statusFilter, {
    "": "allStatuses",
    Pendiente: "pending",
    Confirmada: "confirmed",
    Cancelada: "cancelled",
    Completada: "completed",
  });
  optionText(sourceFilter, {
    "": "allSources",
    Web: "web",
    WhatsApp: "whatsapp",
    Email: "email",
    Manual: "manual",
  });
  optionText(document.querySelector("#adminSource"), {
    Web: "web",
    WhatsApp: "whatsapp",
    Email: "email",
    Manual: "manual",
  });
  optionText(document.querySelector("#adminStatus"), {
    Pendiente: "pending",
    Confirmada: "confirmed",
    Cancelada: "cancelled",
    Completada: "completed",
  });
  optionText(document.querySelector("#adminPaymentStatus"), {
    "Sin pago": "noPayment",
    "Anticipo pendiente": "depositPending",
    "Anticipo recibido": "depositReceived",
    Pagado: "paid",
  });
}

async function api(path, options = {}) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), options.timeout || 12000);
  try {
    const response = await fetch(path, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      signal: controller.signal,
      ...options,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "Error del servidor");
    return data;
  } catch (error) {
    if (error.name === "AbortError") throw new Error(text("serverError"));
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

function showDashboard() {
  loginView.hidden = true;
  dashboardView.hidden = false;
  applyStaticTranslations();
  applyAccessRules();
}

function showLogin() {
  loginView.hidden = false;
  dashboardView.hidden = true;
  applyStaticTranslations();
}

function setBackendStatus(message, type = "info") {
  if (!backendStatus) return;
  backendStatus.textContent = message;
  backendStatus.dataset.type = type;
  backendStatus.hidden = !message;
}

function applyAccessRules() {
  const isOwner = currentUser?.role === "owner";
  const canWriteCatalog = currentUser?.role === "owner" || currentUser?.role === "full";
  ownerOnlyNodes.forEach((node) => {
    node.hidden = !isOwner;
  });
  document.querySelectorAll("[data-catalog-write]").forEach((node) => {
    node.hidden = !canWriteCatalog;
  });
  if (catalogForm) {
    catalogForm.querySelectorAll("input, select, textarea").forEach((control) => {
      control.disabled = !canWriteCatalog;
    });
  }
  if (exportButton) exportButton.hidden = currentUser?.canExport === false;
  if (adminCurrentUser && currentUser) {
    adminCurrentUser.textContent = `${currentUser.name || currentUser.username} - ${translateRole(currentUser.role, currentUser.roleLabel)}`;
  }
  document.body.dataset.adminRole = currentUser?.role || "";
}

function setView(name) {
  viewButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.adminView === name));
  views.forEach((view) => {
    const isActive = view.id === `view-${name}`;
    view.classList.toggle("is-active", isActive);
    if (isActive) adminViewTitle.textContent = view.dataset.viewTitle || text("titleDashboard");
  });
}

function formatDate(dateString) {
  if (!dateString) return "-";
  return new Intl.DateTimeFormat(calendarCopy().locale, { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${dateString}T00:00:00`));
}

function nightsBetween(checkin, checkout) {
  const start = new Date(`${checkin}T00:00:00`);
  const end = new Date(`${checkout}T00:00:00`);
  return Math.max(0, Math.round((end - start) / 86400000));
}

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

function amountValue(value) {
  if (value === "" || value === null || value === undefined) return "";
  const number = Number(value);
  return Number.isFinite(number) ? number : "";
}

function formatMoney(amount, currency = "USD") {
  if (amount === "" || amount === null || amount === undefined) return "-";
  const number = Number(amount);
  if (!Number.isFinite(number)) return "-";
  return `${currency || "USD"} ${number.toLocaleString(calendarCopy().locale, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
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
    currency: row.currency || "USD",
    totalAmount: amountValue(row.total_amount),
    depositAmount: amountValue(row.deposit_amount),
    paymentStatus: row.payment_status || "Sin pago",
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
    currency: data.get("currency") || "USD",
    totalAmount: data.get("totalAmount"),
    depositAmount: data.get("depositAmount"),
    paymentStatus: data.get("paymentStatus"),
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
  syncRoomTypeOptions();
  document.querySelector("#adminGuests").value = "2";
  document.querySelector("#adminStatus").value = "Pendiente";
  document.querySelector("#adminSource").value = "Manual";
  document.querySelector("#adminCurrency").value = "USD";
  document.querySelector("#adminPaymentStatus").value = "Sin pago";
  translateSelectOptions();
  formTitle.textContent = text("newReservationFull");
}

function resetAdminUserForm() {
  if (!userForm) return;
  userForm.reset();
  document.querySelector("#userId").value = "";
  document.querySelector("#userUsername").disabled = false;
  document.querySelector("#userRole").value = "limited";
  document.querySelector("#userActive").checked = true;
}

function editAdminUser(id) {
  const user = adminUsers.find((item) => item.id === id);
  if (!user || user.immutable) return;
  document.querySelector("#userId").value = user.id;
  document.querySelector("#userUsername").value = user.username;
  document.querySelector("#userUsername").disabled = true;
  document.querySelector("#userName").value = user.name;
  document.querySelector("#userPassword").value = "";
  document.querySelector("#userRole").value = user.role;
  document.querySelector("#userActive").checked = user.active !== false;
  setView("users");
}

function getUserFormData() {
  return {
    username: document.querySelector("#userUsername").value.trim(),
    name: document.querySelector("#userName").value.trim(),
    password: document.querySelector("#userPassword").value,
    role: document.querySelector("#userRole").value,
    active: document.querySelector("#userActive").checked,
  };
}

function cloneSettings(settings) {
  return JSON.parse(JSON.stringify(settings || defaultHotelSettings));
}

function makeClientId(prefix) {
  const random = window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}-${random}`;
}

function normalizeClientSettings(settings = {}) {
  const source = settings.settings || settings || {};
  const defaults = cloneSettings(defaultHotelSettings);
  const rooms = Array.isArray(source.rooms) ? source.rooms : defaults.rooms;
  const meals = Array.isArray(source.meals) ? source.meals : defaults.meals;
  const services = Array.isArray(source.services) ? source.services : defaults.services;
  return {
    rooms: rooms.map((room) => ({
      id: room.id || makeClientId("room"),
      name: String(room.name || "Nueva habitacion").trim(),
      capacity: Math.max(1, Number(room.capacity || 1)),
      count: Math.max(0, Number(room.count || 0)),
      price: String(room.price || "").trim(),
      active: room.active !== false,
      description: String(room.description || "").trim(),
    })),
    meals: meals.map((meal) => ({
      id: meal.id || makeClientId("meal"),
      name: String(meal.name || "Nueva comida").trim(),
      type: String(meal.type || "Comida").trim(),
      price: String(meal.price || "").trim(),
      active: meal.active !== false,
      description: String(meal.description || "").trim(),
    })),
    services: services.map((service) => ({
      id: service.id || makeClientId("service"),
      name: String(service.name || "Nuevo servicio").trim(),
      category: String(service.category || "Servicio").trim(),
      price: String(service.price || "").trim(),
      active: service.active !== false,
      description: String(service.description || "").trim(),
    })),
  };
}

function activeRooms() {
  return (hotelSettings.rooms || []).filter((room) => room.active !== false);
}

function syncRoomTypeOptions(selectedValue = "") {
  if (!roomTypeSelect) return;
  const current = selectedValue || roomTypeSelect.value;
  const rooms = activeRooms();
  const options = rooms.map((room) => `<option value="${escapeHtml(room.name)}">${escapeHtml(room.name)}</option>`);
  if (current && !rooms.some((room) => room.name === current)) {
    options.push(`<option value="${escapeHtml(current)}">${escapeHtml(current)}</option>`);
  }
  if (!options.length) options.push(`<option value="Por definir">Por definir</option>`);
  roomTypeSelect.innerHTML = options.join("");
  if (current) roomTypeSelect.value = current;
}

function renderCatalogItem(group, item) {
  const active = item.active !== false ? "checked" : "";
  const removeLabel = group === "rooms" ? text("delete") : group === "meals" ? text("delete") : text("delete");
  const extraFields = group === "rooms" ? `
    <div class="catalog-mini-grid">
      <label>${text("rooms")}
        <input type="number" min="0" data-field="count" value="${escapeHtml(item.count)}">
      </label>
      <label>${text("availability")}
        <input type="number" min="1" data-field="capacity" value="${escapeHtml(item.capacity)}">
      </label>
      <label>${text("cost")}
        <input type="text" data-field="price" value="${escapeHtml(item.price)}" placeholder="-">
      </label>
    </div>
  ` : group === "meals" ? `
    <div class="catalog-mini-grid">
      <label>${text("accessType")}
        <input type="text" data-field="type" value="${escapeHtml(item.type)}">
      </label>
      <label>${text("cost")}
        <input type="text" data-field="price" value="${escapeHtml(item.price)}" placeholder="-">
      </label>
    </div>
  ` : `
    <div class="catalog-mini-grid">
      <label>${text("services")}
        <input type="text" data-field="category" value="${escapeHtml(item.category)}">
      </label>
      <label>${text("cost")}
        <input type="text" data-field="price" value="${escapeHtml(item.price)}" placeholder="-">
      </label>
    </div>
  `;

  return `
    <article class="catalog-item" data-catalog-item="${group}" data-id="${escapeHtml(item.id)}">
      <div class="catalog-item-top">
        <label>${text("name")}
          <input type="text" data-field="name" value="${escapeHtml(item.name)}" required>
        </label>
        <label class="catalog-active">
          <input type="checkbox" data-field="active" ${active}>
          ${text("active")}
        </label>
      </div>
      ${extraFields}
      <label>${text("internalNotes")}
        <textarea rows="2" data-field="description">${escapeHtml(item.description)}</textarea>
      </label>
      <button class="catalog-remove" type="button" data-catalog-remove="${group}" data-catalog-write>${removeLabel}</button>
    </article>
  `;
}

function renderCatalog() {
  if (roomsCatalog) roomsCatalog.innerHTML = (hotelSettings.rooms || []).map((item) => renderCatalogItem("rooms", item)).join("") || empty(text("noActiveRooms"));
  if (mealsCatalog) mealsCatalog.innerHTML = (hotelSettings.meals || []).map((item) => renderCatalogItem("meals", item)).join("") || empty(text("noActiveRooms"));
  if (servicesCatalog) servicesCatalog.innerHTML = (hotelSettings.services || []).map((item) => renderCatalogItem("services", item)).join("") || empty(text("noActiveRooms"));
  applyAccessRules();
}

function readCatalogGroup(group) {
  return [...document.querySelectorAll(`[data-catalog-item="${group}"]`)].map((node) => {
    const field = (name) => node.querySelector(`[data-field="${name}"]`);
    const base = {
      id: node.dataset.id,
      name: field("name")?.value.trim() || "",
      active: field("active")?.checked !== false,
      description: field("description")?.value.trim() || "",
    };
    if (group === "rooms") {
      return {
        ...base,
        count: Number(field("count")?.value || 0),
        capacity: Number(field("capacity")?.value || 1),
        price: field("price")?.value.trim() || "",
      };
    }
    if (group === "meals") {
      return {
        ...base,
        type: field("type")?.value.trim() || "Comida",
        price: field("price")?.value.trim() || "",
      };
    }
    return {
      ...base,
      category: field("category")?.value.trim() || "Servicio",
      price: field("price")?.value.trim() || "",
    };
  });
}

function readCatalogFromForm() {
  return normalizeClientSettings({
    rooms: readCatalogGroup("rooms"),
    meals: readCatalogGroup("meals"),
    services: readCatalogGroup("services"),
  });
}

function addCatalogItem(group) {
  const next = group === "rooms"
    ? { id: makeClientId("room"), name: "Nueva habitacion", capacity: 2, count: 1, price: "", active: true, description: "" }
    : group === "meals"
      ? { id: makeClientId("meal"), name: "Nueva comida", type: "Desayuno", price: "", active: true, description: "" }
      : { id: makeClientId("service"), name: "Nuevo servicio", category: "Servicio", price: "", active: true, description: "" };
  hotelSettings[group].push(next);
  renderCatalog();
  syncRoomTypeOptions();
}

function removeCatalogItem(group, id) {
  hotelSettings[group] = hotelSettings[group].filter((item) => item.id !== id);
  renderCatalog();
  syncRoomTypeOptions();
}

async function loadHotelSettings() {
  const data = await api("/api/hotel-settings");
  hotelSettings = normalizeClientSettings(data.settings);
  renderCatalog();
  syncRoomTypeOptions();
}

async function loadReservations() {
  setBackendStatus(text("loadingReservations"));
  const data = await api("/api/reservations");
  reservations = data.reservations.map(toClientReservation);
  setBackendStatus("");
  render();
}

async function loadAdminUsers() {
  if (currentUser?.role !== "owner") return;
  const data = await api("/api/admin-users");
  adminUsers = data.users || [];
  renderUsers();
}

async function initializeDashboard() {
  showDashboard();
  setBackendStatus(text("loadingReservations"));
  const results = await Promise.allSettled([
    loadHotelSettings(),
    loadReservations(),
    loadAdminUsers(),
  ]);
  const failed = results.find((result) => result.status === "rejected");
  if (failed) setBackendStatus(failed.reason?.message || text("serverError"), "error");
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
        <span>${formatDate(item.checkin)} - ${formatDate(item.checkout)} - ${escapeHtml(item.guests)} pax</span>
      </div>
      <button type="button" data-action="edit" data-id="${item.id}">${text("open")}</button>
    </article>
  `;
}

function renderDashboard() {
  const today = todayString();
  const arrivals = reservations.filter((item) => item.checkin === today && item.status !== "Cancelada");
  const departures = reservations.filter((item) => item.checkout === today && item.status !== "Cancelada");
  const pending = reservations.filter((item) => item.status === "Pendiente").slice(0, 6);

  document.querySelector("#arrivalList").innerHTML = arrivals.length ? arrivals.map(miniReservation).join("") : empty(text("noArrivalsToday"));
  document.querySelector("#departureList").innerHTML = departures.length ? departures.map(miniReservation).join("") : empty(text("noDeparturesToday"));
  document.querySelector("#pendingList").innerHTML = pending.length ? pending.map(miniReservation).join("") : empty(text("noPendingReservations"));
  renderRoomBoard();
}

function renderRoomBoard() {
  const active = currentReservations();
  const rooms = activeRooms();
  document.querySelector("#roomBoard").innerHTML = rooms.length ? rooms.map((room) => {
    const occupied = active.filter((item) => item.roomType === room.name).length;
    const available = Math.max(0, room.count - occupied);
    const percent = room.count ? Math.round((occupied / room.count) * 100) : 0;
    return `
      <article class="room-board-card">
        <div>
          <strong>${room.name}</strong>
          <span>${room.count} ${text("rooms")} - ${text("suggestedCapacity")} ${room.capacity} pax</span>
        </div>
        <div class="occupancy-bar"><span style="width:${percent}%"></span></div>
        <p>${available} ${text("currentAvailable")}</p>
      </article>
    `;
  }).join("") : empty(text("noActiveRooms"));
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
    reservationTable.innerHTML = `<tr><td colspan="7">${empty(text("noReservationFilters"))}</td></tr>`;
    return;
  }

  reservationTable.innerHTML = items.map((item) => `
    <tr>
      <td>
        <strong>${escapeHtml(item.guestName)}</strong>
        <span>${escapeHtml(item.guestPhone || item.guestEmail || "-")}</span>
      </td>
      <td>
        <strong>${formatDate(item.checkin)} - ${formatDate(item.checkout)}</strong>
        <span>${nightsBetween(item.checkin, item.checkout)} ${calendarCopy().nights} - ${escapeHtml(item.guests)} pax</span>
      </td>
      <td>${escapeHtml(item.roomType)}</td>
      <td>${escapeHtml(translateSource(item.source))}</td>
      <td>
        <strong>${formatMoney(item.totalAmount, item.currency)}</strong>
        <span>${item.depositAmount !== "" ? `${text("deposit")}: ${formatMoney(item.depositAmount, item.currency)}` : escapeHtml(translatePaymentStatus(item.paymentStatus || "Sin pago"))}</span>
      </td>
      <td><span class="status-pill status-${item.status.toLowerCase()}">${escapeHtml(translatedStatus(item.status))}</span></td>
      <td>
        <div class="row-actions">
          <button type="button" data-action="edit" data-id="${item.id}">${text("edit")}</button>
          ${currentUser?.canDeleteReservations === false ? "" : `<button type="button" data-action="delete" data-id="${item.id}">${text("delete")}</button>`}
        </div>
      </td>
    </tr>
  `).join("");
}

function renderUsers() {
  if (!usersTable) return;
  const owner = adminUsers.find((user) => user.immutable);
  const storedUsers = adminUsers.filter((user) => !user.immutable);
  const ownerBox = document.querySelector("#ownerUserBox");

  if (ownerBox) {
    ownerBox.innerHTML = owner ? `
      <article class="mini-row">
        <div>
          <strong>${escapeHtml(owner.name)}</strong>
          <span>${escapeHtml(owner.username)} - ${text("mainAdmin")}</span>
        </div>
        <span class="status-pill">${text("fixed")}</span>
      </article>
    ` : empty(text("ownerConfigured"));
  }

  usersTable.innerHTML = storedUsers.length ? storedUsers.map((user) => `
    <tr>
      <td>
        <strong>${escapeHtml(user.name)}</strong>
        <span>${escapeHtml(user.username)}</span>
      </td>
      <td>${escapeHtml(translateRole(user.role, user.roleLabel))}</td>
      <td><span class="status-pill ${user.active ? "status-confirmada" : "status-cancelada"}">${user.active ? text("active") : text("inactive")}</span></td>
      <td>
        <div class="row-actions">
          <button type="button" data-action="edit-user" data-id="${user.id}">${text("edit")}</button>
          <button type="button" data-action="delete-user" data-id="${user.id}">${text("delete")}</button>
        </div>
      </td>
    </tr>
  `).join("") : `<tr><td colspan="4">${empty(text("noSecondaryUsers"))}</td></tr>`;
}

function calendarCopy() {
  return calendarTexts[calendarLang] || calendarTexts.es;
}

function dateOnly(value) {
  if (value instanceof Date) return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  return new Date(`${value}T00:00:00`);
}

function toIsoDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function isIsoDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || ""));
}

function addDays(date, days) {
  const copy = dateOnly(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function openDatePicker(field) {
  activeDateField = field;
  const input = field === "checkout" ? adminCheckoutInput : adminCheckinInput;
  pickerDate = isIsoDate(input.value) ? dateOnly(input.value) : new Date();
  renderDatePicker();
  adminDatePicker.hidden = false;
}

function closeDatePicker() {
  if (adminDatePicker) adminDatePicker.hidden = true;
  activeDateField = null;
}

function renderDatePicker() {
  if (!adminDatePicker) return;
  const dict = calendarCopy();
  const year = pickerDate.getFullYear();
  const month = pickerDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const offset = (firstDay.getDay() - dict.firstDay + 7) % 7;
  const gridStart = addDays(firstDay, -offset);
  const checkin = adminCheckinInput.value;
  const checkout = adminCheckoutInput.value;
  const monthName = new Intl.DateTimeFormat(dict.locale, { month: "long", year: "numeric" }).format(pickerDate);
  const title = dict.dir === "rtl" ? monthName : monthName.charAt(0).toUpperCase() + monthName.slice(1);
  const cells = dict.weekdays.map((day) => `<span class="date-picker-weekday">${escapeHtml(day)}</span>`);

  for (let index = 0; index < 42; index += 1) {
    const cellDate = addDays(gridStart, index);
    const iso = toIsoDate(cellDate);
    const muted = cellDate.getMonth() !== month;
    const isStart = iso === checkin;
    const isEnd = iso === checkout;
    const inRange = isIsoDate(checkin) && isIsoDate(checkout) && iso > checkin && iso < checkout;
    cells.push(`
      <button type="button" class="${[
        "date-picker-day",
        muted ? "is-muted" : "",
        isStart ? "is-start" : "",
        isEnd ? "is-end" : "",
        inRange ? "is-range" : "",
      ].filter(Boolean).join(" ")}" data-picker-date="${iso}">
        ${cellDate.getDate()}
      </button>
    `);
  }

  adminDatePicker.innerHTML = `
    <div class="date-picker-head">
      <button type="button" data-picker-action="prev" aria-label="${escapeHtml(dict.prev)}">&lt;</button>
      <strong>${escapeHtml(title)}</strong>
      <button type="button" data-picker-action="next" aria-label="${escapeHtml(dict.next)}">&gt;</button>
    </div>
    <div class="date-picker-mode">${activeDateField === "checkout" ? text("checkout") : text("checkin")}</div>
    <div class="date-picker-grid">${cells.join("")}</div>
  `;
}

function selectPickerDate(value) {
  if (!activeDateField || !isIsoDate(value)) return;
  if (activeDateField === "checkin") {
    adminCheckinInput.value = value;
    if (!isIsoDate(adminCheckoutInput.value) || adminCheckoutInput.value <= value) {
      adminCheckoutInput.value = toIsoDate(addDays(dateOnly(value), 1));
    }
    activeDateField = "checkout";
    pickerDate = dateOnly(adminCheckoutInput.value);
    renderDatePicker();
    return;
  }
  adminCheckoutInput.value = value;
  if (isIsoDate(adminCheckinInput.value) && adminCheckoutInput.value <= adminCheckinInput.value) {
    adminCheckinInput.value = toIsoDate(addDays(dateOnly(value), -1));
  }
  renderDatePicker();
  closeDatePicker();
}

function statusKey(status) {
  return String(status || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function translatedStatus(status) {
  const dict = calendarCopy();
  const key = statusKey(status);
  if (key === "confirmada") return dict.confirmed;
  if (key === "pendiente") return dict.pending;
  if (key === "completada") return dict.completed;
  if (key === "cancelada") return dict.cancelled;
  return status || "";
}

function translatePaymentStatus(status) {
  const key = String(status || "");
  if (key === "Sin pago") return text("noPayment");
  if (key === "Anticipo pendiente") return text("depositPending");
  if (key === "Anticipo recibido") return text("depositReceived");
  if (key === "Pagado") return text("paid");
  return status || "";
}

function translateSource(source) {
  const key = String(source || "");
  if (key === "Web") return text("web");
  if (key === "WhatsApp") return text("whatsapp");
  if (key === "Email") return text("email");
  if (key === "Manual") return text("manual");
  return source || "";
}

function translateRole(role, fallback = "") {
  if (role === "owner") return text("mainAdmin");
  if (role === "full") return text("fullAccess");
  if (role === "limited") return text("limitedAccess");
  return fallback || role || "";
}

function calendarBookingMeta(item) {
  const parts = [item.roomType || "-", translatedStatus(item.status)];
  if (item.totalAmount !== "") parts.push(formatMoney(item.totalAmount, item.currency));
  return parts.map(escapeHtml).join(" - ");
}

function formatCalendarDate(dateString) {
  const dict = calendarCopy();
  return new Intl.DateTimeFormat(dict.locale, { day: "2-digit", month: "short" }).format(dateOnly(dateString));
}

function reservationOverlapsDate(item, dateString) {
  return item.status !== "Cancelada" && item.checkin <= dateString && item.checkout > dateString;
}

function reservationOverlapsRange(item, startDate, endDate) {
  if (item.status === "Cancelada") return false;
  const checkin = dateOnly(item.checkin);
  const checkout = dateOnly(item.checkout);
  return checkin < endDate && checkout > startDate;
}

function overlapNights(item, startDate, endDate) {
  const checkin = dateOnly(item.checkin);
  const checkout = dateOnly(item.checkout);
  const start = checkin > startDate ? checkin : startDate;
  const end = checkout < endDate ? checkout : endDate;
  return Math.max(0, Math.round((end - start) / 86400000));
}

function renderCalendarText(dict) {
  if (calendarPanel) {
    calendarPanel.dir = dict.dir;
    calendarPanel.dataset.calendarLang = calendarLang;
  }
  if (calendarEyebrow) calendarEyebrow.textContent = dict.eyebrow;
  if (calendarSubtitle) calendarSubtitle.textContent = dict.subtitle;
  if (todayMonthButton) todayMonthButton.textContent = dict.today;
  if (prevMonthButton) {
    prevMonthButton.textContent = dict.dir === "rtl" ? ">" : "<";
    prevMonthButton.setAttribute("aria-label", dict.prev);
  }
  if (nextMonthButton) {
    nextMonthButton.textContent = dict.dir === "rtl" ? "<" : ">";
    nextMonthButton.setAttribute("aria-label", dict.next);
  }
  if (calendarSummary.arrivalsLabel) calendarSummary.arrivalsLabel.textContent = dict.arrivals;
  if (calendarSummary.departuresLabel) calendarSummary.departuresLabel.textContent = dict.departures;
  if (calendarSummary.occupancyLabel) calendarSummary.occupancyLabel.textContent = dict.occupancy;
  if (calendarSummary.revenueLabel) calendarSummary.revenueLabel.textContent = dict.revenue;
  if (calendarAgendaEyebrow) calendarAgendaEyebrow.textContent = dict.agenda;
  if (calendarAgendaTitle) calendarAgendaTitle.textContent = dict.agendaTitle;
  if (calendarLegend) {
    calendarLegend.innerHTML = `
      <span><i class="legend-confirmed"></i>${dict.confirmed}</span>
      <span><i class="legend-pending"></i>${dict.pending}</span>
      <span><i class="legend-completed"></i>${dict.completed}</span>
    `;
  }
  adminLanguageButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.calendarLang === calendarLang);
  });
  calendarViewButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.calendarView === calendarView);
  });
}

function monthRevenue(items) {
  const totals = new Map();
  items.forEach((item) => {
    const amount = Number(item.totalAmount);
    if (!Number.isFinite(amount) || amount <= 0) return;
    const currency = item.currency || "USD";
    totals.set(currency, (totals.get(currency) || 0) + amount);
  });
  const values = [...totals.entries()].map(([currency, amount]) => formatMoney(amount, currency));
  return values.length ? values.slice(0, 2).join(" / ") : "-";
}

function renderCalendarSummary(items, monthStart, monthEnd, daysInMonth) {
  const arrivals = items.filter((item) => dateOnly(item.checkin) >= monthStart && dateOnly(item.checkin) < monthEnd).length;
  const departures = items.filter((item) => dateOnly(item.checkout) >= monthStart && dateOnly(item.checkout) < monthEnd).length;
  const occupiedNights = items.reduce((total, item) => total + overlapNights(item, monthStart, monthEnd), 0);
  const roomNights = activeRooms().reduce((total, room) => total + Number(room.count || 0), 0) * daysInMonth;
  const occupancy = roomNights ? Math.min(100, Math.round((occupiedNights / roomNights) * 100)) : 0;
  if (calendarSummary.arrivals) calendarSummary.arrivals.textContent = arrivals;
  if (calendarSummary.departures) calendarSummary.departures.textContent = departures;
  if (calendarSummary.occupancy) calendarSummary.occupancy.textContent = `${occupancy}%`;
  if (calendarSummary.revenue) calendarSummary.revenue.textContent = monthRevenue(items);
}

function renderCalendarAgenda(items, monthStart, monthEnd) {
  const dict = calendarCopy();
  const movements = items
    .filter((item) => dateOnly(item.checkin) >= monthStart && dateOnly(item.checkin) < monthEnd)
    .sort((a, b) => a.checkin.localeCompare(b.checkin))
    .slice(0, 12);

  if (!calendarAgenda) return;
  calendarAgenda.innerHTML = movements.length ? movements.map((item) => `
    <article class="calendar-agenda-item">
      <div>
        <strong>${escapeHtml(item.guestName)}</strong>
        <span>${formatCalendarDate(item.checkin)} - ${formatCalendarDate(item.checkout)} - ${escapeHtml(item.roomType || "-")}</span>
      </div>
      <div>
        <span class="status-pill status-${statusKey(item.status)}">${escapeHtml(translatedStatus(item.status))}</span>
        <button type="button" data-action="edit" data-id="${item.id}">${escapeHtml(dict.open)}</button>
      </div>
    </article>
  `).join("") : empty(dict.noAgenda);
}

function renderCalendar() {
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const dict = calendarCopy();
  if (calendarView === "week") {
    renderWeekCalendar(dict);
    return;
  }
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthStart = firstDay;
  const monthEnd = new Date(year, month + 1, 1);
  const offset = (firstDay.getDay() - dict.firstDay + 7) % 7;
  const gridStart = addDays(firstDay, -offset);
  const monthName = new Intl.DateTimeFormat(dict.locale, { month: "long", year: "numeric" }).format(calendarDate);
  const title = dict.dir === "rtl" ? monthName : monthName.charAt(0).toUpperCase() + monthName.slice(1);
  const monthItems = reservations.filter((item) => reservationOverlapsRange(item, monthStart, monthEnd));
  const totalRooms = activeRooms().reduce((total, room) => total + Number(room.count || 0), 0);

  renderCalendarText(dict);
  calendarTitle.textContent = title;
  renderCalendarSummary(monthItems, monthStart, monthEnd, daysInMonth);
  renderCalendarAgenda(monthItems, monthStart, monthEnd);
  calendarGrid.classList.remove("is-week-view");
  calendarGrid.classList.add("is-month-view");

  const cells = dict.weekdays.map((day) => `<div class="calendar-weekday">${day}</div>`);

  for (let index = 0; index < 42; index += 1) {
    const cellDate = addDays(gridStart, index);
    const date = toIsoDate(cellDate);
    const isCurrentMonth = cellDate.getMonth() === month;
    const isToday = date === todayString();
    const dayReservations = reservations.filter((item) => reservationOverlapsDate(item, date));
    const arrivals = reservations.filter((item) => item.status !== "Cancelada" && item.checkin === date).length;
    const departures = reservations.filter((item) => item.status !== "Cancelada" && item.checkout === date).length;
    const available = Math.max(0, totalRooms - dayReservations.length);
    const classes = [
      "calendar-day",
      isCurrentMonth ? "" : "is-muted",
      isToday ? "is-today" : "",
      dayReservations.length ? "has-booking" : "",
    ].filter(Boolean).join(" ");

    cells.push(`
      <div class="${classes}">
        <div class="calendar-day-head">
          <strong>${cellDate.getDate()}</strong>
          <span>${available} ${dict.available}</span>
        </div>
        <div class="calendar-day-flags">
          ${arrivals ? `<span>${dict.arrivals}: ${arrivals}</span>` : ""}
          ${departures ? `<span>${dict.departures}: ${departures}</span>` : ""}
        </div>
        <div class="calendar-bookings">
          ${dayReservations.slice(0, 3).map((item) => `
            <button type="button" class="calendar-booking calendar-booking--${statusKey(item.status)}" data-action="edit" data-id="${item.id}">
              <span class="calendar-booking-name">${escapeHtml(item.guestName)}</span>
              <span class="calendar-booking-meta">${calendarBookingMeta(item)}</span>
            </button>
          `).join("")}
          ${dayReservations.length > 3 ? `<em class="calendar-more">+${dayReservations.length - 3} ${dict.more}</em>` : ""}
        </div>
        <button class="calendar-add-day" type="button" data-action="new-date" data-date="${date}">+ ${dict.newReservation}</button>
      </div>
    `);
  }

  calendarGrid.innerHTML = cells.join("");
}

function renderWeekCalendar(dict) {
  const current = dateOnly(calendarDate);
  const offset = (current.getDay() - dict.firstDay + 7) % 7;
  const weekStart = addDays(current, -offset);
  const weekEnd = addDays(weekStart, 7);
  const daysInRange = 7;
  const weekItems = reservations.filter((item) => reservationOverlapsRange(item, weekStart, weekEnd));
  const titleStart = new Intl.DateTimeFormat(dict.locale, { day: "2-digit", month: "short" }).format(weekStart);
  const titleEnd = new Intl.DateTimeFormat(dict.locale, { day: "2-digit", month: "short", year: "numeric" }).format(addDays(weekEnd, -1));
  const rooms = activeRooms();
  const roomNames = new Set(rooms.map((room) => room.name));
  const extraItems = weekItems.filter((item) => !roomNames.has(item.roomType));
  const rows = extraItems.length ? [...rooms, { name: text("room"), count: 0, capacity: 0, isExtra: true }] : rooms;
  const dayCells = Array.from({ length: 7 }, (_, index) => {
    const date = addDays(weekStart, index);
    const label = new Intl.DateTimeFormat(dict.locale, { weekday: "short", day: "2-digit" }).format(date);
    return { date, iso: toIsoDate(date), label };
  });

  renderCalendarText(dict);
  calendarTitle.textContent = `${titleStart} - ${titleEnd}`;
  renderCalendarSummary(weekItems, weekStart, weekEnd, daysInRange);
  renderCalendarAgenda(weekItems, weekStart, weekEnd);

  const header = `
    <section class="timeline-row timeline-header">
      <div class="timeline-room-label">${escapeHtml(text("room"))}</div>
      ${dayCells.map((day, index) => `
        <div class="timeline-day-head ${day.iso === todayString() ? "is-today" : ""}" style="grid-column:${index + 2}">
          ${escapeHtml(day.label)}
        </div>
      `).join("")}
    </section>
  `;

  const body = rows.length ? rows.map((room) => {
    const roomItems = (room.isExtra ? extraItems : weekItems.filter((item) => item.roomType === room.name))
      .sort((a, b) => a.checkin.localeCompare(b.checkin))
      .slice(0, 6);
    const barRows = Math.max(1, roomItems.length);
    return `
      <section class="timeline-row" style="--bar-rows:${barRows}">
        <div class="timeline-room-label">
          <strong>${escapeHtml(room.name)}</strong>
          <span>${room.isExtra ? dict.empty : `${room.count || 0} ${text("rooms")}`}</span>
        </div>
        ${dayCells.map((day, index) => {
          const occupied = (room.isExtra ? extraItems : weekItems.filter((item) => item.roomType === room.name))
            .filter((item) => reservationOverlapsDate(item, day.iso)).length;
          const available = room.isExtra ? "" : Math.max(0, Number(room.count || 0) - occupied);
          return `
            <button class="timeline-cell ${day.iso === todayString() ? "is-today" : ""}" type="button" data-action="new-date" data-date="${day.iso}" style="grid-column:${index + 2}">
              ${available !== "" ? `<span>${available}</span>` : ""}
            </button>
          `;
        }).join("")}
        ${roomItems.map((item, itemIndex) => {
          const start = Math.max(0, Math.floor((dateOnly(item.checkin) - weekStart) / 86400000));
          const end = Math.min(7, Math.ceil((dateOnly(item.checkout) - weekStart) / 86400000));
          const safeEnd = Math.max(start + 1, end);
          return `
            <button type="button" class="timeline-booking timeline-booking--${statusKey(item.status)}" data-action="edit" data-id="${item.id}" style="grid-column:${start + 2} / ${safeEnd + 2}; --bar-index:${itemIndex}">
              <span>${escapeHtml(item.guestName)}</span>
              <small>${escapeHtml(translatedStatus(item.status))}</small>
            </button>
          `;
        }).join("")}
      </section>
    `;
  }).join("") : `<p class="empty-state">${text("noActiveRooms")}</p>`;

  calendarGrid.classList.remove("is-month-view");
  calendarGrid.classList.add("is-week-view");
  calendarGrid.innerHTML = header + body;
}

function renderRooms() {
  const active = currentReservations();
  const rooms = activeRooms();
  document.querySelector("#roomsGrid").innerHTML = rooms.length ? rooms.map((room) => {
    const occupied = active.filter((item) => item.roomType === room.name);
    const available = Math.max(0, room.count - occupied.length);
    return `
      <article class="room-card">
        <div class="room-card-top">
          <div>
            <p class="eyebrow">${available > 0 ? text("available") : text("full")}</p>
            <h2>${room.name}</h2>
          </div>
          <strong>${available}/${room.count}</strong>
        </div>
        <p>${text("suggestedCapacity")} ${room.capacity} ${text("guestsPerUnit")}.${room.price ? ` ${text("cost")}: ${escapeHtml(room.price)}.` : ""}</p>
        <div class="mini-list">${occupied.length ? occupied.map(miniReservation).join("") : empty(text("noCurrentOccupancy"))}</div>
      </article>
    `;
  }).join("") : empty(text("noActiveRooms"));
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
        <span>${escapeHtml(guest.guestPhone || "-")}</span>
        <span>${escapeHtml(guest.guestEmail || "-")}</span>
      </div>
      <div>
        <strong>${guest.stays}</strong>
        <span>${text("reservationsWord")}</span>
      </div>
      <div>
        <strong>${formatDate(guest.lastStay)}</strong>
        <span>${text("lastCheckout")}</span>
      </div>
    </article>
  `).join("") : empty(text("noGuests"));
}

function renderOperations() {
  const upcoming = upcomingReservations(7);
  document.querySelector("#operationArrivals").innerHTML = upcoming.length ? upcoming.map((item) => `
    <article class="task-row">
      <input type="checkbox" aria-label="Marcar tarea">
      <div>
        <strong>${text("prepareArrivalOf")} ${escapeHtml(item.guestName)}</strong>
        <span>${formatDate(item.checkin)} - ${escapeHtml(item.roomType)} - ${escapeHtml(item.guests)} pax</span>
      </div>
    </article>
  `).join("") : empty(text("noNextArrivals"));

  const rooms = activeRooms();
  document.querySelector("#operationRooms").innerHTML = rooms.length ? rooms.map((room) => `
    <article class="task-row">
      <input type="checkbox" aria-label="Marcar tarea">
      <div>
        <strong>${text("review")} ${room.name}</strong>
        <span>${text("roomPrep")}</span>
      </div>
    </article>
  `).join("") : empty(text("noRoomsReview"));
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
  syncRoomTypeOptions(item.roomType);
  document.querySelector("#adminRoomType").value = item.roomType;
  document.querySelector("#adminSource").value = item.source;
  document.querySelector("#adminStatus").value = item.status;
  document.querySelector("#adminCurrency").value = item.currency || "USD";
  document.querySelector("#adminTotalAmount").value = item.totalAmount;
  document.querySelector("#adminDepositAmount").value = item.depositAmount;
  document.querySelector("#adminPaymentStatus").value = item.paymentStatus || "Sin pago";
  document.querySelector("#adminNotes").value = item.notes;
  formTitle.textContent = text("editReservation");
  openEditor("edit");
}

async function deleteReservation(id) {
  if (!confirm(text("deleteReservationConfirm"))) return;
  await api(`/api/reservations/${encodeURIComponent(id)}`, { method: "DELETE" });
  await loadReservations();
}

async function deleteAdminUser(id) {
  if (!confirm(text("deleteUserConfirm"))) return;
  await api(`/api/admin-users/${encodeURIComponent(id)}`, { method: "DELETE" });
  await loadAdminUsers();
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
    totalAmount: findValue(["Costo", "Precio", "Total", "Amount", "Price"]),
    depositAmount: findValue(["Anticipo", "Sena", "Deposito", "Deposit"]),
    notes: text.trim(),
  };
}

function exportCsv() {
  const headers = ["Nombre", "Telefono", "Email", "Entrada", "Salida", "Huespedes", "Habitacion", "Origen", "Estado", "Moneda", "Costo total", "Anticipo", "Estado de pago", "Notas"];
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
    item.currency,
    item.totalAmount,
    item.depositAmount,
    item.paymentStatus,
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
  const submitButton = loginForm.querySelector("button[type='submit']");
  const originalText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = text("entering");

  try {
    const login = await api("/api/login", {
      method: "POST",
      body: JSON.stringify({
        username: document.querySelector("#adminUser").value.trim(),
        password: document.querySelector("#adminPassword").value.trim(),
      }),
    });
    currentUser = login.user;
    initializeDashboard();
  } catch (error) {
    if (loginView.hidden) {
      setBackendStatus(error.message || text("serverError"), "error");
    } else {
      loginError.textContent = error.message;
      loginError.hidden = false;
    }
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
});

logoutButton.addEventListener("click", async () => {
  await api("/api/logout", { method: "POST" }).catch(() => {});
  currentUser = null;
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
if (resetUserFormButton) resetUserFormButton.addEventListener("click", resetAdminUserForm);

if (userForm) {
  userForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!userForm.reportValidity()) return;
    const id = document.querySelector("#userId").value;
    const payload = getUserFormData();
    if (!id && !payload.password) {
      setBackendStatus(text("passwordRequired"), "error");
      return;
    }
    try {
      await api(id ? `/api/admin-users/${encodeURIComponent(id)}` : "/api/admin-users", {
        method: id ? "PATCH" : "POST",
        body: JSON.stringify(payload),
      });
      resetAdminUserForm();
      await loadAdminUsers();
      setBackendStatus(text("userSaved"));
    } catch (error) {
      setBackendStatus(error.message, "error");
    }
  });
}

if (resetCatalogButton) {
  resetCatalogButton.addEventListener("click", async () => {
    try {
      await loadHotelSettings();
      render();
      setBackendStatus(text("catalogReloaded"));
    } catch (error) {
      setBackendStatus(error.message, "error");
    }
  });
}

if (catalogForm) {
  catalogForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!catalogForm.reportValidity()) return;
    try {
      hotelSettings = readCatalogFromForm();
      const data = await api("/api/hotel-settings", {
        method: "PATCH",
        body: JSON.stringify(hotelSettings),
      });
      hotelSettings = normalizeClientSettings(data.settings);
      renderCatalog();
      syncRoomTypeOptions();
      render();
      setBackendStatus(text("catalogSaved"));
    } catch (error) {
      setBackendStatus(error.message, "error");
    }
  });
}

adminCheckinInput.addEventListener("focus", () => openDatePicker("checkin"));
adminCheckinInput.addEventListener("click", () => openDatePicker("checkin"));
adminCheckoutInput.addEventListener("focus", () => openDatePicker("checkout"));
adminCheckoutInput.addEventListener("click", () => openDatePicker("checkout"));

adminDatePicker.addEventListener("click", (event) => {
  const action = event.target.closest("[data-picker-action]");
  if (action) {
    pickerDate = new Date(pickerDate.getFullYear(), pickerDate.getMonth() + (action.dataset.pickerAction === "next" ? 1 : -1), 1);
    renderDatePicker();
    return;
  }
  const day = event.target.closest("[data-picker-date]");
  if (day) selectPickerDate(day.dataset.pickerDate);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDatePicker();
});

document.addEventListener("click", async (event) => {
  if (adminDatePicker && !adminDatePicker.hidden) {
    const insidePicker = event.target.closest("#adminDatePicker");
    const insideDateInput = event.target.closest("[data-date-field]");
    if (!insidePicker && !insideDateInput) closeDatePicker();
  }

  const addCatalogButton = event.target.closest("[data-catalog-add]");
  if (addCatalogButton) {
    addCatalogItem(addCatalogButton.dataset.catalogAdd);
    return;
  }

  const removeCatalogButton = event.target.closest("[data-catalog-remove]");
  if (removeCatalogButton) {
    const item = removeCatalogButton.closest("[data-catalog-item]");
    if (item) removeCatalogItem(removeCatalogButton.dataset.catalogRemove, item.dataset.id);
    return;
  }

  const button = event.target.closest("button[data-action]");
  if (!button) return;
  if (button.dataset.action === "new-date") {
    openEditor("new");
    document.querySelector("#adminCheckin").value = button.dataset.date;
    document.querySelector("#adminCheckout").value = toIsoDate(addDays(dateOnly(button.dataset.date), 1));
    return;
  }
  if (button.dataset.action === "edit") editReservation(button.dataset.id);
  if (button.dataset.action === "edit-user") editAdminUser(button.dataset.id);
  if (button.dataset.action === "delete-user") {
    try {
      await deleteAdminUser(button.dataset.id);
    } catch (error) {
      setBackendStatus(error.message, "error");
    }
  }
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
  if (parsed.roomType) {
    syncRoomTypeOptions(parsed.roomType);
    document.querySelector("#adminRoomType").value = parsed.roomType;
  }
  if (parsed.totalAmount) document.querySelector("#adminTotalAmount").value = parsed.totalAmount.replace(/[^\d.]/g, "");
  if (parsed.depositAmount) document.querySelector("#adminDepositAmount").value = parsed.depositAmount.replace(/[^\d.]/g, "");
  document.querySelector("#adminSource").value = messageImport.value.toLowerCase().includes("email") ? "Email" : "WhatsApp";
  document.querySelector("#adminNotes").value = parsed.notes;
});

prevMonthButton.addEventListener("click", () => {
  calendarDate = calendarView === "week"
    ? addDays(calendarDate, -7)
    : new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1);
  renderCalendar();
});

nextMonthButton.addEventListener("click", () => {
  calendarDate = calendarView === "week"
    ? addDays(calendarDate, 7)
    : new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1);
  renderCalendar();
});

if (todayMonthButton) {
  todayMonthButton.addEventListener("click", () => {
    calendarDate = new Date();
    renderCalendar();
  });
}

calendarViewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calendarView = button.dataset.calendarView || "week";
    localStorage.setItem("ohCalendarView", calendarView);
    renderCalendar();
  });
});

adminLanguageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calendarLang = button.dataset.calendarLang || "es";
    localStorage.setItem("ohCalendarLang", calendarLang);
    applyStaticTranslations();
    render();
  });
});

applyStaticTranslations();

api("/api/session")
  .then(async (session) => {
    currentUser = session.user;
    await initializeDashboard();
  })
  .catch(() => showLogin());
