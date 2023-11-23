import express from "express";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js'
import { PORT, mongoDBURL } from "./config.js";
import booksRoute from "./routes/booksRoute.js"
const app = express();

//Middleware for parsing request body
app.use(express.json());

//Root route
app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('welcome to mern stack tutorial')
});

app.use('/books', booksRoute)

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



