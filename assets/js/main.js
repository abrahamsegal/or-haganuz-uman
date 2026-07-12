const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const languageButtons = document.querySelectorAll("[data-lang]");
const translatedNodes = document.querySelectorAll("[data-i18n]");
const galleryFolderButtons = document.querySelectorAll("[data-gallery-filter]");
const gallerySections = document.querySelectorAll("[data-gallery-section]");
const bookingForm = document.querySelector("#bookingForm");
const bookingStatus = document.querySelector("#bookingStatus");
const legacyCaptionKeys = {
  "חדר זוגי מרווח": "caption.room.double",
  "חדר שקט ומואר": "caption.room.bright",
  "מצעים נקיים": "caption.room.linens",
  "פינת עבודה": "caption.room.desk",
  "חדר רחב ונוח": "caption.room.spacious",
  "חדר רחצה": "caption.room.bath",
  "מקלחת מודרנית": "caption.room.shower",
  "כניסה ראשית": "caption.exterior.entrance",
  "חזית הבניין": "caption.exterior.building",
  "שלט המלון": "caption.exterior.sign",
  "כניסה מוארת": "caption.exterior.lit",
  "חדר אוכל": "caption.dining.room",
  "עמדות הגשה": "caption.dining.stations",
  "בופה": "caption.dining.buffet",
  "הגשה מוקפדת": "caption.dining.service",
  "אזור ישיבה": "caption.dining.seating",
  "פרטים בהגשה": "caption.dining.details",
  "ישיבה לקבוצות": "caption.dining.groups",
  "מקווה": "caption.mikveh.main",
  "אזור מים מטופח": "caption.mikveh.water",
  "Área de agua cuidada": "caption.mikveh.water",
  "Well-kept water area": "caption.mikveh.water",
};

const translations = {
  he: {
    "nav.home": "ראשי",
    "nav.gallery": "גלריא",
    "nav.form": "שליחת טופס פנייה",
    "nav.rooms": "חדרים",
    "nav.contact": "צור קשר",
    "cta.reserve": "הזמנה בוואטסאפ",
    "hero.eyebrow": "מלון כשר באומן לכל השנה",
    "hero.title": "מלון בוטיק אור הגנוז באומן כל השנה",
    "hero.copy": "מלון כשר ומודרני באומן, במרחק של כ-3 דקות הליכה מהציון הקדוש של רבי נחמן מברסלב",
    "hero.whatsapp": "שליחת הודעה בוואטסאפ",
    "hero.secondary": "ברוך הבא",
    "facts.minutes": "3 דקות",
    "facts.walk": "הליכה לציון הקדוש",
    "facts.year": "כל השנה",
    "facts.guests": "יחידים, משפחות וקבוצות",
    "welcome.eyebrow": "ברוך הבא",
    "welcome.title": "מלון נקי, שקט ומטופח בלב אומן",
    "welcome.copy": "אור הגנוז מציע אירוח כשר, חדרים מרווחים, שירות נעים ומיקום קרוב במיוחד לציון רבי נחמן, מתאים לאנשים בודדים, למשפחות ולקבוצות המגיעות לאומן במהלך השנה",
    "welcome.form": "שליחת פנייה",
    "welcome.gallery": "צפייה בגלריה",
    "summary.title": "OR HAGANUZ",
    "summary.copy": "מלון בוטיק כשר באומן, פתוח כל השנה, קרוב לציון רבי נחמן מברסלב",
    "summary.note": "Uman's Luxury Hotel · Bilansky 2, Uman",
    "rooms.eyebrow": "חדרים ושירות",
    "rooms.title": "שהות נוחה, מסודרת וקרובה לציון",
    "rooms.copy": "המידע מהאתר הקיים נשמר ומסודר בצורה ברורה יותר עבור הזמנה מהירה מהנייד",
    "dining.eyebrow": "חדר אוכל כשר",
    "dining.title": "שירות מוקפד למשפחות ולקבוצות",
    "cards.room.title": "חדרים מרווחים",
    "cards.room.copy": "חדרים נוחים ונקיים, מתאימים למנוחה לאחר נסיעה ולשהות רגועה באומן",
    "cards.kosher.title": "כשר ומודרני",
    "cards.kosher.copy": "אירוח כשר באווירה מודרנית, נקייה ומכובדת לאורך כל השנה",
    "cards.groups.title": "יחידים, משפחות וקבוצות",
    "cards.groups.copy": "אפשרות לתיאום ישיר לפי תאריכים, זמינות וצרכי האירוח",
    "location.eyebrow": "הציון הקדוש",
    "location.title": "קרוב לציון רבי נחמן מברסלב",
    "location.copy": "המלון נמצא בכתובת Bilansky 2, Uman, במיקום נוח להגעה רגלית לאזור הציון",
    "location.maps": "פתיחה במפות Google",
    "contact.eyebrow": "הזמנות",
    "contact.title": "צור קשר להזמנה או בדיקת זמינות",
    "contact.copy": "ניתן לפנות ישירות בוואטסאפ, בטלפון או באימייל",
    "contact.phone": "טלפון: +972 58 640 4027",
    "contact.phoneLabel": "\u05d8\u05dc\u05e4\u05d5\u05df:",
    "direct.eyebrow": "שירות אישי",
    "direct.title": "הזמנות ופרטים נוספים",
    "direct.copy": "בחרו את הדרך הנוחה לכם ליצירת קשר עם צוות המלון",
    "method.whatsapp.title": "WhatsApp",
    "method.whatsapp.copy": "מענה מהיר להזמנות וזמינות",
    "method.email.title": "Email",
    "method.email.copy": "שליחת בקשה מסודרת",
    "method.instagram.copy": "עדכונים ותמונות מהמלון",
    "method.facebook.copy": "עמוד המלון ברשת",
    "gallery.hero.eyebrow": "גלריא",
    "gallery.hero.title": "מלון אור הגנוז באומן",
    "gallery.hero.copy": "תמונות אמיתיות מהמלון: חדרים, חזית, חדר אוכל, אזורי שירות ומקווה",
    "gallery.hero.stay": "Or Haganuz · Bilansky 2, Uman",
    "gallery.hero.distance": "3 דקות הליכה לציון",
    "gallery.hero.cta": "בדיקת זמינות",
    "gallery.rooms.eyebrow": "חדרים",
    "gallery.rooms.title": "חדרים נקיים ומסודרים לשהייה רגועה",
    "gallery.rooms.copy": "תמונות החדרים מוצגות לפני אזורי השירות כדי שהאורח יראה קודם את חוויית הלינה",
    "gallery.exterior.eyebrow": "חזית המלון",
    "gallery.exterior.copy": "חזית המלון והכניסה הראשית, כפי שמופיעות באתר המקורי",
    "gallery.dining.eyebrow": "חדר אוכל ושירות",
    "gallery.dining.title": "אזורי אירוח מסודרים לקבוצות ולמשפחות",
    "gallery.dining.copy": "תמונות חדר האוכל, עמדות ההגשה ואזורי הישיבה",
    "gallery.mikveh.eyebrow": "מקווה",
    "gallery.mikveh.title": "אזור מים נקי ומטופח בתוך המלון",
    "gallery.mikveh.copy": "תמונות מאזור המקווה והמים כפי שהופיעו בין תמונות האתר",
    "gallery.cta.eyebrow": "הזמנה",
    "gallery.cta.title": "רוצים לבדוק זמינות?",
    "gallery.cta.copy": "שלחו הודעה ישירה ונחזור אליכם עם פרטים על חדרים ותאריכים",
    "gallery.cta.secondary": "פרטי קשר",
    "contactPage.eyebrow": "צור קשר",
    "contactPage.title": "שליחת פנייה למלון אור הגנוז",
    "contactPage.copy": "להזמנה, זמינות או שאלות על אירוח באומן",
    "contactPage.direct": "פנייה ישירה ומהירה",
    "contactPage.boxTitle": "פרטי התקשרות",
    "contactPage.boxCopy": "להזמנה או בדיקת זמינות ניתן לפנות בוואטסאפ או באימייל",
    "caption.room.double": "חדר זוגי מרווח",
    "caption.room.bright": "חדר שקט ומואר",
    "caption.room.linens": "מצעים נקיים",
    "caption.room.desk": "פינת עבודה",
    "caption.room.spacious": "חדר רחב ונוח",
    "caption.room.bath": "חדר רחצה",
    "caption.room.shower": "מקלחת מודרנית",
    "caption.exterior.entrance": "כניסה ראשית",
    "caption.exterior.building": "חזית הבניין",
    "caption.exterior.sign": "שלט המלון",
    "caption.exterior.lit": "כניסה מוארת",
    "caption.dining.room": "חדר אוכל",
    "caption.dining.stations": "עמדות הגשה",
    "caption.dining.buffet": "בופה",
    "caption.dining.service": "הגשה מוקפדת",
    "caption.dining.seating": "אזור ישיבה",
    "caption.dining.details": "פרטים בהגשה",
    "caption.dining.groups": "ישיבה לקבוצות",
    "caption.mikveh.main": "מקווה",
    "caption.mikveh.secondary": "מקווה",
    "caption.mikveh.water": "מקווה",
    "folder.rooms": "חדרים",
    "folder.exterior": "חזית",
    "folder.dining": "חדר אוכל",
    "folder.mikveh": "מקווה",
    "booking.nav": "הזמנות",
    "booking.eyebrow": "הזמנות",
    "booking.title": "בדיקת זמינות",
    "booking.copy": "בחרו תאריכים ושלחו בקשה ישירות בוואטסאפ. נאשר זמינות באופן אישי",
    "booking.checkin": "כניסה",
    "booking.checkout": "יציאה",
    "booking.guests": "אורחים",
    "booking.adults": "מבוגרים",
    "booking.children": "ילדים",
    "booking.roomCount": "חדרים",
    "booking.roomType": "תפוסה בחדר",
    "booking.guestName": "שם",
    "booking.guestPhone": "וואטסאפ / טלפון",
    "booking.guestEmail": "אימייל אופציונלי",
    "booking.single": "אדם אחד - $75 ללילה",
    "booking.double": "2 אנשים - $89 ללילה",
    "booking.triple": "3 אנשים - $120 ללילה",
    "booking.quad": "4 אנשים - $140 ללילה",
    "booking.family": "משפחה / קבוצה",
    "booking.quoteEyebrow": "מחירון",
    "booking.quoteTitle": "מחיר משוער",
    "booking.adultBreakfast": "ארוחת בוקר מבוגרים $25 לאדם ליום",
    "booking.adultDinner": "ארוחת ערב מבוגרים $35 לאדם ליום",
    "booking.adultShabbat": "חבילת שבת מבוגרים $160 לאדם",
    "booking.childParentRoom": "ילדים בחדר הורים $15 לילד ללילה",
    "booking.childBreakfast": "ארוחת בוקר ילדים $12 לילד ליום",
    "booking.childDinner": "ארוחת ערב ילדים $18 לילד ליום",
    "booking.childShabbat": "חבילת שבת ילדים $70 לילד",
    "booking.quoteHint": "בחרו תאריכים לחישוב.",
    "booking.notes": "הערות",
    "booking.notesPlaceholder": "תאריכים מיוחדים, קבוצה, ארוחות וכו'",
    "booking.submit": "שליחת הזמנה",
    "booking.whatsappQuote": "שליחת הצעת מחיר בוואטסאפ",
    "booking.emailSubmit": "שליחה באימייל",
    "booking.termsPrefix": "אני מאשר/ת את",
    "booking.termsLink": "התנאים וההגבלות",
    "booking.termsSuffix": ".",
    "booking.termsCopy": "הבקשה כפופה לזמינות, לתשלום כאשר נדרש, ולאישור כתוב מהמלון.",
    "booking.dateRequired": "בחרו תאריך כניסה ותאריך יציאה.",
    "booking.summaryTitle": "הזמנה ישירה",
    "booking.summaryCopy": "הטופס אינו מחייב תשלום ואינו מאשר אוטומטית. הוא שולח בקשה ברורה למלון לאישור זמינות ומחיר",
    "booking.point1": "מענה ישיר בוואטסאפ",
    "booking.point2": "מתאים למשפחות וקבוצות",
    "booking.point3": "מיקום: Bilansky 2, Uman",
    "booking.saved": "הבקשה נרשמה. נחזור אליך לאישור סופי.",
    "booking.apiError": "לא ניתן לשמור כרגע במערכת. אפשר לשלוח בוואטסאפ או באימייל.",
  },
  es: {
    "nav.home": "Inicio",
    "nav.gallery": "Galería",
    "nav.form": "Contacto",
    "nav.rooms": "Habitaciones",
    "nav.contact": "Contacto",
    "cta.reserve": "Reservar por WhatsApp",
    "hero.eyebrow": "Hotel kosher en Uman todo el año",
    "hero.title": "Hotel Boutique Or Haganuz en Uman",
    "hero.copy": "Hotel kosher y moderno en Uman, a unos 3 minutos caminando del Tziyun de Rabi Najman de Breslov.",
    "hero.whatsapp": "Enviar WhatsApp",
    "hero.secondary": "Bienvenido",
    "facts.minutes": "3 minutos",
    "facts.walk": "Caminando al Tziyun",
    "facts.year": "Todo el año",
    "facts.guests": "Solos, familias y grupos",
    "welcome.eyebrow": "Bienvenido",
    "welcome.title": "Un hotel limpio, tranquilo y cuidado en Uman.",
    "welcome.copy": "Or Haganuz ofrece hospedaje kosher, habitaciones amplias, servicio atento y una ubicación muy cercana al Tziyun. Es ideal para viajeros solos, familias y grupos durante todo el año.",
    "welcome.form": "Enviar consulta",
    "welcome.gallery": "Ver galería",
    "summary.title": "Hotel Or Haganuz Uman",
    "summary.copy": "Hotel boutique kosher en Uman, abierto todo el año, cerca del Tziyun de Rabi Najman de Breslov.",
    "summary.note": "Habitaciones cómodas para viajeros, familias y grupos.",
    "rooms.eyebrow": "Habitaciones y servicio",
    "rooms.title": "Una estadía cómoda, ordenada y cerca del Tziyun.",
    "rooms.copy": "La información del sitio actual se conserva y se organiza para reservar más rápido desde el celular.",
    "dining.eyebrow": "Comedor kosher",
    "dining.title": "Servicio cuidado para familias y grupos",
    "cards.room.title": "Habitaciones amplias",
    "cards.room.copy": "Habitaciones cómodas y limpias para descansar después del viaje y disfrutar una estadía tranquila.",
    "cards.kosher.title": "Kosher y moderno",
    "cards.kosher.copy": "Hospedaje kosher en un ambiente moderno, limpio y respetuoso durante todo el año.",
    "cards.groups.title": "Solos, familias y grupos",
    "cards.groups.copy": "Coordinación directa según fechas, disponibilidad y necesidades de hospedaje.",
    "location.eyebrow": "Ubicación",
    "location.title": "Cerca del Tziyun de Rabi Najman.",
    "location.copy": "El hotel está en Bilansky 2, Uman, en una ubicación cómoda para caminar al área del Tziyun.",
    "location.maps": "Abrir en Google Maps",
    "contact.eyebrow": "Reservas",
    "contact.title": "Consulta disponibilidad o reserva.",
    "contact.copy": "Puedes escribir directamente por WhatsApp, llamar o enviar email.",
    "contact.phone": "Teléfono: +972 58 640 4027",
    "contact.phoneLabel": "Tel\u00e9fono:",
    "direct.eyebrow": "Atención personal",
    "direct.title": "Reservas e información",
    "direct.copy": "Elige el canal que prefieras para hablar con el equipo del hotel.",
    "method.whatsapp.title": "WhatsApp",
    "method.whatsapp.copy": "Respuesta rápida para disponibilidad y reservas",
    "method.email.title": "Email",
    "method.email.copy": "Envía una solicitud detallada",
    "method.instagram.copy": "Fotos y novedades del hotel",
    "method.facebook.copy": "Página oficial del hotel",
    "gallery.hero.eyebrow": "Galería",
    "gallery.hero.title": "Hotel Or Haganuz Uman",
    "gallery.hero.copy": "Fotos reales del hotel: habitaciones, fachada, comedor, áreas de servicio y mikve.",
    "gallery.hero.stay": "Or Haganuz · Bilansky 2, Uman",
    "gallery.hero.distance": "A 3 minutos caminando del Tziyun",
    "gallery.hero.cta": "Consultar disponibilidad",
    "gallery.rooms.eyebrow": "Habitaciones",
    "gallery.rooms.title": "Habitaciones limpias y ordenadas para descansar.",
    "gallery.rooms.copy": "Primero mostramos las habitaciones para que el huésped vea la experiencia de alojamiento.",
    "gallery.exterior.eyebrow": "Fachada",
    "gallery.exterior.copy": "La fachada y entrada principal del hotel, tomadas del sitio original.",
    "gallery.dining.eyebrow": "Comedor y servicio",
    "gallery.dining.title": "Áreas preparadas para familias y grupos.",
    "gallery.dining.copy": "Fotos del comedor, estaciones de servicio y áreas de mesa.",
    "gallery.mikveh.eyebrow": "Mikve",
    "gallery.mikveh.title": "Área de agua limpia y cuidada dentro del hotel.",
    "gallery.mikveh.copy": "Fotos del área de mikve/agua incluidas en la galería del sitio.",
    "gallery.cta.eyebrow": "Reservas",
    "gallery.cta.title": "Consulta disponibilidad",
    "gallery.cta.copy": "Envía un mensaje directo y te responderemos con detalles de habitaciones y fechas.",
    "gallery.cta.secondary": "Ver contacto",
    "contactPage.eyebrow": "Contacto",
    "contactPage.title": "Consulta para Hotel Or Haganuz",
    "contactPage.copy": "Para reservas, disponibilidad o preguntas sobre hospedaje en Uman.",
    "contactPage.direct": "Contacto rápido y directo",
    "contactPage.boxTitle": "Contacto en español",
    "contactPage.boxCopy": "Para reservar o consultar disponibilidad, escribe por WhatsApp o email.",
    "caption.room.double": "Habitación doble amplia",
    "caption.room.bright": "Habitación tranquila y luminosa",
    "caption.room.linens": "Ropa de cama limpia",
    "caption.room.desk": "Área de trabajo",
    "caption.room.spacious": "Habitación amplia y cómoda",
    "caption.room.bath": "Baño",
    "caption.room.shower": "Ducha moderna",
    "caption.exterior.entrance": "Entrada principal",
    "caption.exterior.building": "Fachada del edificio",
    "caption.exterior.sign": "Letrero del hotel",
    "caption.exterior.lit": "Entrada iluminada",
    "caption.dining.room": "Comedor",
    "caption.dining.stations": "Estaciones de servicio",
    "caption.dining.buffet": "Buffet",
    "caption.dining.service": "Presentación cuidada",
    "caption.dining.seating": "Área de mesas",
    "caption.dining.details": "Detalles de servicio",
    "caption.dining.groups": "Mesas para grupos",
    "caption.mikveh.main": "Mikve",
    "caption.mikveh.secondary": "Mikve",
    "caption.mikveh.water": "Mikve",
    "folder.rooms": "Habitaciones",
    "folder.exterior": "Fachada",
    "folder.dining": "Comedor",
    "folder.mikveh": "Mikve",
    "booking.nav": "Reservas",
    "booking.eyebrow": "Reservas",
    "booking.title": "Consulta disponibilidad",
    "booking.copy": "Elige fechas y envía la solicitud directo por WhatsApp. Confirmamos disponibilidad personalmente.",
    "booking.checkin": "Entrada",
    "booking.checkout": "Salida",
    "booking.guests": "Huéspedes",
    "booking.adults": "Adultos",
    "booking.children": "Niños",
    "booking.roomCount": "Cuartos",
    "booking.roomType": "Ocupación por cuarto",
    "booking.guestName": "Nombre",
    "booking.guestPhone": "WhatsApp / telefono",
    "booking.guestEmail": "Email opcional",
    "booking.single": "1 persona - $75/noche",
    "booking.double": "2 personas - $89/noche",
    "booking.triple": "3 personas - $120/noche",
    "booking.quad": "4 personas - $140/noche",
    "booking.family": "Familia / grupo",
    "booking.quoteEyebrow": "Cotización",
    "booking.quoteTitle": "Precio estimado",
    "booking.adultBreakfast": "Desayuno adultos $25 p/p por día",
    "booking.adultDinner": "Cena adultos $35 p/p por día",
    "booking.adultShabbat": "Paquete Shabat adultos $160 p/p",
    "booking.childParentRoom": "Niños en cuarto de padres $15 p/noche",
    "booking.childBreakfast": "Desayuno niños $12 p/p por día",
    "booking.childDinner": "Cena niños $18 p/p por día",
    "booking.childShabbat": "Paquete Shabat niños $70 p/p",
    "booking.quoteHint": "Selecciona fechas para calcular.",
    "booking.notes": "Notas",
    "booking.notesPlaceholder": "Fechas especiales, grupo, comidas, etc.",
    "booking.submit": "Reservar directo",
    "booking.whatsappQuote": "Enviar cotización por WhatsApp",
    "booking.emailSubmit": "Enviar por email",
    "booking.termsPrefix": "Acepto los",
    "booking.termsLink": "Términos y Condiciones",
    "booking.termsSuffix": ".",
    "booking.termsCopy": "La solicitud queda sujeta a disponibilidad, pago cuando aplique y confirmación escrita del hotel.",
    "booking.dateRequired": "Selecciona fecha de entrada y salida.",
    "booking.summaryTitle": "Reserva directa",
    "booking.summaryCopy": "Este formulario no cobra ni confirma automáticamente. Envía una solicitud clara al hotel para confirmar disponibilidad y precio.",
    "booking.point1": "Respuesta directa por WhatsApp",
    "booking.point2": "Ideal para familias y grupos",
    "booking.point3": "Ubicación: Bilansky 2, Uman",
    "booking.saved": "Solicitud registrada. Te contactaremos para la confirmacion final.",
    "booking.apiError": "No se pudo guardar en el sistema ahora. Puedes enviar la solicitud por WhatsApp o email.",
  },
  en: {
    "nav.home": "Home",
    "nav.gallery": "Gallery",
    "nav.form": "Contact",
    "nav.rooms": "Rooms",
    "nav.contact": "Contact",
    "cta.reserve": "Book on WhatsApp",
    "hero.eyebrow": "Kosher hotel in Uman year-round",
    "hero.title": "Or Haganuz Boutique Hotel in Uman",
    "hero.copy": "A modern kosher hotel in Uman, about a 3-minute walk from Rabbi Nachman of Breslov's Tziyun.",
    "hero.whatsapp": "Send WhatsApp",
    "hero.secondary": "Welcome",
    "facts.minutes": "3 minutes",
    "facts.walk": "Walk to the Tziyun",
    "facts.year": "Year-round",
    "facts.guests": "Singles, families and groups",
    "welcome.eyebrow": "Welcome",
    "welcome.title": "A clean, quiet and well-kept hotel in Uman.",
    "welcome.copy": "Or Haganuz offers kosher hospitality, spacious rooms, attentive service and a location very close to the Tziyun. Suitable for solo travelers, families and groups throughout the year.",
    "welcome.form": "Send inquiry",
    "welcome.gallery": "View gallery",
    "summary.title": "Hotel Or Haganuz Uman",
    "summary.copy": "Kosher boutique hotel in Uman, open year-round, near Rabbi Nachman of Breslov's Tziyun.",
    "summary.note": "Comfortable rooms for travelers, families and groups.",
    "rooms.eyebrow": "Rooms and service",
    "rooms.title": "A comfortable, organized stay near the Tziyun.",
    "rooms.copy": "The current site's information is preserved and organized for faster mobile booking.",
    "dining.eyebrow": "Kosher dining",
    "dining.title": "Careful service for families and groups",
    "cards.room.title": "Spacious rooms",
    "cards.room.copy": "Clean, comfortable rooms for resting after travel and enjoying a calm stay in Uman.",
    "cards.kosher.title": "Kosher and modern",
    "cards.kosher.copy": "Kosher hospitality in a modern, clean and respectful environment year-round.",
    "cards.groups.title": "Singles, families and groups",
    "cards.groups.copy": "Direct coordination according to dates, availability and hosting needs.",
    "location.eyebrow": "Location",
    "location.title": "Close to Rabbi Nachman's Tziyun.",
    "location.copy": "The hotel is located at Bilansky 2, Uman, convenient for walking to the Tziyun area.",
    "location.maps": "Open in Google Maps",
    "contact.eyebrow": "Bookings",
    "contact.title": "Check availability or book.",
    "contact.copy": "You can contact us directly by WhatsApp, phone or email.",
    "contact.phone": "Phone: +972 58 640 4027",
    "contact.phoneLabel": "Phone:",
    "direct.eyebrow": "Personal service",
    "direct.title": "Bookings and information",
    "direct.copy": "Choose the channel you prefer to speak with the hotel team.",
    "method.whatsapp.title": "WhatsApp",
    "method.whatsapp.copy": "Fast replies for availability and reservations",
    "method.email.title": "Email",
    "method.email.copy": "Send a detailed request",
    "method.instagram.copy": "Hotel photos and updates",
    "method.facebook.copy": "Official hotel page",
    "gallery.hero.eyebrow": "Gallery",
    "gallery.hero.title": "Hotel Or Haganuz Uman",
    "gallery.hero.copy": "Real hotel photos: rooms, facade, dining room, service areas and mikveh.",
    "gallery.hero.stay": "Or Haganuz · Bilansky 2, Uman",
    "gallery.hero.distance": "3-minute walk to the Tziyun",
    "gallery.hero.cta": "Check availability",
    "gallery.rooms.eyebrow": "Rooms",
    "gallery.rooms.title": "Clean, organized rooms for a calm stay.",
    "gallery.rooms.copy": "Rooms are shown first so guests can immediately see the accommodation experience.",
    "gallery.exterior.eyebrow": "Facade",
    "gallery.exterior.copy": "The hotel facade and main entrance, taken from the original site.",
    "gallery.dining.eyebrow": "Dining and service",
    "gallery.dining.title": "Guest areas prepared for families and groups.",
    "gallery.dining.copy": "Photos of the dining room, serving stations and seating areas.",
    "gallery.mikveh.eyebrow": "Mikveh",
    "gallery.mikveh.title": "A clean, well-kept water area inside the hotel.",
    "gallery.mikveh.copy": "Photos from the mikveh/water area included in the site gallery.",
    "gallery.cta.eyebrow": "Bookings",
    "gallery.cta.title": "Check availability",
    "gallery.cta.copy": "Send a direct message and we will reply with room and date details.",
    "gallery.cta.secondary": "Contact details",
    "contactPage.eyebrow": "Contact",
    "contactPage.title": "Inquiry for Hotel Or Haganuz",
    "contactPage.copy": "For bookings, availability or questions about staying in Uman.",
    "contactPage.direct": "Fast direct contact",
    "contactPage.boxTitle": "Contact details",
    "contactPage.boxCopy": "For reservations or availability, contact us by WhatsApp or email.",
    "caption.room.double": "Spacious double room",
    "caption.room.bright": "Quiet bright room",
    "caption.room.linens": "Clean linens",
    "caption.room.desk": "Work area",
    "caption.room.spacious": "Large comfortable room",
    "caption.room.bath": "Bathroom",
    "caption.room.shower": "Modern shower",
    "caption.exterior.entrance": "Main entrance",
    "caption.exterior.building": "Building facade",
    "caption.exterior.sign": "Hotel sign",
    "caption.exterior.lit": "Lit entrance",
    "caption.dining.room": "Dining room",
    "caption.dining.stations": "Serving stations",
    "caption.dining.buffet": "Buffet",
    "caption.dining.service": "Careful presentation",
    "caption.dining.seating": "Seating area",
    "caption.dining.details": "Service details",
    "caption.dining.groups": "Group seating",
    "caption.mikveh.main": "Mikveh",
    "caption.mikveh.secondary": "Mikveh",
    "caption.mikveh.water": "Mikveh",
    "folder.rooms": "Rooms",
    "folder.exterior": "Facade",
    "folder.dining": "Dining",
    "folder.mikveh": "Mikveh",
    "booking.nav": "Bookings",
    "booking.eyebrow": "Bookings",
    "booking.title": "Check availability",
    "booking.copy": "Choose dates and send the request directly by WhatsApp. We confirm availability personally.",
    "booking.checkin": "Check-in",
    "booking.checkout": "Check-out",
    "booking.guests": "Guests",
    "booking.adults": "Adults",
    "booking.children": "Children",
    "booking.roomCount": "Rooms",
    "booking.roomType": "Occupancy per room",
    "booking.guestName": "Name",
    "booking.guestPhone": "WhatsApp / phone",
    "booking.guestEmail": "Optional email",
    "booking.single": "1 guest - $75/night",
    "booking.double": "2 guests - $89/night",
    "booking.triple": "3 guests - $120/night",
    "booking.quad": "4 guests - $140/night",
    "booking.family": "Family / group",
    "booking.quoteEyebrow": "Quote",
    "booking.quoteTitle": "Estimated price",
    "booking.adultBreakfast": "Adult breakfast $25 p/p per day",
    "booking.adultDinner": "Adult dinner $35 p/p per day",
    "booking.adultShabbat": "Adult Shabbat package $160 p/p",
    "booking.childParentRoom": "Children in parents room $15 per night",
    "booking.childBreakfast": "Child breakfast $12 p/p per day",
    "booking.childDinner": "Child dinner $18 p/p per day",
    "booking.childShabbat": "Child Shabbat package $70 p/p",
    "booking.quoteHint": "Select dates to calculate.",
    "booking.notes": "Notes",
    "booking.notesPlaceholder": "Special dates, group, meals, etc.",
    "booking.submit": "Book directly",
    "booking.whatsappQuote": "Send quote by WhatsApp",
    "booking.emailSubmit": "Send by email",
    "booking.termsPrefix": "I accept the",
    "booking.termsLink": "Terms and Conditions",
    "booking.termsSuffix": ".",
    "booking.termsCopy": "The request is subject to availability, payment when applicable, and written confirmation from the hotel.",
    "booking.dateRequired": "Select check-in and check-out dates.",
    "booking.summaryTitle": "Direct booking",
    "booking.summaryCopy": "This form does not charge or confirm automatically. It sends a clear request to the hotel to confirm availability and price.",
    "booking.point1": "Direct WhatsApp reply",
    "booking.point2": "Ideal for families and groups",
    "booking.point3": "Location: Bilansky 2, Uman",
    "booking.saved": "Request registered. We will contact you for final confirmation.",
    "booking.apiError": "We could not save it in the system right now. You can send the request by WhatsApp or email.",
  },
};

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

function setLanguage(lang) {
  const dictionary = translations[lang] || translations.he;
  const isHebrew = lang === "he";

  document.documentElement.lang = lang;
  document.documentElement.dir = isHebrew ? "rtl" : "ltr";
  document.body.dir = isHebrew ? "rtl" : "ltr";

  translatedNodes.forEach((node) => {
    const key = node.dataset.i18n;
    if (dictionary[key]) node.textContent = dictionary[key];
  });

  document.querySelectorAll("figcaption").forEach((caption) => {
    const key = caption.dataset.i18n || legacyCaptionKeys[caption.textContent.trim()];
    if (key && dictionary[key]) {
      caption.dataset.i18n = key;
      caption.textContent = dictionary[key];
    }
  });

  document.querySelectorAll(".translation-box").forEach((box) => {
    box.dir = isHebrew ? "rtl" : "ltr";
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.dataset.i18nPlaceholder;
    if (dictionary[key]) node.placeholder = dictionary[key];
  });

  languageButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === lang);
  });

  localStorage.setItem("orHaganuzLang", lang);
  if (window.refreshBookingCalendar) window.refreshBookingCalendar();
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

galleryFolderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.galleryFilter;
    galleryFolderButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    gallerySections.forEach((section) => {
      section.classList.toggle("is-active", section.dataset.gallerySection === selected);
    });
  });
});

if (bookingForm) {
  const checkin = bookingForm.querySelector("#checkin");
  const checkout = bookingForm.querySelector("#checkout");
  const emailButton = bookingForm.querySelector("#bookingEmail");
  const whatsappQuoteButton = bookingForm.querySelector("#bookingWhatsApp");
  const roomTypeSelect = bookingForm.querySelector("#roomType");
  const bookingQuote = bookingForm.querySelector("#bookingQuote");
  const dateTrigger = bookingForm.querySelector("#bookingDateTrigger");
  const checkinText = bookingForm.querySelector("#bookingCheckinText");
  const checkoutText = bookingForm.querySelector("#bookingCheckoutText");
  const bookingPicker = bookingForm.querySelector("#bookingInlineCalendar");
  const today = new Date().toISOString().slice(0, 10);
  const pricing = {
    lodging: { single: 75, double: 89, triple: 120, quad: 140 },
    adultBreakfast: 25,
    adultDinner: 35,
    adultShabbat: 160,
    childParentRoom: 15,
    childBreakfast: 12,
    childDinner: 18,
    childShabbat: 70,
  };
  let bookingPickerTarget = checkin;
  let bookingPickerDate = new Date();

  function dateOnly(value) {
    const [year, month, day] = String(value || today).split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function toIsoDate(date) {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  }

  function addDays(date, days) {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
  }

  function calendarLocale() {
    const lang = localStorage.getItem("orHaganuzLang") || "he";
    if (lang === "he") return "he-IL";
    if (lang === "en") return "en-US";
    return "es-ES";
  }

  function hebrewDayNumber(number) {
    const units = ["", "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט"];
    const tens = ["", "י", "כ", "ל"];
    if (number === 15) return "טו";
    if (number === 16) return "טז";
    return `${tens[Math.floor(number / 10)] || ""}${units[number % 10] || ""}`;
  }

  function hebrewDateLabel(date) {
    const parts = new Intl.DateTimeFormat("he-IL-u-ca-hebrew", { day: "numeric", month: "long" }).formatToParts(date);
    const day = Number(parts.find((part) => part.type === "day")?.value || 0);
    const month = parts.find((part) => part.type === "month")?.value || "";
    return `${hebrewDayNumber(day)} ${month}`.trim();
  }

  function formatShortDate(value) {
    if (!value) {
      const lang = localStorage.getItem("orHaganuzLang") || "he";
      return lang === "en" ? "Select" : lang === "he" ? "בחרו" : "Seleccionar";
    }
    return new Intl.DateTimeFormat(calendarLocale(), { day: "numeric", month: "short" }).format(dateOnly(value));
  }

  function updateDateTrigger() {
    if (checkinText) checkinText.textContent = formatShortDate(checkin.value);
    if (checkoutText) checkoutText.textContent = formatShortDate(checkout.value);
  }

  function nightsCount() {
    if (!checkin.value || !checkout.value || checkout.value <= checkin.value) return 0;
    return Math.max(0, Math.round((dateOnly(checkout.value) - dateOnly(checkin.value)) / 86400000));
  }

  function money(amount) {
    return `$${Number(amount || 0).toLocaleString("en-US")}`;
  }

  function roomTypeLabel(value) {
    const labels = {
      single: "1 persona por cuarto",
      double: "2 personas por cuarto",
      triple: "3 personas por cuarto",
      quad: "4 personas por cuarto",
    };
    return labels[value] || value || "-";
  }

  function getQuote() {
    const data = new FormData(bookingForm);
    const nights = nightsCount();
    const rooms = Math.min(24, Math.max(1, Number(data.get("roomCount") || 1)));
    const adults = Math.max(1, Number(data.get("guests") || 1));
    const children = Math.max(0, Number(data.get("children") || 0));
    const plan = data.get("roomType") || "double";
    const roomRate = pricing.lodging[plan] || pricing.lodging.double;
    const lines = [];
    let total = 0;

    const lodging = nights * rooms * roomRate;
    if (lodging) {
      total += lodging;
      lines.push(`Hospedaje: ${rooms} cuarto(s) x ${nights} noche(s) x ${money(roomRate)} = ${money(lodging)}`);
    }
    if (children && data.get("childParentRoom") === "on" && nights) {
      const amount = children * nights * pricing.childParentRoom;
      total += amount;
      lines.push(`Niños en cuarto de padres: ${children} x ${nights} x ${money(pricing.childParentRoom)} = ${money(amount)}`);
    }
    if (data.get("adultBreakfast") === "on" && nights) {
      const amount = adults * nights * pricing.adultBreakfast;
      total += amount;
      lines.push(`Desayuno adultos: ${adults} x ${nights} x ${money(pricing.adultBreakfast)} = ${money(amount)}`);
    }
    if (data.get("adultDinner") === "on" && nights) {
      const amount = adults * nights * pricing.adultDinner;
      total += amount;
      lines.push(`Cena adultos: ${adults} x ${nights} x ${money(pricing.adultDinner)} = ${money(amount)}`);
    }
    if (data.get("adultShabbat") === "on") {
      const amount = adults * pricing.adultShabbat;
      total += amount;
      lines.push(`Paquete Shabat adultos: ${adults} x ${money(pricing.adultShabbat)} = ${money(amount)}`);
    }
    if (children && data.get("childBreakfast") === "on" && nights) {
      const amount = children * nights * pricing.childBreakfast;
      total += amount;
      lines.push(`Desayuno niños: ${children} x ${nights} x ${money(pricing.childBreakfast)} = ${money(amount)}`);
    }
    if (children && data.get("childDinner") === "on" && nights) {
      const amount = children * nights * pricing.childDinner;
      total += amount;
      lines.push(`Cena niños: ${children} x ${nights} x ${money(pricing.childDinner)} = ${money(amount)}`);
    }
    if (children && data.get("childShabbat") === "on") {
      const amount = children * pricing.childShabbat;
      total += amount;
      lines.push(`Paquete Shabat niños: ${children} x ${money(pricing.childShabbat)} = ${money(amount)}`);
    }

    return { total, nights, rooms, adults, children, plan, roomRate, lines };
  }

  function updateQuote() {
    if (!bookingQuote) return;
    const quote = getQuote();
    const hint = quote.nights
      ? `${quote.rooms} cuarto(s), ${quote.adults} adulto(s), ${quote.children} niño(s). ${roomTypeLabel(quote.plan)}.`
      : "Selecciona fechas para calcular.";
    bookingQuote.innerHTML = `
      <strong>${money(quote.total)}</strong>
      <span>${hint}</span>
      ${quote.lines.length ? `<ul>${quote.lines.map((line) => `<li>${line}</li>`).join("")}</ul>` : ""}
      <em>Estimado sujeto a disponibilidad y confirmación del hotel.</em>
    `;
  }

  function renderBookingPicker() {
    const locale = calendarLocale();
    const monthStart = new Date(bookingPickerDate.getFullYear(), bookingPickerDate.getMonth(), 1);
    const firstOffset = (monthStart.getDay() + 6) % 7;
    const gridStart = addDays(monthStart, -firstOffset);
    const minDate = bookingPickerTarget === checkout && checkin.value ? addDays(dateOnly(checkin.value), 1) : dateOnly(today);
    const monthTitle = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(monthStart);
    const weekdays = Array.from({ length: 7 }, (_, index) => {
      const sample = addDays(new Date(2026, 0, 5), index);
      return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(sample);
    });
    const cells = Array.from({ length: 42 }, (_, index) => {
      const date = addDays(gridStart, index);
      const iso = toIsoDate(date);
      const disabled = date < minDate;
      const isCheckin = iso === checkin.value;
      const isCheckout = iso === checkout.value;
      const inRange = checkin.value && checkout.value && iso > checkin.value && iso < checkout.value;
      const muted = date.getMonth() !== monthStart.getMonth();
      return `<button type="button" class="${isCheckin || isCheckout ? "is-selected" : ""} ${inRange ? "is-range" : ""} ${muted ? "is-muted" : ""}" data-booking-date="${iso}" ${disabled ? "disabled" : ""}>
        <span>${date.getDate()}</span>
        <small>${hebrewDateLabel(date)}</small>
      </button>`;
    }).join("");

    bookingPicker.innerHTML = `
      <div class="booking-date-picker-head">
        <button type="button" data-booking-month="-1">‹</button>
        <strong>${monthTitle}</strong>
        <button type="button" data-booking-month="1">›</button>
      </div>
      <div class="booking-date-range">
        <button type="button" class="${bookingPickerTarget === checkin ? "is-active" : ""}" data-range-target="checkin">
          <small>Entrada</small>
          <strong>${checkin.value || "--"}</strong>
        </button>
        <button type="button" class="${bookingPickerTarget === checkout ? "is-active" : ""}" data-range-target="checkout">
          <small>Salida</small>
          <strong>${checkout.value || "--"}</strong>
        </button>
      </div>
      <div class="booking-date-weekdays">${weekdays.map((day) => `<span>${day}</span>`).join("")}</div>
      <div class="booking-date-grid">${cells}</div>
      <button class="booking-date-done" type="button" data-booking-done>Listo</button>
    `;
    updateDateTrigger();
    updateQuote();
  }

  function shiftBookingMonth(delta) {
    bookingPickerDate = new Date(bookingPickerDate.getFullYear(), bookingPickerDate.getMonth() + delta, 1);
    renderBookingPicker();
  }

  function openBookingPicker(input = bookingPickerTarget) {
    bookingPickerTarget = input;
    bookingPickerDate = input.value ? dateOnly(input.value) : new Date();
    bookingPicker.hidden = false;
    if (dateTrigger) dateTrigger.setAttribute("aria-expanded", "true");
    renderBookingPicker();
  }

  function closeBookingPicker() {
    bookingPicker.hidden = true;
    if (dateTrigger) dateTrigger.setAttribute("aria-expanded", "false");
  }

  if (dateTrigger) {
    dateTrigger.addEventListener("click", () => {
      if (bookingPicker.hidden) openBookingPicker(bookingPickerTarget);
      else closeBookingPicker();
    });
  }

  bookingForm.querySelectorAll("[data-range-target]").forEach((button) => {
    button.addEventListener("click", () => {
      bookingPickerTarget = button.dataset.rangeTarget === "checkout" ? checkout : checkin;
      renderBookingPicker();
    });
  });

  bookingPicker.addEventListener("click", (event) => {
    if (event.target.closest("[data-booking-done]")) {
      closeBookingPicker();
      return;
    }
    const monthButton = event.target.closest("[data-booking-month]");
    if (monthButton) {
      shiftBookingMonth(Number(monthButton.dataset.bookingMonth));
      return;
    }
    const rangeButton = event.target.closest("[data-range-target]");
    if (rangeButton) {
      bookingPickerTarget = rangeButton.dataset.rangeTarget === "checkout" ? checkout : checkin;
      renderBookingPicker();
      return;
    }
    const dateButton = event.target.closest("[data-booking-date]");
    if (!dateButton || dateButton.disabled) return;
    bookingPickerTarget.value = dateButton.dataset.bookingDate;
    if (bookingPickerTarget === checkin && (!checkout.value || checkout.value <= checkin.value)) {
      checkout.value = toIsoDate(addDays(dateOnly(checkin.value), 1));
      bookingPickerTarget = checkout;
    } else if (bookingPickerTarget === checkout) {
      bookingPickerTarget = checkin;
      closeBookingPicker();
    }
    renderBookingPicker();
  });

  bookingPicker.addEventListener("pointerdown", (event) => {
    const monthButton = event.target.closest("[data-booking-month]");
    if (!monthButton) return;
    event.preventDefault();
    event.stopPropagation();
    shiftBookingMonth(Number(monthButton.dataset.bookingMonth));
  });

  document.addEventListener("click", (event) => {
    if (bookingPicker.hidden) return;
    if (bookingPicker.contains(event.target) || dateTrigger?.contains(event.target)) return;
    closeBookingPicker();
  });

  window.refreshBookingCalendar = () => {
    updateDateTrigger();
    if (!bookingPicker.hidden) renderBookingPicker();
    updateQuote();
  };
  updateDateTrigger();
  updateQuote();

  async function loadBookingCatalog() {
    if (!roomTypeSelect || roomTypeSelect.dataset.fixedPricing === "true") return;
    try {
      const response = await fetch("/api/hotel-settings");
      if (!response.ok) return;
      const data = await response.json();
      const rooms = (data.settings?.rooms || []).filter((room) => room.active !== false && room.name);
      if (!rooms.length) return;
      roomTypeSelect.replaceChildren(...rooms.map((room) => new Option(room.name, room.name)));
    } catch {
      // Keep the static fallback options when the API is not available.
    }
  }

  loadBookingCatalog();

  function buildBookingMessage() {
    const data = new FormData(bookingForm);
    const quote = getQuote();
    return [
      "Hola, quiero consultar disponibilidad en Hotel Or Haganuz Uman.",
      `Nombre: ${data.get("guestName")}`,
      `WhatsApp / telefono: ${data.get("guestPhone")}`,
      `Email: ${data.get("guestEmail") || "-"}`,
      `Entrada: ${data.get("checkin")}`,
      `Salida: ${data.get("checkout")}`,
      `Noches: ${quote.nights}`,
      `Cuartos: ${quote.rooms}`,
      `Adultos: ${quote.adults}`,
      `Niños: ${quote.children}`,
      `Tarifa: ${roomTypeLabel(quote.plan)} (${money(quote.roomRate)} por cuarto/noche)`,
      `Total estimado: ${money(quote.total)}`,
      quote.lines.length ? `Detalle:\n${quote.lines.join("\n")}` : "Detalle: pendiente de fechas",
      `Notas: ${data.get("notes") || "-"}`,
      "Terminos y condiciones: aceptados"
    ].join("\n");
  }

  function buildBookingPayload() {
    const data = new FormData(bookingForm);
    const quote = getQuote();
    return {
      guestName: data.get("guestName"),
      guestPhone: data.get("guestPhone"),
      guestEmail: data.get("guestEmail"),
      checkin: data.get("checkin"),
      checkout: data.get("checkout"),
      guests: quote.adults + quote.children,
      roomType: `${quote.rooms} cuarto(s) - ${roomTypeLabel(quote.plan)}`,
      totalAmount: quote.total,
      currency: "USD",
      notes: [
        data.get("notes"),
        `Cotización estimada: ${money(quote.total)}`,
        ...quote.lines,
      ].filter(Boolean).join("\n"),
      termsAccepted: data.get("termsAccept") === "on",
    };
  }

  function showBookingStatus(message, type = "success") {
    if (!bookingStatus) return;
    bookingStatus.textContent = message;
    bookingStatus.dataset.type = type;
    bookingStatus.hidden = false;
  }

  bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!checkin.value || !checkout.value) {
      const dictionary = translations[localStorage.getItem("orHaganuzLang") || "he"] || translations.he;
      openBookingPicker(!checkin.value ? checkin : checkout);
      showBookingStatus(dictionary["booking.dateRequired"], "error");
      return;
    }
    if (!bookingForm.reportValidity()) return;
    const lang = localStorage.getItem("orHaganuzLang") || "he";
    const dictionary = translations[lang] || translations.he;
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildBookingPayload()),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Error");
      showBookingStatus(dictionary["booking.saved"], "success");
      bookingForm.reset();
      updateDateTrigger();
      updateQuote();
    } catch {
      showBookingStatus(dictionary["booking.apiError"], "error");
    }
  });

  if (emailButton) {
    emailButton.addEventListener("click", () => {
      if (!checkin.value || !checkout.value) {
        const dictionary = translations[localStorage.getItem("orHaganuzLang") || "he"] || translations.he;
        openBookingPicker(!checkin.value ? checkin : checkout);
        showBookingStatus(dictionary["booking.dateRequired"], "error");
        return;
      }
      if (!bookingForm.reportValidity()) return;
      const subject = "Solicitud de reserva - Hotel Or Haganuz Uman";
      const message = buildBookingMessage();
      window.location.href = `mailto:orhaganuz13@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    });
  }

  if (whatsappQuoteButton) {
    whatsappQuoteButton.addEventListener("click", () => {
      if (!checkin.value || !checkout.value) {
        const dictionary = translations[localStorage.getItem("orHaganuzLang") || "he"] || translations.he;
        openBookingPicker(!checkin.value ? checkin : checkout);
        showBookingStatus(dictionary["booking.dateRequired"], "error");
        return;
      }
      if (!bookingForm.reportValidity()) return;
      const message = buildBookingMessage();
      window.open(`https://wa.me/972586404027?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    });
  }

  bookingForm.addEventListener("input", updateQuote);
  bookingForm.addEventListener("change", updateQuote);
}

setLanguage(localStorage.getItem("orHaganuzLang") || "he");
