import React, { useState } from "react";
import "../TajPage.css";
import { Link } from "react-router-dom";

const TajPage = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showVirtualTour, setShowVirtualTour] = useState(false);

  // Image gallery data
  const galleryImages = [
    { src: "/images/taj1.png", alt: "Taj Mahal Main View" },
    { src: "/images/taj2.png", alt: "Taj Mahal at Sunset" },
    { src: "/images/taj3.png", alt: "Taj Mahal Gardens" },
    { src: "/images/taj4.png", alt: "Taj Mahal Interior" },
  ];

  // Quick info data with icons
  const quickInfo = [
    {
      icon: "📍",
      title: "Location",
      value: "Agra, Uttar Pradesh, India",
      detail: "On the banks of Yamuna River",
    },
    {
      icon: "🕒",
      title: "Timings",
      value: "6:00 AM - 6:30 PM",
      detail: "Closed on Fridays",
    },
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
      detail: "Mughal Emperor Shah Jahan",
    },
  ];

  // Travel info
  const travelInfo = [
    { icon: "✈️", title: "Nearest Airport", value: "Agra Airport (7 km)" },
    {
      icon: "🚂",
      title: "Nearest Railway",
      value: "Agra Cantt Railway Station",
    },
    { icon: "🌅", title: "Best Time", value: "October to March" },
    { icon: "⏰", title: "Duration", value: "2-3 hours recommended" },
  ];

  // Nearby attractions
  const nearbyAttractions = [
    { name: "Agra Fort", distance: "2.5 km", rating: "4.5★" },
    { name: "Mehtab Bagh", distance: "1.5 km", rating: "4.2★" },
    { name: "Itmad-ud-Daulah", distance: "6 km", rating: "4.3★" },
    { name: "Fatehpur Sikri", distance: "40 km", rating: "4.4★" },
  ];

  // Reviews data
  const reviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Absolutely breathtaking! A must-visit wonder of the world.",
      date: "March 2024",
    },
    {
      name: "Raj Patel",
      rating: 5,
      comment:
        "Best visited during sunrise. The marble changes colors beautifully.",
      date: "February 2024",
    },
    {
      name: "Emily Chen",
      rating: 4,
      comment:
        "Crowded but worth every moment. Book tickets online to skip queues.",
      date: "January 2024",
    },
  ];

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setActiveImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  const playAudioGuide = () => {
    alert("Audio guide feature coming soon! 🎧");
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
            <h1 className="monument-title">Taj Mahal</h1>
            <p className="monument-tagline">Symbol of Eternal Love</p>
            <div className="hero-buttons">
              <button
                className="btn-primary"
                onClick={() => setShowVirtualTour(true)}
              >
                🌐 Virtual Tour
              </button>
              <button className="btn-secondary" onClick={playAudioGuide}>
                🎧 Audio Guide
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
          <div className="map-placeholder">
            <p>🗺️ Interactive Map</p>
            <button className="btn-map">Get Directions</button>
          </div>
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
      <section className="reviews-section">
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
      </section>

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
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>360° Virtual Tour</h3>
            <div className="virtual-tour-placeholder">
              <p>🌐 Immersive 360° experience coming soon!</p>
              <p>Explore every corner of the Taj Mahal from your device</p>
            </div>
            <button
              className="btn-close"
              onClick={() => setShowVirtualTour(false)}
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TajPage;
