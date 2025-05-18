import Book from "../models/booksModel.js";

export const create = async (req, res) => {
    try {
        const { title, description, full_story, rating } = req.body;

        const bookExist = await Book.findOne({ title });
        if (bookExist) {
            return res.status(400).json({ message: 'BOOK ALREADY EXISTS!' });
        }

        const bookData = new Book({
            title,
            description,
            // full_story,
            rating
        });

        // Handle file upload
        if (req.file) {
            bookData.file = {
                filename: req.file.filename,
                originalname: req.file.originalname,
                path: req.file.path,
                mimetype: req.file.mimetype,
                size: req.file.size
            };
        }

        console.log('Uploaded File:', req.file);

        const savedBook = await bookData.save();
        res.status(201).json(savedBook);
    } catch (error) {
        console.error('Create Book Error:', error);
        res.status(500).json({ error: "INTERNAL SERVER ERROR!" });
    }
};


export const fetch = async (req, res) => {

    try {
        const query = req.body && Object.keys(req.body).length > 0 ? req.body : {};
        const books = await Book.find(query).sort({ id: 1 });
        res.status(200).json({
            status: 1,
            data: {list: books},
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
