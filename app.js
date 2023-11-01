const express = require('express')
const bodyParser=require('body-parser')

const connectDb=require('./db.js')
const registrationRoutes=require('./controllers/registration.controller')
const deviceRoutes=require('./controllers/device.controller.js')
const app=express();

const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());
app.use('/',registrationRoutes)
app.use('/',deviceRoutes)



connectDb()
.then(()=>{
    console.log('db connection succeeded');
    app.listen(3030,()=>{console.log("server is running on port no 3030")})
})
.catch((err)=>console.log(err))