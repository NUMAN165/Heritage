import React from "react";
import "./Cards.css";
import { Link } from "react-router-dom";

const HumayunsPage = () => {
  // Configurable table data
  const tableData = [
    { label: "Location", value: "Delhi, India" },
    { label: "Timings", value: "Open daily from sunrise to sunset." },
    {
      label: "Entry Fees",
      value: "₹ 40 for locals; ₹ 600 for international visitors;",
    },
    {
      label: "Historical Significance",
      value:
        "The monument was built in the 12th century by a famous king as a symbol of peace and unity.",
    },
  ];

  return (
    <div className="InfoPage">
      <div className="imageContainer">
        <img src="/images/taj1.png" alt="New Landmark" />

        <table className="overlayTable">
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td width="25%">
                  <b>{row.label}</b>
                </td>
                <td>
                  <p style={{ marginLeft: "2%" }}>{row.value}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="blackBox">
          <button>Home</button>
          <Link to="/BookTicket"><button>Book Tickets</button></Link> 
        </div>
      </div>
    </div>
  );
};

export default HumayunsPage;
