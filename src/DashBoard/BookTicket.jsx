import React, { useState } from "react";
import "./BookingPage.css";

const BookTickets = () => {
  const [formData, setFormData] = useState({
    monument: "",
    visitDate: "",
    timeSlot: "",
    adultTickets: 1,
    childTickets: 0,
    studentTickets: 0,
    foreignerTickets: 0,
    visitorName: "",
    email: "",
    phone: "",
    nationality: "Indian",
    specialRequirements: "",
    guide: false,
    photography: false,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);

  const monuments = [
    {
      id: "taj-mahal",
      name: "Taj Mahal",
      location: "Agra, Uttar Pradesh",
      category: "Monument",
      description: "UNESCO World Heritage Site - Symbol of eternal love",
      timings: "6:00 AM - 7:00 PM (Closed on Friday)",
      prices: { adult: 50, child: 10, student: 10, foreigner: 1100 },
    },
    {
      id: "red-fort",
      name: "Red Fort",
      location: "Delhi",
      category: "Monument",
      description: "Historic Mughal fortress and UNESCO World Heritage Site",
      timings: "9:30 AM - 4:30 PM (Closed on Monday)",
      prices: { adult: 35, child: 15, student: 15, foreigner: 550 },
    },
    {
      id: "indian-museum",
      name: "Indian Museum",
      location: "Kolkata, West Bengal",
      category: "Museum",
      description: "Oldest and largest museum in India with rare collections",
      timings: "10:00 AM - 5:00 PM (Closed on Monday)",
      prices: { adult: 20, child: 10, student: 10, foreigner: 500 },
    },
    {
      id: "ajanta-caves",
      name: "Ajanta Caves",
      location: "Aurangabad, Maharashtra",
      category: "Monument",
      description: "Ancient Buddhist rock-cut caves with stunning paintings",
      timings: "9:00 AM - 5:30 PM (Closed on Monday)",
      prices: { adult: 40, child: 15, student: 15, foreigner: 600 },
    },
    {
      id: "mysore-palace",
      name: "Mysore Palace",
      location: "Mysore, Karnataka",
      category: "Palace",
      description: "Royal palace with Indo-Saracenic architecture",
      timings: "10:00 AM - 5:30 PM (Daily)",
      prices: { adult: 70, child: 30, student: 30, foreigner: 200 },
    },
    {
      id: "national-museum",
      name: "National Museum",
      location: "New Delhi",
      category: "Museum",
      description: "Premier museum showcasing Indian art and cultural heritage",
      timings: "10:00 AM - 6:00 PM (Closed on Monday)",
      prices: { adult: 20, child: 10, student: 10, foreigner: 650 },
    },
    {
      id: "victoria-memorial",
      name: "Victoria Memorial",
      location: "Kolkata, West Bengal",
      category: "Museum",
      description: "Marble monument dedicated to Queen Victoria",
      timings: "10:00 AM - 5:00 PM (Closed on Monday)",
      prices: { adult: 30, child: 10, student: 10, foreigner: 500 },
    },
    {
      id: "chhatrapati-museum",
      name: "Chhatrapati Shivaji Museum",
      location: "Mumbai, Maharashtra",
      category: "Museum",
      description: "Premier museum with art, archaeology and natural history",
      timings: "10:15 AM - 6:00 PM (Closed on Monday)",
      prices: { adult: 25, child: 10, student: 10, foreigner: 500 },
    },
  ];

  const timeSlots = [
    "09:00 AM - 11:00 AM",
    "11:00 AM - 01:00 PM",
    "01:00 PM - 03:00 PM",
    "03:00 PM - 05:00 PM",
    "05:00 PM - 07:00 PM",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const calculateTotal = () => {
    const selectedMonument = monuments.find((m) => m.id === formData.monument);
    if (!selectedMonument) return 0;

    const prices = selectedMonument.prices;
    let total = 0;

    total += formData.adultTickets * prices.adult;
    total += formData.childTickets * prices.child;
    total += formData.studentTickets * prices.student;
    total += formData.foreignerTickets * prices.foreigner;

    if (formData.guide) total += 500;
    if (formData.photography) total += 200;

    return total;
  };

  React.useEffect(() => {
    setTotalAmount(calculateTotal());
  }, [formData]);

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    alert(
      "Booking submitted successfully! You will receive a confirmation email shortly."
    );
  };

  // const renderProgressBar = () => (
  //   <div className="progress-container">
  //     <div className="progress-bar">
  //       {[1, 2, 3, 4].map((step) => (
  //         <div
  //           key={step}
  //           className={`progress-step ${currentStep >= step ? "active" : ""}`}
  //         >
  //           <div className="step-circle">{step}</div>
  //           <div className="step-label">
  //             {step === 1
  //               ? "Select"
  //               : step === 2
  //               ? "Tickets"
  //               : step === 3
  //               ? "Details"
  //               : "Payment"}
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );

  const renderStep1 = () => (
    <div className="step-content">
      <h2>Select Monument or Museum</h2>
      <div className="monuments-list">
        {monuments.map((monument) => (
          <div
            key={monument.id}
            className={`monument-list-item ${
              formData.monument === monument.id ? "selected" : ""
            }`}
            onClick={() => setFormData({ ...formData, monument: monument.id })}
          >
            <div className="monument-header">
              <div className="monument-title">
                <h3>{monument.name}</h3>
                <span className="category-badge">{monument.category}</span>
              </div>
              <div className="selection-indicator">
                {formData.monument === monument.id && (
                  <span className="checkmark">✓</span>
                )}
              </div>
            </div>
            <div className="monument-details">
              <p className="location">📍 {monument.location}</p>
              <p className="description">{monument.description}</p>
              <p className="timings">🕒 {monument.timings}</p>
            </div>
            <div className="pricing-row">
              <div className="price-item">
                <span className="price-label">Adult</span>
                <span className="price-value">₹{monument.prices.adult}</span>
              </div>
              <div className="price-item">
                <span className="price-label">Child</span>
                <span className="price-value">₹{monument.prices.child}</span>
              </div>
              <div className="price-item">
                <span className="price-label">Student</span>
                <span className="price-value">₹{monument.prices.student}</span>
              </div>
              <div className="price-item">
                <span className="price-label">Foreigner</span>
                <span className="price-value">
                  ₹{monument.prices.foreigner}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="step-content">
      <h2>Select Date, Time & Tickets</h2>
      <div className="booking-form">
        <div className="form-row">
          <div className="form-group">
            <label>Visit Date</label>
            <input
              type="date"
              name="visitDate"
              value={formData.visitDate}
              onChange={handleInputChange}
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>
          <div className="form-group">
            <label>Time Slot</label>
            <select
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Time Slot</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="tickets-section">
          <h3>Number of Tickets</h3>
          <div className="tickets-grid">
            <div className="ticket-type">
              <label>
                Adult Tickets (₹
                {monuments.find((m) => m.id === formData.monument)?.prices
                  .adult || 0}
                )
              </label>
              <div className="quantity-control">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      adultTickets: Math.max(0, formData.adultTickets - 1),
                    })
                  }
                >
                  -
                </button>
                <span>{formData.adultTickets}</span>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      adultTickets: formData.adultTickets + 1,
                    })
                  }
                >
                  +
                </button>
              </div>
            </div>
            <div className="ticket-type">
              <label>
                Child Tickets (₹
                {monuments.find((m) => m.id === formData.monument)?.prices
                  .child || 0}
                )
              </label>
              <div className="quantity-control">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      childTickets: Math.max(0, formData.childTickets - 1),
                    })
                  }
                >
                  -
                </button>
                <span>{formData.childTickets}</span>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      childTickets: formData.childTickets + 1,
                    })
                  }
                >
                  +
                </button>
              </div>
            </div>
            <div className="ticket-type">
              <label>
                Student Tickets (₹
                {monuments.find((m) => m.id === formData.monument)?.prices
                  .student || 0}
                )
              </label>
              <div className="quantity-control">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      studentTickets: Math.max(0, formData.studentTickets - 1),
                    })
                  }
                >
                  -
                </button>
                <span>{formData.studentTickets}</span>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      studentTickets: formData.studentTickets + 1,
                    })
                  }
                >
                  +
                </button>
              </div>
            </div>
            <div className="ticket-type">
              <label>
                Foreigner Tickets (₹
                {monuments.find((m) => m.id === formData.monument)?.prices
                  .foreigner || 0}
                )
              </label>
              <div className="quantity-control">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      foreignerTickets: Math.max(
                        0,
                        formData.foreignerTickets - 1
                      ),
                    })
                  }
                >
                  -
                </button>
                <span>{formData.foreignerTickets}</span>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      foreignerTickets: formData.foreignerTickets + 1,
                    })
                  }
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="add-ons">
          <h3>Additional Services</h3>
          <div className="addon-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="guide"
                checked={formData.guide}
                onChange={handleInputChange}
              />
              <span>Audio Guide (+₹500)</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="photography"
                checked={formData.photography}
                onChange={handleInputChange}
              />
              <span>Photography Pass (+₹200)</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="step-content">
      <h2>Visitor Information</h2>
      <div className="booking-form">
        <div className="form-row">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="visitorName"
              value={formData.visitorName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Nationality</label>
            <select
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              required
            >
              <option value="Indian">Indian</option>
              <option value="Foreign">Foreign</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Special Requirements (Optional)</label>
          <textarea
            name="specialRequirements"
            value={formData.specialRequirements}
            onChange={handleInputChange}
            placeholder="Any special assistance needed, dietary requirements, etc."
            rows="4"
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="step-content">
      <h2>Booking Summary & Payment</h2>
      <div className="summary-container">
        <div className="booking-summary">
          <h3>Booking Details</h3>
          <div className="summary-item">
            <span>Monument:</span>
            <span>
              {monuments.find((m) => m.id === formData.monument)?.name}
            </span>
          </div>
          <div className="summary-item">
            <span>Date:</span>
            <span>{formData.visitDate}</span>
          </div>
          <div className="summary-item">
            <span>Time:</span>
            <span>{formData.timeSlot}</span>
          </div>
          <div className="summary-item">
            <span>Visitor:</span>
            <span>{formData.visitorName}</span>
          </div>

          <div className="ticket-breakdown">
            <h4>Ticket Breakdown</h4>
            {formData.adultTickets > 0 && (
              <div className="breakdown-item">
                <span>Adult x {formData.adultTickets}</span>
                <span>
                  ₹
                  {formData.adultTickets *
                    monuments.find((m) => m.id === formData.monument)?.prices
                      .adult}
                </span>
              </div>
            )}
            {formData.childTickets > 0 && (
              <div className="breakdown-item">
                <span>Child x {formData.childTickets}</span>
                <span>
                  ₹
                  {formData.childTickets *
                    monuments.find((m) => m.id === formData.monument)?.prices
                      .child}
                </span>
              </div>
            )}
            {formData.studentTickets > 0 && (
              <div className="breakdown-item">
                <span>Student x {formData.studentTickets}</span>
                <span>
                  ₹
                  {formData.studentTickets *
                    monuments.find((m) => m.id === formData.monument)?.prices
                      .student}
                </span>
              </div>
            )}
            {formData.foreignerTickets > 0 && (
              <div className="breakdown-item">
                <span>Foreigner x {formData.foreignerTickets}</span>
                <span>
                  ₹
                  {formData.foreignerTickets *
                    monuments.find((m) => m.id === formData.monument)?.prices
                      .foreigner}
                </span>
              </div>
            )}
            {formData.guide && (
              <div className="breakdown-item">
                <span>Audio Guide</span>
                <span>₹500</span>
              </div>
            )}
            {formData.photography && (
              <div className="breakdown-item">
                <span>Photography Pass</span>
                <span>₹200</span>
              </div>
            )}
          </div>

          <div className="total-amount">
            <span>Total Amount: ₹{totalAmount}</span>
          </div>
        </div>

        <div className="payment-section">
          <h3>Payment Method</h3>
          <div className="payment-options">
            <label className="payment-option">
              <input type="radio" name="payment" value="upi" defaultChecked />
              <span>UPI Payment</span>
            </label>
            <label className="payment-option">
              <input type="radio" name="payment" value="card" />
              <span>Credit/Debit Card</span>
            </label>
            <label className="payment-option">
              <input type="radio" name="payment" value="netbanking" />
              <span>Net Banking</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="booking-container">
      <header className="booking-header">
        <div className="header-content">
          <h1>Heritage Pass</h1>
          {/* <p>Book your visit to India's magnificent museums and monuments</p> */}
        </div>
      </header>

      <div className="booking-content">
        {/* {renderProgressBar()} */}

        <div onSubmit={handleSubmit} className="booking-form-container">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          <div className="form-navigation">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="btn btn-secondary"
              >
                Previous
              </button>
            )}
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn btn-primary"
                disabled={
                  (currentStep === 1 && !formData.monument) ||
                  (currentStep === 2 &&
                    (!formData.visitDate || !formData.timeSlot))
                }
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                Complete Booking - ₹{totalAmount}
              </button>
            )}
          </div>
        </div>
      </div>

      <footer className="booking-footer">
        <p>© 2025 Heritage India Bookings | Support: 1800-XXX-XXXX</p>
      </footer>
    </div>
  );
};

export default BookTickets;
