import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './../../middleware/AuthContext'; // Replace with your AuthContext if applicable

const Test = () => {
  const [authMode, setAuthMode] = useState('signup'); // 'signup' or 'login'
  const [companyName, setCompanyName] = useState('');
  const [companyCode, setCompanyCode] = useState('');
  const [companyPassword, setCompanyPassword] = useState('');
  const [companyImage, setCompanyImage] = useState(null);
  const [error, setError] = useState(null);
  const { setIsLoggedIn, setUser } = useContext(AuthContext); // Assuming AuthContext

  const handleAuthModeChange = (newMode) => {
    setAuthMode(newMode);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    if (authMode === 'signup') {
      formData.append('CoName', companyName);
      formData.append('CoCode', companyCode);
      formData.append('CoPassword', companyPassword);

      // Check if image is selected
      if (companyImage) {
        formData.append('profileImage', companyImage);
      }

      try {
        const response = await axios.post('http://localhost:5000/companies/signup', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Important for image uploads
          },
        });

        setIsLoggedIn(true);
        setUser(response.data.user || {});
        setError(null);

        // Clear form data after successful signup
        setCompanyName('');
        setCompanyCode('');
        setCompanyPassword('');
        setCompanyImage(null);
      } catch (error) {
        console.error(error);
        setError(error.response?.data?.message || 'Signup failed');
      }
    } else if (authMode === 'login') {
      try {
        const response = await axios.post('http://localhost:5000/companies/login', {
          CoCode: companyCode,
          CoPassword: companyPassword,
        });

        setIsLoggedIn(true);
        setUser(response.data.user || {});
        setError(null);

        // Clear form data after successful login
        setCompanyCode('');
        setCompanyPassword('');
      } catch (error) {
        console.error(error);
        setError(error.response?.data?.message || 'Login failed');
      }
    }
  };

  const handleImageChange = (event) => {
    setCompanyImage(event.target.files[0]);
  };

  return (
    <div className="auth-form">
      <h2 className="auth-form-title">{authMode === 'signup' ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
  
        {authMode === 'signup' && (
          <>
            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Company Code"
              value={companyCode}
              onChange={(e) => setCompanyCode(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={companyPassword}
              onChange={(e) => setCompanyPassword(e.target.value)}
              required
            />
            <input type="file" onChange={handleImageChange} />
          </>
        )}
  
        {authMode === 'login' && (
          <>
            <input
              type="text"
              placeholder="Company Code"
              value={companyCode}
              onChange={(e) => setCompanyCode(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={companyPassword}
              onChange={(e) => setCompanyPassword(e.target.value)}
              required
            />
          </>
        )}
  
        <button type="submit">{authMode === 'signup' ? 'Sign Up' : 'Login'}</button>
      </form>
  
      <button
        className="auth-mode-switch"
        onClick={() => handleAuthModeChange(authMode === 'signup' ? 'login' : 'signup')}
      >
        {authMode === 'signup' ? 'Switch to Login' : 'Switch to Signup'}
      </button>
    </div>
  );}

  export default Test