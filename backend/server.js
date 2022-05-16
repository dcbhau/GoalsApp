const express = require('express');
const dotenv = require('dotenv').config()
const {errorHandler} = require("./middleware/errorMiddleware")
const connectDB = require('./config/db');

connectDB();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/goals',require('./routes/goalRoutes'));
app.use('/api/users',require('./routes/userRoutes'));

app.use(errorHandler)


app.listen(port,()=>
{
    console.log(`server is running on port ${port}`);
})