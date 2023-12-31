import express from "express";
import { Book } from "../models/bookModel.js"

const router = express.Router();

//Route to get all the books
router.get('/', async (req, res) => {
    try{
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length, 
            data: books
        })
    } catch (e) {
        console.log(e.message)
        res.status(500).send(`Error has occured :( ${e.message}`)
    }
})

//Route to get one exact book
router.get('/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const book = await Book.findById(id)
        return res.status(200).json(book)
    } catch(e){
        console.log(e)
    }
});

//Route to save a new book
router.post('/', async (req, res)=>{
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message:'Send all required fields: title, author, publishYear'
            });
        }
        const newBook = {
            title: req.body.title, 
            author: req.body.author, 
            publishYear: req.body.publishYear, 
        }
        const book = await Book.create(newBook); 
        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message})
    }
})

//Route for updating a book
router.put('/:id', async (req, res) => {
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send("You must send all required fields: title, author and publishYear")
        }
        const {id} = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).send("No such book found")
        }

        return res.status(200).send("Book was updated successfully")

    } catch (e) {
        console.log(e.message)
        return res.status(500).send(e.message)
    }
})

//Route for deleting a book
router.delete('/:id', async (req, res)=>{
    try{
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id)
        if(!result){
            return res.status(404).send("Book not found")
        }
        return res.status(200).send('Book has been deleted')
    } catch(e){
        console.log(e.message)
        return res.status(500).send({message: e.message})
    }
})

export default router;