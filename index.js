const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')

//routes
const authRoute = require('./routes/auth.js')
const usersRoute = require('./routes/users.js')

const app = express()
dotenv.config()

// connecting with mongodb
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("Connected to mongoDB.");
    }catch (error) {
        console.log(error)
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);

//to handle errors
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(process.env.PORT, () => {
    connect()
    console.log('Connected to backend :D')
})