const express=require('express')
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


router.post("//insert", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
  
    try {
      const existingUser = await Registartion.findOne({ username });
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

module.exports=router

