import React from 'react';
import './TajPage.css';

const TajPage = () => {
  return (
    <div className='TajInfoPage'>
      <div className='imageContainer'>
        <img src="/images/taj1.png" alt="Taj Mahal" />
        <table className='overlayTable'>
          <thead>
            <tr>
              <th>Column 1</th>
              <th>Column 2</th>
              <th>Column 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Row 1, Cell 1</td>
              <td>Row 1, Cell 2</td>
              <td>Row 1, Cell 3</td>
            </tr>
            <tr>
              <td>Row 2, Cell 1</td>
              <td>Row 2, Cell 2</td>
              <td>Row 2, Cell 3</td>
            </tr>
            <tr>
              <td>Row 3, Cell 1</td>
              <td>Row 3, Cell 2</td>
              <td>Row 3, Cell 3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TajPage;
