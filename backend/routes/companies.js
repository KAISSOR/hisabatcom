const router = require("express").Router();
const Company  = require("../models/companies");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const authCompany = require('./../middleware/authCompany')
const uploadMiddleware = require('../middleware/MulterMiddleware')

router.post("/signup" , uploadMiddleware.single('profileImage') , async(req , res) => {
try{
    const CoName = req.body.CoName
    const CoCode = req.body.CoCode
    const CoPassword = req.body.CoPassword
    const CoImage = req.file.filename
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash( CoPassword , salt );
    const company = await Company.findOne({ CoCode });  

    if (company){
        return res.status(409).send({ message: " company with this code already exist! "});
    };
    if (!CoName) {
        return res.status(404).json({ message: "Company name not found" });
    };
    if (!CoCode) {
            return res.status(404).json({ message: "Company Code not found" });
    };
    if (!hashPassword) {
        return res.status(404).json({ message: "Company password not found" });
    };

    const newCompany = new Company({
        CoName : CoName,
        CoCode : CoCode,
        CoPassword : hashPassword,
        CoImage : CoImage
    });

    await newCompany.save();
    res.status(201).send({ message: "Company created successfully" });

}catch(error){
console.error(error);
res.status(500).json({ message: 'Server error' }); 
}
});

router.put('/update', authCompany , uploadMiddleware.single('profileImage') , async (req, res) => {
    try {
  
        const CoName = req.body.CoName
        const CoCode = req.body.CoCode
        const CoPassword = req.body.CoPassword
        const CoImage = req.file.filename
        const company = await Company.findOne({ CoCode });
        
        company.CoName = CoName;
        company.CoPassword = CoPassword;
        company.CoImage = CoImage;
    
  
      if (!company) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
   
      await company.save();
      res.status(200).json({ message: 'company profile updated successfully' }); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' }); // Generic error for security
    }
}); 

router.post('/login', async(req, res) => {
    try {
      // 1. Extract credentials and validate  
      const CoCode = req.body.CoCode
      const CoPassword = req.body.CoPassword

      if (!CoCode || !CoPassword) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // 2. Find company by code
      const company = await Company.findOne({ CoCode });  
      if (!company) {
        return res.status(401).json({ message: 'Invalid company code2' }); // Generic message for security
      }
  
      // 3. Compare password using bcrypt
      const isPasswordValid = await bcrypt.compare(CoPassword, company.CoPassword);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' }); // Generic message for security
      }
  
      // 4. Generate and send token
      const token = jwt.sign({ CoCode }, 'KAISOOR'); // Assuming 'KAISOOR' is your secret key
  
      console.log("Login successful")
      res.status(200).json({ message: 'Login successful' , token});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' }); // Generic error for security
    }
});
  
router.post('/logout' , authCompany , (req, res) => {
try {
    res.clearCookie('auth-company');
    res.status(200).send({ message: 'Logged out successfully' });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
}
});

module.exports = router;
