import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import './App.css'

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Perform sign-in action (e.g., API call)
      console.log("Sign-In successful");

      // Clear input fields after successful sign-in
      setEmail("");
      setPassword("");

      // Close the modal
      handleClose();
    }
  };

  return (
    <div className="App">
      <button className="btn btn-primary" onClick={handleShow}>
        Sign In
      </button>

      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Welcome back!</h3>
            </div>
            <div className="modalbody">
              <form onSubmit={handleSubmit}>
                <label>
                  Email:
                  <br />
                  <input
                    type="email"
                    placeholder="Enter your Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <span className="error">{errors.email}</span>}
                </label>
                <br />
                <label>
                  Password:
                  <br />
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <span className="error">{errors.password}</span>
                  )}
                </label>
                <div className="Forget-Pass">
                  <Button variant="link">Forget Your Password?</Button>
                </div>
                <div className="btnlog">
                  <Button type="submit" variant="primary">Log In</Button>
                </div>
              </form>
              <hr />
              <div className="Registerlink">
                <p>Don't have an account?</p>
                <Button variant="link">Register Here</Button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
