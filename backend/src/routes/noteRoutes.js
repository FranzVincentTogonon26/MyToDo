import express from 'express';

import protectedRoutes from '../middleware/authentication.js'
import { getAllNotes,getNoteById,createNote,updateNoteById,deleteNoteById } from '../controller/noteController.js'

const router = express.Router();

// Make sure All Routes are protected
router.use(protectedRoutes)

router.get('/', getAllNotes );
router.get('/:id', getNoteById);
router.post('/create', createNote);
router.put('/:id', updateNoteById);
router.delete('/:id', deleteNoteById);

export default router;