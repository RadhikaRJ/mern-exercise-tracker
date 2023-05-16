const express = require('express');
const cors =require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port =process.env.PORT ||3000;

app.use(cors());
app.use(express.json());

//get URI from MongoDB atlas dashboard

const uri = process.env.ATLAS_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log(`MongoDB server started at ${String(uri)}`);
  })
  .then(() => console.log("Connection to Mongoose successful"))
  .catch((err) =>
    console.log("connection failed. Error message: ", err.message)
  );

const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

app.use('/exercises',exerciseRouter);
app.use('/users',userRouter);

app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
});
