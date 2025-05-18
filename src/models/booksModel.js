import mongoose from "mongoose";
const AutoIncrement = (await import('mongoose-sequence')).default(mongoose);

const fileSchema = new mongoose.Schema({
    filename: String,
    originalname: String,
    path: String,
    mimetype: String,
    size: Number
}, { _id: false });

const bookSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    // full_story: {
    //     type: [mongoose.Schema.Types.Mixed],
    //     require: true
    // },
    rating: {
        type: Number,
        require: true
    },
    file: fileSchema
});

bookSchema.plugin(AutoIncrement, { inc_field: 'id' });

export default mongoose.model("books", bookSchema);