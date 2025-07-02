import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import "./App.css"; // ✅ Make sure this import is present

export default function App() {
  const [lang, setLang] = useState("ar");
  const [menuOpen, setMenuOpen] = useState(false);

  const translations = {
    ar: {
      home: "الرئيسية",
      daily: "الرحلات اليومية",
      weekly: "الرحلات الأسبوعية",
      special: "الخدمات الخاصة",
      contact: "اتصل بنا",
      language: " اللغة",
      welcome: "مغامرتك تبدأ مع",
      description: "نقدم لكم أفضل العروض السياحية داخل تركيا وخارجها، رحلات مميزة، حجوزات فندقية، جولات خاصة، وخدمة احترافية.",
      whatsapp: "احجز عبر الواتساب",
      discover: (city) => `اكتشف ${city} معنا .`,
      dailyTitle: "برامجنا السياحية اليومية – جولات مميزة ليوم واحد",
      weeklyTitle: "برامجنا السياحية الاسبوعية – مع اقامة فندقية",
      specialTitle: "خدماتنا الخاصة – من النقل الى الحجوزات"
    },
    en: {
      home: "Home",
      daily: "Daily Trips",
      weekly: "Weekly Trips",
      special: "Special Services",
      contact: "Contact Us",
      language: " Language",
      welcome: "Your adventure starts with",
      description: "We offer you the best travel deals inside and outside Turkey, unique tours, hotel bookings, private tours, and professional service.",
      whatsapp: "Book via WhatsApp",
      discover: (city) => `Discover ${city} with us in an unforgettable experience.`,
      dailyTitle: "Our Daily Trips – Unique One-Day Tours",
      weeklyTitle: "Our Weekly Programs – Including Hotel Stay",
      specialTitle: "Our Special Services – From Transfers to Bookings"
    }
  };

  const t = translations[lang];

  const weeklyTrips = [
    { city: lang === "ar" ? "طرابزون" : "Trabzon", img: "/img/trabzon.jpg" },
    { city: lang === "ar" ? "كابادوكيا" : "Cappadocia", img: "/img/kapadokya.jpg" },
    { city: lang === "ar" ? "أنطاليا" : "Antalya", img: "/img/antalya.jpg" },
    { city: lang === "ar" ? "مرميس" : "Marmaris", img: "/img/marmaris.jpg" },
  ];

  const dailyTrips = [
    { city: lang === "ar" ? "صبنجا ومعشوقية" : "Sapanca & Maşukiye", img: "/img/sapanca.jpg" },
    { city: lang === "ar" ? "بورصا" : "Bursa", img: "/img/bursa.jpg" },
    { city: lang === "ar" ? "جزر الاميرات" : "Princes' Islands", img: "/img/adalar.jpg" },
    { city: lang === "ar" ? "سهرة البوسفور" : "Bosphorus Night Tour", img: "/img/sahra.jpg" },
    { city: lang === "ar" ? "شيلا اغوا" : "Şile & Ağva", img: "/img/sila.jpg" },
    { city: lang === "ar" ? "ازميت" : "Izmit", img: "/img/izmit.jpg" },
    { city: lang === "ar" ? "يالوفا" : "Yalova", img: "/img/yalova.png" },
    { city: lang === "ar" ? "نقل من والى المطار" : "Airport Transfer", img: "/img/airport.jpg" },
  ];

  const specialServices = [
    { city: lang === "ar" ? "سيارات خاصة" : "Private Cars", img: "/img/CAR.png" },
    { city: lang === "ar" ? "يخت خاص" : "Private Yacht", img: "/img/yacht.jpg" },
    { city: lang === "ar" ? "كوخ خاص" : "Private Cabin", img: "/img/cabin.jpg" },
    { city: lang === "ar" ? " حجوزات فنادق و طيران" : "Hotel & Flight Booking", img: "/img/hotel.jpg" },
  ];

  const controlsSiran = useAnimation();
  const controlsTravel = useAnimation();
  const controlsLogo = useAnimation();

  useEffect(() => {
    async function sequence() {
      await controlsSiran.start({ opacity: 1, x: 0, transition: { duration: 1.2 } });
      await controlsTravel.start({ opacity: 1, x: 0, transition: { duration: 1 } });
      await controlsLogo.start({ opacity: 1, scale: 1, transition: { duration: 0.7 } });
    }
    sequence();
    const interval = setInterval(() => {
      controlsSiran.set({ opacity: 0, x: 50 });
      controlsTravel.set({ opacity: 0, x: 50 });
      controlsLogo.set({ opacity: 0, scale: 0.8 });
      sequence();
    }, 20000);
    return () => clearInterval(interval);
  }, [controlsSiran, controlsTravel, controlsLogo]);

  function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); // close menu on click
    }
  }

  function renderTripSection(title, items, type) {
    return (
      <section id={type} className="trip-section">
        <h2 className="trip-title">{title}</h2>
        <div className="trip-grid">
          {items.map((trip, idx) => (
            <div className="trip-card" key={idx}>
              <div className="trip-image">
                <img
                  src={trip.img}
                  alt={trip.city}
                />
              </div>
              <div className="trip-content">
                <h3>{trip.city}</h3>
                <p>{t.discover(trip.city)}</p>
                <div className="trip-button">
                  <a
                    href={`https://wa.me/9647744422120?text=مرحبا، أود الاستفسار عن ${trip.city}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button>{t.whatsapp}</button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div className="app-container" dir={lang === "ar" ? "rtl" : "ltr"}>
      <nav className="navbar">
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>{t.home}</button>
          <button onClick={() => scrollToSection("daily")}>{t.daily}</button>
          <button onClick={() => scrollToSection("weekly")}>{t.weekly}</button>
          <button onClick={() => scrollToSection("special")}>{t.special}</button>
          <a href="https://wa.me/9647744422120?text=مرحبا، أريد التواصل مع فريقكم" target="_blank" rel="noopener noreferrer">
            <button>{t.contact}</button>
          </a>
          <button onClick={() => setLang(lang === "ar" ? "en" : "ar")}>
            {t.language} ({lang === "ar" ? "EN" : "AR"})
          </button>
        </div>
      </nav>

      <div style={{ height: "60px" }}></div>

      <header className="header">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={controlsLogo} className="logo">
          <img src="/logo.png" alt="Logo" />
        </motion.div>
        <div className="header-text">
          <motion.h1 initial={{ opacity: 0, x: 50 }} animate={controlsSiran}>Elia</motion.h1>
          <motion.h1 initial={{ opacity: 0, x: 50 }} animate={controlsTravel}>Travel</motion.h1>
        </div>
      </header>

      <section className="intro">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          {t.welcome} <motion.span style={{ color: "#D62828" }}>ايليا</motion.span> ترافل
        </motion.h2>
        <p style={{fontFamily: "Cairo, sans-serif" }}>{t.description}</p>
        </section>

      {renderTripSection(t.dailyTitle, dailyTrips, "daily")}
      {renderTripSection(t.weeklyTitle, weeklyTrips, "weekly")}
      {renderTripSection(t.specialTitle, specialServices, "special")}

<footer className="footer">
  <div className="footer-content">
    <h3 className="footer-heading"> {lang === "ar" ? "تواصل معنا" : "Get in Touch"}</h3>
    <p className="footer-subtitle">
      {lang === "ar"
        ? "نحن هنا للإجابة على جميع استفساراتكم ومساعدتكم في اختيار الرحلة المثالية!"
        : "We're here to answer all your questions and help you plan the perfect trip!"}
    </p>

    <div className="footer-icons">
  <a href="https://www.instagram.com/elia.tour?igsh=NnRybDNueDJ2ZHdj&utm_source=qr" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-instagram"></i>
  </a>
  <a href="https://www.facebook.com/share/19PKw6WQTc/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-facebook"></i>
  </a>
  <a href="https://wa.me/9647744422120" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-whatsapp"></i>
  </a>
  <a href="tel:+905364765991">
    <i className="fas fa-phone-alt"></i>
  </a>
</div>


    <p className="footer-location">
      <i className="fas fa-map-marker-alt"></i> Istanbul / Türkiye
    </p>

        <p className="footer-location">
      <i className="fas fa-map-marker-alt"></i> Najaf / Iraq
    </p>

    <div className="footer-text">
      <img src="/logo.png" alt="Logo" className="footer-logo" />
      <p>&copy; 2025 Elia Tourism. All rights reserved.</p>
    </div>
  </div>
</footer>







    </div>



  );
}
