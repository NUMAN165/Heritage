import React from "react";
import "./HeroSection.css"; // Import the CSS file

const HeroSection = () => {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="hero">
      {/* Hero Content */}
      <div className="hero-content">
        <h1>Welcome to My Website</h1>
        <p>Scroll down to explore</p>
      </div>

      {/* Scroll Down Arrow */}
      <div className="scroll-down" onClick={scrollToNext}>
        <span></span>
      </div>
    </section>
  );
};

export default HeroSection;
