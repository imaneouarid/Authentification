//app.js
const express= require("express")
// const cookieParser = require('cookie-parser')
// const userRouter=require('./Routes/UserRoutes')
// const cors = require('cors');

require('dotenv').config();
require('./Connection')
const app=express()
app.use(express.json());
// app.use(cors("*"));

// app.use(cookieParser())




//json middleware
app.use(express.json())

// app.use('/users', userRouter);

app.listen(process.env.PORT, () => {
    console.log('Server is running on port', process.env.PORT)
     
})