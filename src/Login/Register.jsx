// import React, { useState } from "react";
// import "./Register.css";

// const Register = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [isFlipping, setIsFlipping] = useState(false);
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//     remember: false,
//   });
//   const [registerData, setRegisterData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     terms: false,
//   });

//   const handleFlip = () => {
//     setIsFlipping(true);
//     setTimeout(() => {
//       setIsLogin(!isLogin);
//       setIsFlipping(false);
//     }, 300);
//   };

//   const handleLoginChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setLoginData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleRegisterChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setRegisterData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleLoginSubmit = () => {
//     console.log("Login submitted:", loginData);
//     // Add your authentication logic here
//   };

//   const handleRegisterSubmit = () => {
//     console.log("Register submitted:", registerData);
//     // Add your registration logic here
//   };

//   return (
//     <div className="auth-container">
//       {/* Left side - Authentication Card */}
//       <div className="auth-section">
//         <div className={`auth-card ${isFlipping ? "flipping" : ""}`}>
//           {isLogin ? (
//             // Login Form
//             <div className="form-container">
//               <div className="form-header">
//                 <h2>Welcome Back</h2>
//                 <p>Sign in to book your heritage experience</p>
//               </div>

//               <div className="auth-form">
//                 <div className="form-group">
//                   <label htmlFor="email">Email Address</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={loginData.email}
//                     onChange={handleLoginChange}
//                     placeholder="Enter your email"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="password">Password</label>
//                   <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     value={loginData.password}
//                     onChange={handleLoginChange}
//                     placeholder="Enter your password"
//                   />
//                 </div>

//                 <div className="form-options">
//                   <div className="remember-me">
//                     <input
//                       type="checkbox"
//                       id="remember"
//                       name="remember"
//                       checked={loginData.remember}
//                       onChange={handleLoginChange}
//                     />
//                     <label htmlFor="remember">Remember me</label>
//                   </div>
//                   <a href="#" className="forgot-password">
//                     Forgot Password?
//                   </a>
//                 </div>

//                 <button
//                   type="button"
//                   className="submit-btn"
//                   onClick={handleLoginSubmit}
//                 >
//                   Sign In
//                 </button>

//                 <div className="divider">
//                   <span>or</span>
//                 </div>

//                 <button type="button" className="google-btn">
//                   <svg width="20" height="20" viewBox="0 0 24 24">
//                     <path
//                       fill="#4285F4"
//                       d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                     />
//                     <path
//                       fill="#34A853"
//                       d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                     />
//                     <path
//                       fill="#FBBC05"
//                       d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                     />
//                     <path
//                       fill="#EA4335"
//                       d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                     />
//                   </svg>
//                   Continue with Google
//                 </button>
//               </div>

//               <div className="switch-form">
//                 <p>
//                   Don't have an account?
//                   <button onClick={handleFlip} className="switch-btn">
//                     Register
//                   </button>
//                 </p>
//               </div>
//             </div>
//           ) : (
//             // Registration Form
//             <div className="form-container">
//               <div className="form-header">
//                 <h2>Create Account</h2>
//                 <p>Join us to explore India's heritage</p>
//               </div>

//               <div className="auth-form">
//                 <div className="form-row">
//                   <div className="form-group">
//                     <label htmlFor="firstName">First Name</label>
//                     <input
//                       type="text"
//                       id="firstName"
//                       name="firstName"
//                       value={registerData.firstName}
//                       onChange={handleRegisterChange}
//                       placeholder="First name"
//                     />
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="regEmail">Email Address</label>
//                   <input
//                     type="email"
//                     id="regEmail"
//                     name="email"
//                     value={registerData.email}
//                     onChange={handleRegisterChange}
//                     placeholder="Enter your email"
//                   />
//                 </div>

//                 {/* <div className="form-group">
//                   <label htmlFor="phone">Phone Number</label>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     value={registerData.phone}
//                     onChange={handleRegisterChange}
//                     placeholder="+91 XXXXX XXXXX"
//                   />
//                 </div> */}

//                 <div className="form-group">
//                   <label htmlFor="regPassword">Password</label>
//                   <input
//                     type="password"
//                     id="regPassword"
//                     name="password"
//                     value={registerData.password}
//                     onChange={handleRegisterChange}
//                     placeholder="Create a password"
//                   />
//                 </div>

//                 {/* <div className="form-group">
//                   <label htmlFor="confirmPassword">Confirm Password</label>
//                   <input
//                     type="password"
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     value={registerData.confirmPassword}
//                     onChange={handleRegisterChange}
//                     placeholder="Confirm your password"
//                   />
//                 </div> */}

//                 <div className="form-options">
//                   <div className="terms-check">
//                     <input
//                       type="checkbox"
//                       id="terms"
//                       name="terms"
//                       checked={registerData.terms}
//                       onChange={handleRegisterChange}
//                     />
//                     <label htmlFor="terms">
//                       I agree to the <a href="#">Terms & Conditions</a> and{" "}
//                       <a href="#">Privacy Policy</a>
//                     </label>
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   className="submit-btn"
//                   onClick={handleRegisterSubmit}
//                 >
//                   Create Account
//                 </button>

//                 <div className="divider">
//                   <span>or</span>
//                 </div>

//                 <button type="button" className="google-btn">
//                   <svg width="20" height="20" viewBox="0 0 24 24">
//                     <path
//                       fill="#4285F4"
//                       d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                     />
//                     <path
//                       fill="#34A853"
//                       d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                     />
//                     <path
//                       fill="#FBBC05"
//                       d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                     />
//                     <path
//                       fill="#EA4335"
//                       d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                     />
//                   </svg>
//                   Sign up with Google
//                 </button>
//               </div>

//               <div className="switch-form">
//                 <p>
//                   Already have an account?
//                   <button onClick={handleFlip} className="switch-btn">
//                     Sign In
//                   </button>
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Right side - Monument Image */}
//       <div className="image-section">
//         <div className="image-overlay">
//           <div className="overlay-content">
//             <h1>Discover India's Heritage</h1>
//             <p>
//               Book tickets to explore magnificent monuments, museums, and
//               archaeological wonders across India
//             </p>
//             <div className="features">
//               <div className="feature">
//                 <span>🏛️</span>
//                 <p>1000+ Monuments</p>
//               </div>
//               <div className="feature">
//                 <span>🎫</span>
//                 <p>Easy Booking</p>
//               </div>
//               <div className="feature">
//                 <span>📱</span>
//                 <p>Digital Tickets</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <img
//           src="https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
//           alt="Taj Mahal - India's Heritage Monument"
//           className="monument-image"
//         />
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "(775) 351-6501",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  return (
    <div className="auth-container">
      <div className="auth-modal">
        <div className="auth-tabs">
          <button
            className={`tab ${isSignUp ? "active" : ""}`}
            onClick={() => setIsSignUp(true)}
          >
            Sign up
          </button>
          <button
            className={`tab ${!isSignUp ? "active" : ""}`}
            onClick={() => setIsSignUp(false)}
          >
            Sign in
          </button>
        </div>

        <h2 className="auth-title">
          {isSignUp ? "Create an account" : "Sign in to your account"}
        </h2>

        <div className="auth-form">
          {isSignUp && (
            <div className="name-fields">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="input-field"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
          )}

          <div className="email-field">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className="input-field email-input"
            />
          </div>

          {isSignUp && (
            <div className="phone-field">
              <select className="country-code">
                <option value="US">🇺🇸</option>
              </select>
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleInputChange}
                className="input-field phone-input"
              />
            </div>
          )}

          {!isSignUp && (
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className="input-field"
            />
          )}

          <button onClick={handleSubmit} className="submit-btn">
            {isSignUp ? "Create an account" : "Sign in"}
          </button>
        </div>

        <div className="divider">
          <span>OR {isSignUp ? "SIGN UP" : "SIGN IN"} WITH</span>
        </div>

        <div className="social-buttons">
          <button className="social-btn google-btn">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285f4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34a853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#fbbc05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#ea4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </button>
          <button className="social-btn apple-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
          </button>
        </div>

        <p className="terms">
          By {isSignUp ? "creating an account" : "signing in"}, you agree to our
          Terms & Service
        </p>
      </div>
    </div>
  );
};

export default Register;
