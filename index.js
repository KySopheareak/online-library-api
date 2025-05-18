import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import UserRoute from './src/routes/usersRoute.js';
import BookRoute from './src/routes/booksRoute.js'
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
dotenv.config();
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 2000;
const MONGOURL = process.env.MONGO_URL;
console.log('MONGO_URL: ', MONGOURL);


const corsOptions = {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};


export let connection;
export const connect = () => {
    mongoose.Promise = global.Promise
    mongoose.connect(MONGOURL);
};

mongoose.connection.on("connected", () => {
    console.info("Mongoose default connection open to database");
    connection = mongoose.connection
});

// If the connection throws an error
mongoose.connection.on("error", (err) => {
    console.info("Mongoose default connection error: " + err);
    setTimeout(() => connect(), 5000);
});

mongoose.connection.on("reconnected", () => {
    console.info("Mongoose reconnected!");
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
    connection = null;
    console.info("Mongoose default connection disconnected");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.info("Mongoose default connection disconnected through app termination");
        process.exit(0);
    });
});

app.listen(PORT, () => {
    console.log(`SERVER IN RUNNING ON PORT ${PORT}`);
});

connect();

app.use(cors(corsOptions));
app.use("/api/users", UserRoute);
app.use("/api/books", BookRoute);

