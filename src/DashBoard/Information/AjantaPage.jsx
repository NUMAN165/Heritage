import React, { useState } from "react";
import "./TajPage.css";
import { Link } from "react-router-dom";

const AjantaPage = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  // const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  // const [audioProgress, setAudioProgress] = useState(0);
  const [showMap, setShowMap] = useState(false);

  // Image gallery data
  const galleryImages = [
    { src: "/images/Ajanta.png", alt: "Ajanta Caves Main View" },
    { src: "/images/ajanta2.png", alt: "Ajanta Caves at Sunset" },
    { src: "/images/ajanta3.png", alt: "Ajanta Caves Gardens" },
    { src: "/images/ajanta4.png", alt: "Ajanta Caves Interior" },
  ];

  // Quick info data with icons
  const quickInfo = [
    {
      icon: "📍",
      title: "Location",
      value: "Aurangabad, Maharashtra, India",
      detail: "UNESCO World Heritage Site",
    },
    // {
    //   icon: "🕒",
    //   title: "Timings",
    //   value: "6:00 AM - 6:30 PM",
    //   detail: "Closed on Fridays",
    // },
    {
      icon: "💰",
      title: "Entry Fees",
      value: "₹50 Indians | ₹1100 Foreigners",
      detail: "Additional charges for main mausoleum",
    },
    {
      icon: "🏛",
      title: "Built",
      value: "1632 - 1653 AD",
      detail: "Built by",
    },
  ];

  // Travel info
  const travelInfo = [
    {
      icon: "✈️",
      title: "Nearest Airport",
      value: "Aurangabad Airport (100 km)",
    },
    {
      icon: "🚂",
      title: "Nearest Railway",
      value: "Aurangabad Railway Station",
    },
    { icon: "🌅", title: "Best Time", value: "October to March" },
    // { icon: "⏰", title: "Duration", value: "2-3 hours recommended" },
  ];

  // Nearby attractions
  const nearbyAttractions = [
    { name: "Ellora Caves", distance: "2.5 km", rating: "4.5★" },
    { name: "Mehtab Bagh", distance: "1.5 km", rating: "4.2★" },
    { name: "Itmad-ud-Daulah", distance: "6 km", rating: "4.3★" },
    // { name: "Fatehpur Sikri", distance: "40 km", rating: "4.4★" },
  ];

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setActiveImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  return (
    <div className="taj-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-image-container">
          <img
            src={galleryImages[activeImageIndex].src}
            alt={galleryImages[activeImageIndex].alt}
            className="hero-image"
          />
          <div className="hero-gradient-overlay"></div>
          <div className="hero-content">
            <h1 className="monument-title">Ajanta Caves</h1>
            <p className="monument-tagline">
              Ancient Buddhist rock-cut caves with stunning paintings
            </p>
            <div className="hero-buttons">
              <button
                className="btn-primary"
                onClick={() => setShowVirtualTour(true)}
              >
                🌐 Virtual Tour
              </button>
            </div>
          </div>
        </div>

        {/* Image Navigation */}
        <button className="nav-btn nav-btn-left" onClick={prevImage}>
          ‹
        </button>
        <button className="nav-btn nav-btn-right" onClick={nextImage}>
          ›
        </button>

        {/* Image Indicators */}
        <div className="image-indicators">
          {galleryImages.map((_, index) => (
            <span
              key={index}
              className={`indicator ${
                index === activeImageIndex ? "active" : ""
              }`}
              onClick={() => setActiveImageIndex(index)}
            ></span>
          ))}
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="quick-info-section">
        <h2 className="section-title">Quick Information</h2>
        <div className="info-grid">
          {quickInfo.map((info, index) => (
            <div
              key={index}
              className="info-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="info-icon">{info.icon}</div>
              <h3 className="info-title">{info.title}</h3>
              <p className="info-value">{info.value}</p>
              <p className="info-detail">{info.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Travel Information */}
      <section className="travel-section">
        <h2 className="section-title">How to Reach</h2>
        <div className="travel-grid">
          {travelInfo.map((info, index) => (
            <div key={index} className="travel-card">
              <span className="travel-icon">{info.icon}</span>
              <div className="travel-content">
                <h4>{info.title}</h4>
                <p>{info.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <h2 className="section-title">Location & Directions</h2>
        <div className="map-container">
          {!showMap ? (
            <div className="map-placeholder">
              <p>🗺️ Interactive Map</p>
              <button className="btn-map" onClick={() => setShowMap(true)}>
                Load Map & Get Directions
              </button>
            </div>
          ) : (
            <div className="map-embed">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3595.0765777337515!2d78.04018461500393!3d27.175144182873583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39747121a187d6a3%3A0xc4e9a0a69eb9c1ac!2sTaj%20Mahal!5e0!3m2!1sen!2sin!4v1693485726889!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: "15px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Taj Mahal Location"
              ></iframe>
              <div className="map-controls">
                {/* <button className="btn-directions">📱 Get Directions</button>
                <button className="btn-streetview">👀 Street View</button> */}
                <button
                  className="btn-satellite"
                  onClick={() => setShowMap(false)}
                >
                  🗺️ Hide Map
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Nearby Attractions */}
      <section className="nearby-section">
        <h2 className="section-title">Nearby Attractions</h2>
        <div className="nearby-grid">
          {nearbyAttractions.map((attraction, index) => (
            <div key={index} className="nearby-card">
              <h4>{attraction.name}</h4>
              <p>📍 {attraction.distance}</p>
              <p>⭐ {attraction.rating}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Historical Significance */}
      <section className="history-section">
        <h2 className="section-title">Historical Significance</h2>
        <div className="history-content">
          <div className="history-text">
            <p>
              The Taj Mahal stands as one of the most magnificent monuments ever
              created, built by Mughal Emperor Shah Jahan as a mausoleum for his
              beloved wife Mumtaz Mahal. This UNESCO World Heritage Site
              represents the pinnacle of Mughal architecture, combining elements
              from Islamic, Persian, Ottoman Turkish, and Indian architectural
              styles.
            </p>
            <p>
              Construction began in 1632 and was completed in 1653, employing
              thousands of artisans and craftsmen from across the empire. The
              monument changes color throughout the day, appearing pinkish in
              the morning, milky white in the evening, and golden under
              moonlight.
            </p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      {/* <section className="reviews-section">
        <h2 className="section-title">Visitor Reviews</h2>
        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-header">
                <h4>{review.name}</h4>
                <div className="review-rating">
                  {"⭐".repeat(review.rating)}
                </div>
              </div>
              <p className="review-comment">"{review.comment}"</p>
              <p className="review-date">{review.date}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Action Buttons */}
      <section className="action-section">
        <div className="action-buttons">
          <Link to="/" className="btn-outline">
            🏠 Back to Home
          </Link>
          <Link to="/BookTicket" className="btn-primary-large">
            🎫 Book Tickets Now
          </Link>
        </div>
      </section>

      {/* Virtual Tour Modal */}
      {showVirtualTour && (
        <div
          className="modal-overlay"
          onClick={() => setShowVirtualTour(false)}
        >
          <div
            className="modal-content virtual-tour-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>360° Virtual Tour - Taj Mahal</h3>
            <div className="virtual-tour-viewer">
              <iframe
                src="https://www.google.com/maps/embed?pb=!4v1693485726889!6m8!1m7!1sCAoSLEFGMVFpcE9fUEhVa3NZN2ZqRWJOQkNjQ3hFVzFqV3FhZDNRcVNHVzdFQ3Ft!2m2!1d27.175144182873583!2d78.04218461500393!3f270!4f0!5f0.7820865974627469"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: "15px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Taj Mahal 360° Virtual Tour"
              ></iframe>
              <div className="virtual-tour-controls">
                <button className="tour-btn">🖱️ Drag to Look Around</button>
                <button className="tour-btn">🔍 Click + to Zoom</button>
                <button className="tour-btn">📱 Full Screen</button>
              </div>
            </div>
            <div className="virtual-tour-info">
              <p>🌟 Explore the Taj Mahal in stunning 360° detail</p>
              <p>📱 Use mouse/touch to navigate • Scroll to zoom</p>
            </div>
            <button
              className="btn-close"
              onClick={() => setShowVirtualTour(false)}
            >
              ✕ Close Virtual Tour
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AjantaPage;
