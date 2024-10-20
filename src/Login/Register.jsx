import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        userData
      );
      console.log(response.data);
      alert("Registration successful!");
      setUserData({ username: "", email: "", password: "" });
    } catch (error) {
      console.error("There was an error!", error);
      setError("Registration Failed, Please try Again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Register-img">
      <img src="images/taj1.png" alt="" />
      <div className="form-container">
        <h2>Register</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
                required
                className="input-field"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
                className="input-field"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                required
                className="input-field"
              />
            </label>
          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
