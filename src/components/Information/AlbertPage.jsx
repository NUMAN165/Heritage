import React from "react";
import "./AlbertPage.css";

const AlbertPage = () => {
  return (
    <div className="AlbertInfoPage">
      <div className="imageContainer">
        <img src="/Images/alberthall.png" alt="Albert Hall" />
        <div className="Albert-table">
          <table className="overlayTable-Albert">
            <tbody>
              <tr className="none">
                <td>Location</td>
                <td>Delhi India</td>
                {/* <td>Row 1, Cell 3</td> */}
              </tr>
              <tr>
                <td>Row 2, Cell 1</td>
                <td>Row 2, Cell 2</td> 
                <td>Row 2, Cell 3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AlbertPage;
