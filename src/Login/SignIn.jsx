import React, { useState } from 'react';
import './SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(''); // Reset error message

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasNumber = /\d/;

    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!hasNumber.test(email)) {
      setError('Email must contain at least one number.');
      return;
    }

    // Log the input values
    console.log('Email:', email);
    console.log('Password:', password);

    // Simulate successful login
    alert('Login successful!');

    // Reset the form
    setEmail('');
    setPassword('');
  };

  return (
    <div className='SignIn-Main'>
      <div className='SignIn-FirstHalf'>
        <h3>Welcome Back!</h3>
        <h6>Sign In For Heritage-Pass</h6>
        <form className='SignIn-Form' onSubmit={handleSubmit}>
          <label htmlFor='username'>Email:</label>
          <input
            type='text'
            id='username'
            name='username'
            required
            placeholder='Enter Your Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          {error && <div className="error-message">{error}</div>}

          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            required
            placeholder='Enter Your Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className='Forgot-Password'>
            <a href='/forgot-password'>Forgot Password?</a>
          </div>

          <button type='submit'>Login</button>
        </form>
      </div>
      <div className='SignIn-SecondHalf'>
        <img src="/Images/MysorePalace2.png" alt="Mysore Palace" />
      </div>
    </div>
  );
}

export default SignIn;
