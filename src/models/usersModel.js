import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    user_name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
});

export default mongoose.model("users", userSchema);