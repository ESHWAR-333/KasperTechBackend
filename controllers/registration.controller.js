const express=require('express')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router=express.Router()

const Registartion=require('../models/registration.model')

router.get('/',(req,res)=>{
    Registartion.find()
    .then(data=>res.send(data))
    .catch(err=>console.log(err))
})

// router.post('/insert',(req,res)=>{
//     Registartion.create(req.body)
//     .then(data=>res.send(data))
//     .catch(err=>console.log(err))
// })


router.post("/insert", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
  
    try {
      const existingUser = await Registartion.findOne({ email });
      if (existingUser) {
        return res.status(400).send("User already exists");
      }
  
      if (password.length < 6) {
        return res.status(400).send("Password is too short");
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new Registartion({
        firstName, lastName, email, password: hashedPassword,
      });
      await newUser.save();
  
      res.status(201).send("User created successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  });


  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await Registartion.findOne({ email });
      if (!user) {
        return res.status(400).send("Invalid user");
      }
  
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        const payload = { email: user.email };
        const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
        res.json({ jwtToken });
      } else {
        res.status(400).send("Invalid password");
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  });

module.exports=router

