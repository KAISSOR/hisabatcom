const router = require("express").Router();
const { User } = require("../models/user");
const joi = require("joi");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

router.post("/" , async (req , res) => {
    try{
        const{ error } = validate(req.body);
        if(error)
            return res.status(400).send({ message: error.details[0].message});

        const user = await User.findOne({ email: req.body.email });
        if(!user)
            return res.status(401).send({message: "invalid Email or Passwordddd"});

        const plainTextPassword = req.body.password
        const hashedPassword = user.password
        console.log(plainTextPassword)
        console.log(hashedPassword)
        bcrypt.compare(plainTextPassword, hashedPassword, (err, result) => {
            if (err) {
              console.error('Error comparing passwords:', err);
              return;
            }
            if (result) {
              console.log('Passwords match!');
            } else {
              console.log('Passwords do not match.');
            }
          });


        // const validPassword = await bcrypt.compare(
        // req.body.password , user.password
        // )
        // console.log(user.password)
        // console.log(req.body.password)

        // if(validPassword)
        //     return res.status(401).send({message: "invalid Email or Password"})
        // console.log("token")
        // const secretKey = process.env.JWTPRIVATEKEY;
        // const token = jwt.sign(user._id, secretKey, { expiresIn: '1h' }); // Set expiration time (e.g., 1 hour)
        // // const token = user.generateAuthToken();
        // console.log(token)

        const token = jwt.sign({ _id :req.body._id} , process.env.JWTPRIVATEKEY)
        res.status(200).send({token})
    }catch(error){
        res.status(500).send({message: "internal Server Errorr"})
    }
})


const validate = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label("Email"),
        password:  joi.string().required().label("Password")
    }); 
    return schema.validate(data)
}

module.exports = router;
