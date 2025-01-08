import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    generation: {
        type: Number,
        require: true
    },
    rating: {
        type: Number,
        require: true
    },
});

export default mongoose.model("books", bookSchema);