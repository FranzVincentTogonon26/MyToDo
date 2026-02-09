import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    }
}, {
    timestamps: true
})

const Note = mongoose.model('Note', noteSchema);

export default Note;