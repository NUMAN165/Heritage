import React from "react";
import "./Cards.css";

const AjantaPage = () => {
  // Configurable table data
  const tableData = [
    { label: "Location", value: "Ajanta, New Country" },
    { label: "Timings", value: "From 10:00 AM to 6:00 PM; closed on Mondays" },
    {
      label: "Entry Fees",
      value: "₹ 40 for locals; ₹ 600 for international visitors;",
    },
    {
      label: "Historical Significance",
      value:
        "The Ajanta Caves, located in Maharashtra, are a series of 30 rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE. They are renowned for their exquisite murals and sculptures, which are considered masterpieces of Buddhist religious art.",
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
          <button>Book Tickets</button>
        </div>
      </div>
    </div>
  );
};



export default AjantaPage;
