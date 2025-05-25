const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express()   
require("dotenv").config();

const corsOptions = {
  origin: 'http://127.0.0.1:5500',
  origin: 'https://63f7-197-55-27-139.ngrok-free.app'
  ,
  credentials: true
};

app.use(cors(corsOptions));
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {AuthRoutes , AdviceRequestRoutes , CommentRoutes , FormRoutes , SupscriptionRoutes} = require('./Routes/routes')
 
app.use(AdviceRequestRoutes);
app.use(AuthRoutes);
app.use(CommentRoutes);
app.use(FormRoutes);
app.use(SupscriptionRoutes);


const port = process.env.PORT;
mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(port, console.log(`http://localhost:${port}`));
}).catch((err) => {
  console.log(err);
});
