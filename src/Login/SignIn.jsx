import React, { useState } from 'react';
import axios from 'axios';
import './SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Reset error messagez

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

    const finalUser = {
      email: email,
      password:password
    }

    // Log the input values
    console.log('Email:', email);
    console.log('Password:', password);

    try {
      const response = await axios.post('http://localhost:5000/api/login', finalUser)
      if(response){        
        alert(response?.data?.message)
      }
    } catch (error) {
      console.log();
      
      alert(error, 'error')
    }

    // // Reset the form
    // setEmail('');
    // setPassword('');
  };

  return (
    <div className='SignIn-Main'>
      <div className='SignIn-FirstHalf'>
        <div className='numan'>
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
      </div>
      <div className='SignIn-SecondHalf'>
        <img src="/Images/MysorePalace2.png" alt="Mysore Palace" />
      </div>
    </div>
  );
}

export default SignIn;
