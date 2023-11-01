const express = require('express')
const bodyParser=require('body-parser')

const connectDb=require('./db.js')
const registrationRoutes=require('./controllers/registration.controller')
const app=express();

app.use(bodyParser.json());
app.use('/api/employees',registrationRoutes)



connectDb()
.then(()=>{
    console.log('db connection succeeded');
    app.listen(3030,()=>{console.log("server is running on port no 3000")})
})
.catch((err)=>console.log(err))