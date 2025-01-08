import { title } from "process";
import Book from "../models/booksModel.js";

export const create = async (req, res) => {
    try {
        const bookData = new Book(req.body);
        const { title } = req.body;
        const bookExist = await Book.findOne({ title: title });
        if(bookExist){
            return res.status(400).json({ message: 'BOOK ALREADY EXIST!' });
        }
        const savedbook = await bookData.save();
        res.status(200).json(savedbook);

    } catch (error) {
        console.log('ERRR: ', error)
        res.status(500).json({ error: "INTERNAL SERVER ERROR!" })
    }
};

export const fetch = async (req, res) => {

    try {
        const query = req.body && Object.keys(req.body).length > 0 ? req.body : {};
        console.log('=====> query: ', query)
        const books = await Book.find(query).sort({ id: 1 });
        res.status(200).json({
            status: 1,
            data: books,
        });
    } catch (err) {
        console.error('ERR: ', err);
        res.status(500).json({ status: 0, message: "INTERNAL SERVER ERROR...!" });
    }
};


export const update = async (req, res) => {
    try {
        const _id = req.params._id;
        
        // Check if the book exists
        const bookExist = await Book.findOne({ _id });
        if (!bookExist) {
            return res.status(404).json({ message: 'BOOK NOT FOUND!' });
        }

        // Update the book
        const updatebook = await Book.findOneAndUpdate({ _id }, req.body, { new: true });

        // Respond with the updated book
        res.status(200).json(updatebook);
    } catch (error) {
        console.error('=============> ERR: ', error);
        res.status(500).json({ message: "INTERNAL SERVER ERROR...!" });
    }
};
