import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  // State to hold form data
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });   

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', userData);
      console.log(response.data);
      alert('Registration successful!');
      // Reset the form
      setUserData({ username: '', email: '', password: '' });
    } catch (error) {
      console.error('There was an error!', error);
      alert("Registration Failed ,Please try Again");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>
        </div>
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

