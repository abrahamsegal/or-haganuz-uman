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
    "contact.phone": "טלפון: +972 53 829 3228",
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
    "booking.roomType": "סוג חדר",
    "booking.guestName": "שם",
    "booking.guestPhone": "וואטסאפ / טלפון",
    "booking.guestEmail": "אימייל אופציונלי",
    "booking.single": "חדר יחיד",
    "booking.double": "חדר זוגי",
    "booking.family": "משפחה / קבוצה",
    "booking.notes": "הערות",
    "booking.notesPlaceholder": "תאריכים מיוחדים, קבוצה, ארוחות וכו'",
    "booking.submit": "שליחת הזמנה",
    "booking.emailSubmit": "שליחה באימייל",
    "booking.termsPrefix": "אני מאשר/ת את",
    "booking.termsLink": "התנאים וההגבלות",
    "booking.termsSuffix": ".",
    "booking.termsCopy": "הבקשה כפופה לזמינות, לתשלום כאשר נדרש, ולאישור כתוב מהמלון.",
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
    "contact.phone": "Teléfono: +972 53 829 3228",
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
    "booking.roomType": "Tipo de habitación",
    "booking.guestName": "Nombre",
    "booking.guestPhone": "WhatsApp / telefono",
    "booking.guestEmail": "Email opcional",
    "booking.single": "Habitación individual",
    "booking.double": "Habitación doble",
    "booking.family": "Familia / grupo",
    "booking.notes": "Notas",
    "booking.notesPlaceholder": "Fechas especiales, grupo, comidas, etc.",
    "booking.submit": "Reservar directo",
    "booking.emailSubmit": "Enviar por email",
    "booking.termsPrefix": "Acepto los",
    "booking.termsLink": "Términos y Condiciones",
    "booking.termsSuffix": ".",
    "booking.termsCopy": "La solicitud queda sujeta a disponibilidad, pago cuando aplique y confirmación escrita del hotel.",
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
    "contact.phone": "Phone: +972 53 829 3228",
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
    "booking.roomType": "Room type",
    "booking.guestName": "Name",
    "booking.guestPhone": "WhatsApp / phone",
    "booking.guestEmail": "Optional email",
    "booking.single": "Single room",
    "booking.double": "Double room",
    "booking.family": "Family / group",
    "booking.notes": "Notes",
    "booking.notesPlaceholder": "Special dates, group, meals, etc.",
    "booking.submit": "Book directly",
    "booking.emailSubmit": "Send by email",
    "booking.termsPrefix": "I accept the",
    "booking.termsLink": "Terms and Conditions",
    "booking.termsSuffix": ".",
    "booking.termsCopy": "The request is subject to availability, payment when applicable, and written confirmation from the hotel.",
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
  const roomTypeSelect = bookingForm.querySelector("#roomType");
  const today = new Date().toISOString().slice(0, 10);
  checkin.min = today;
  checkout.min = today;

  checkin.addEventListener("change", () => {
    checkout.min = checkin.value || today;
    if (checkout.value && checkout.value <= checkin.value) checkout.value = "";
  });

  async function loadBookingCatalog() {
    if (!roomTypeSelect) return;
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
    return [
      "Hola, quiero consultar disponibilidad en Hotel Or Haganuz Uman.",
      `Nombre: ${data.get("guestName")}`,
      `WhatsApp / telefono: ${data.get("guestPhone")}`,
      `Email: ${data.get("guestEmail") || "-"}`,
      `Entrada: ${data.get("checkin")}`,
      `Salida: ${data.get("checkout")}`,
      `Huéspedes: ${data.get("guests")}`,
      `Tipo: ${data.get("roomType")}`,
      `Notas: ${data.get("notes") || "-"}`,
      "Terminos y condiciones: aceptados"
    ].join("\n");
  }

  function buildBookingPayload() {
    const data = new FormData(bookingForm);
    return {
      guestName: data.get("guestName"),
      guestPhone: data.get("guestPhone"),
      guestEmail: data.get("guestEmail"),
      checkin: data.get("checkin"),
      checkout: data.get("checkout"),
      guests: data.get("guests"),
      roomType: data.get("roomType"),
      notes: data.get("notes"),
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
      checkout.min = today;
    } catch {
      showBookingStatus(dictionary["booking.apiError"], "error");
    }
  });

  if (emailButton) {
    emailButton.addEventListener("click", () => {
      if (!bookingForm.reportValidity()) return;
      const subject = "Solicitud de reserva - Hotel Or Haganuz Uman";
      const message = buildBookingMessage();
      window.location.href = `mailto:orhaganuz13@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    });
  }
}

setLanguage(localStorage.getItem("orHaganuzLang") || "he");
