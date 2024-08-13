<!-- import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using Axios for HTTP requests

const Update = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyCode, setCompanyCode] = useState('');
  const [companyPassword, setCompanyPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const tokenoo = localStorage.getItem("token");
  const image = localStorage.getItem('image'); 
  const name = localStorage.getItem('name'); 
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('CoName', companyName);
    formData.append('CoCode', companyCode);
    formData.append('CoPassword', companyPassword);

    if (selectedImage) {
      formData.append('profileImage', selectedImage);
    }

    try {
      const response = await axios.put('http://localhost:5000/companies/update', formData, {
        headers: {
            'auth-company':tokenoo 
                 },
      });
      const Image = response.data.company.CoImage;
      const Name  = response.data.company.CoName;

      localStorage.removeItem('name'); 
      localStorage.removeItem('image');
      localStorage.setItem("image", Image);
      localStorage.setItem("name", Name);
      window.location = "/"; 

      setSuccessMessage(response.data.message);
      setErrorMessage(''); // Clear any previous errors
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Server error');
      } else {
        setErrorMessage('Network error');
      }
    } finally {
      // Reset form fields (optional)
      setCompanyName('');
      setCompanyCode('');
      setCompanyPassword('');
      setSelectedImage(null);
    }
  };



  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="companyName">Company Name:</label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="companyCode">Company Code:</label>
        <input
          type="text"
          id="companyCode"
          name="companyCode"
          value={companyCode}
          onChange={(e) => setCompanyCode(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="companyPassword">Company Password:</label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="companyPassword"
          name="companyPassword"
          value={companyPassword}
          onChange={(e) => setCompanyPassword(e.target.value)}
          required
        />
        <input
          type="checkbox"
          id="showPassword"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
        <label htmlFor="showPassword">Show Password</label>
      </div> 
      <div>
        <label htmlFor="profileImage">Profile Image:</label>
        <input type="file" id="profileImage" name="profileImage" onChange={handleImageChange} />
      </div>
      <button type="submit">Update Company Profile</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </form>
  );
};

export default Update; -->
