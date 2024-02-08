//app.js
const express= require("express")
const authRoutes = require('./Routes/UserRoutes');
const roleRoutes = require('./Routes/roleRoutes');
const permissionRoutes = require('./Routes/permissionRoutes');
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
app.use('/auth', authRoutes);
app.use('/role', roleRoutes);
app.use('/permission', permissionRoutes);

// app.use('/users', userRouter);

app.listen(process.env.PORT, () => {
    console.log('Server is running on port', process.env.PORT)
     
})