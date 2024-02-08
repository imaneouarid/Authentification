//connection.js
require('dotenv').config();
const mongoose = require('mongoose'); 

// Connect to the database
mongoose.connect(process.env.URI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Not connected to the database " + err);
  });