import React from 'react';
import './SignIn.css';

const SignIn = () => {
 
  return (
    <>
      <div className='SignIn-Main'>
        <div className='SignIn-FirstHalf'>
          <h3>Welcome Back!</h3>
          <h6>Sign In For Heritage-Pass</h6>
          <form className='SignIn-Form'>
            <label htmlFor='username'>Email:</label>
            <input type='text' id='username' name='username' required placeholder='Enter Your Email' />

            <label htmlFor='password'>Password:</label>
            <input type='password' id='password' name='password' required placeholder='Enter Your Password' />

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
    </>
  );
}

export default SignIn;
