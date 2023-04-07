require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors');
const connectDB = require('./db.js');
const userRouter = require('./router/userRouter.js');
const contactRouter = require('./router/directoryRouter.js');


const app = express();


app.use(express.json());
app.use(cors());


app.use('/user', userRouter)
app.use('/contact', contactRouter)





const port = process.env.APP_PORT || 5000;

app.listen(port, () => {
    console.log('5000. portta hazır');
    connectDB;
})