import React from 'react';
import './QutubPage.css';

const QutubPage = () => {
  return (
    <div className='QutubInfoPage'>
      <div className='imageContainer'>
        <img src="/images/qutub.png" alt="Qutub Minar" />
        {/* <div className="redBox"> */}
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
        {/* </div> */}
        <div className="blackBox">
          <button>Home</button>
          <button>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default QutubPage;
