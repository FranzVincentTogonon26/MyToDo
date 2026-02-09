import mongoose from 'mongoose';
import Note from '../models/Note.js'

export const getAllNotes = async (req,res,next) => {
    try {
        const notes = await Note.find();
        return res.status(200).json({
            success: true,
            data: notes,
            statusCode: 200
        })
    } catch (error) {
        next(error)
    }
}

export const getNoteById = async (req,res,next) => {
    try {
        // Validate Object
        if (!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).json;({
                success: false,
                message: 'Note not Found..',
                statusCode: 404
            })
        }

        const note = await Note.findById({ _id: req.params.id });

        if(!note){
            return res.status(404).json({
                success: false,
                message: 'Note not Found..',
                statusCode: 404
            })
        }

        return res.status(200).json({
            success: true,
            data: note,
            statusCode: 200
        });

    } catch (error) {
        next(error)
    }
}

export const createNote = async (req,res,next) => {

    const { title, content } = req.body;

    if(!title || !content){
        return res.status(400).json({
            success: false,
            message: 'Please provide Title and Content',
            statusCode: 400
        })
    }

    const newNote = await Note({title,content});

    await newNote.save();

    return res.status(201).json({
        success: true,
        message: 'Note Created',
        statusCode: 201
    })

}

export const updateNoteById = async (req,res,next) => {
    try {

        const { title, content } = req.body;

        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).json({
                success: false,
                message: 'Note not Found..',
                statusCode: 404
            })
        }

        const updateNote = await Note.findByIdAndUpdate( req.params.id, { title, content } );

        if(!updateNote){
            return res.status(404).json({
                success: false,
                message: 'Note not Found..',
                statusCode: 404
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Note Updated..',
            statusCode: 200
        });

    } catch (error) {
        next(error)
    }
}

export const deleteNoteById = async (req,res,next) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).json({
                success: false,
                message: 'Not Not Found..',
                statusCode: 404
            })
        }

        const note = await Note.findOneAndDelete({ _id:req.params.id });

        if(!note){
            return res.status(404).json({
                success: false,
                message: 'Note Not Found..',
                statusCode: 404
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Note Successfully Deleted..',
            statusCode: 200
        })

    } catch (error) {
        next(error)
    }
}