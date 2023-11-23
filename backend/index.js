import express from "express";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import { PORT, mongoDBURL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';
const app = express();

//Middleware for parsing request body
app.use(express.json());

//middleware for routes
app.use('/books', booksRoute)

//Middleware for CORS
app.use(cors({
    origin: 'https://localhost:3000',
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type'],
}));
//Root route
app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('welcome to mern stack tutorial')
});



mongoose.connect(mongoDBURL)
    .then(()=>{
        console.log('Successfully connected to db!')
        app.listen(PORT, ()=>{
            console.log(`Server has started on port ${PORT}`)
        });
    })
    .catch((error)=>{
        console.log(error)
    })



