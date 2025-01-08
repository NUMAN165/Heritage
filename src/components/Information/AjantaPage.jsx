import React from "react";
import "./Cards.css";

const AjantaPage = () => {
  // Configurable table data
  const tableData = [
    { label: "Location", value: "Ajanta, New Country" },
    { label: "Timings", value: "From 10:00 AM to 6:00 PM; closed on Mondays" },
    {
      label: "Entry Fees",
      value: "₹ 100 for locals; ₹ 1200 for international visitors;",
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
          <button>Book Tickets</button>
        </div>
      </div>
    </div>
  );
};

export default AjantaPage;
