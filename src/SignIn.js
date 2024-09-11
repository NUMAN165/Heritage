import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';

function App() {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className="App">
      <button className="btn btn-primary" onClick={handleShow}>
        Sign In
      </button>

      {/* Modal */}
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Welcome back !</h3>
            </div>
            <div className="modalbody">
              <label>
                Email:
                <br />
                <input type="email" placeholder="Enter your Email address" />
              </label>
              <br />
              <label>
                Password:
                <br />
                <input type="Password" placeholder="Enter Your Password" />
              </label>
            </div>
            <div className="checkbox"> 
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <Button variant="link">Forget Your Password ?</Button>
            </div>
            <div className="btnlog">
              <button type="button">Log In</button>
            </div>
            <hr />
            <div className="Registerlink">
            <p>Dont have an account ?</p>
            <Button variant="link">Register Here</Button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Close
              </button>
              {/* <button type="button" className="btn btn-primary">
                Save changes
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
