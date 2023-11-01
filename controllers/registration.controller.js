const express=require('express')
const router=express.Router()

const Registartion=require('../models/registration.model')

router.get('/',(req,res)=>{
    Registartion.find()
    .then(data=>res.send(data))
    .catch(err=>console.log(err))
})

router.post('/insert',(req,res)=>{
    Registartion.create(req.body)
    .then(data=>res.send(data))
    .catch(err=>console.log(err))
})

module.exports=router

