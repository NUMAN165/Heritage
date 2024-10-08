import React from 'react';
import './TajPage.css';

const TajPage = () => {
  return (
    <div className='TajInfoPage'>
      <div className='imageContainer'>
        <img src="/images/taj1.png" alt="Taj Mahal" />
        <div className='taj-table'>
        <table  className='overlayTable'>
            <tbody>
              <tr>
                <td width="25%"><b>Location</b></td>
                <td>
                  <p style={{ marginLeft: '2%' }}>Aurangabad, Maharashtra</p>
                </td>
              </tr>
              <tr>
                <td width="25%"><b>Timings</b></td>
                <td>
                  <p style={{ marginLeft: '2%' }}>From 9:00 AM to 5:30 PM; closed on Monday</p>
                </td>
              </tr>
              <tr>
                <td width="25%"><b>Entry Fees</b></td>
                <td>
                  <p style={{ marginLeft: '2%' }}>₹ 10 for Indians; ₹ 300 for foreigners; Weekend tickets will cost you ₹35 for Adults and ₹550 for Foreigners.</p>
                </td>
              </tr>
              <tr>
                <td width="25%"><b>Commissioned by</b></td>
                <td>
                  <p style={{ marginLeft: '2%' }}>Buddhist Monks between 200 B.C to 650 A.D under the patronage of Vakataka Kings</p>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

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


