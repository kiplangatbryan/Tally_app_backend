const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const path = require("path");
const dotenv = require("dotenv");

// local imports
const clientRoutes = require("./routes/index");
const { db } = require("../config/db");

// import config file
dotenv.config({ path: path.join(__dirname, "../config/config.env") });

const app = express();
const port = process.env.PORT || 2222;


app.use(logger("dev"));
app.use(cors( {
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(clientRoutes);


app.get('/hello', (req, res)=>{
  return res.send('good news its working')
})
app.listen(port, () => {
  db();
  console.log(`server is running on port ${port}`);
});
