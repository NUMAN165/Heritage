import React from "react";
import "./TajPage.css";

const TajPage = () => {
  return (
    <div className="TajInfoPage">
      <div className="imageContainer">
        <img src="/images/taj1.png" alt="Taj Mahal" />
        <div className="taj-table">
          <table className="overlayTable">
            <tbody>
              <tr>
                <td width="25%">
                  <b>Location</b>
                </td>
                <td>
                  <p style={{ marginLeft: "2%" }}>Agra, Delhi</p>
                </td>
              </tr>
              <tr>
                <td width="25%">
                  <b>Timings</b>
                </td>
                <td>
                  <p style={{ marginLeft: "2%" }}>
                    From 9:00 AM to 5:30 PM; closed on Fridays
                  </p>
                </td>
              </tr>
              <tr>
                <td width="25%">
                  <b>Entry Fees</b>
                </td>
                <td>
                  <p style={{ marginLeft: "2%" }}>
                    ₹ 50 for Indians Children under 15 years are free; ₹ 1100
                    for foreigners;
                  </p>
                </td>
              </tr>
              <tr>
                <td width="25%">
                  <b>Commissioned by</b>
                </td>
                <td>
                  <p style={{ marginLeft: "2%" }}>
                    Taj Mahal was commissioned by Mughal Emperor Shah Jahan in
                    memory of his beloved wife, Mumtaz Mahal.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TajPage;

// GlassMorphism.js
// import React from 'react';
// import './TajPage.css';

// const TajPage = () => {
//     return (
//       <>
//         <div className='glassbodys'>
//         <div className="glasss">
//             <h1>Hello, World!</h1>
//             <p>This is a glassmorphism effect!</p>
//         </div>
//         </div>
//         </>
//     );
// };

// export default TajPage;
