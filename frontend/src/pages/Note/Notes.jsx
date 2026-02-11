import React, {useEffect, useState} from 'react'
import toast from "react-hot-toast";

import noteService from '../../services/noteService';
import NoteCard from '../components/Note/NoteCard';
import { CheckCheckIcon, Loader, Plus, StickyNote } from 'lucide-react';

const Notes = () => {

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // const [delete, setDelete] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const data = await noteService.getNotes();
        setNotes(data);
      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch notes.');
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, []);

  const handleDeleteRequest = (note) => {
    setSelectedNote(note);
    setIsDeleteModalOpen(true);
  }

  const renderContent = () => {
    if(loading){
      return (
          <div className="flex items-center justify-center h-200">
            <Loader className="animate-spin" />
          </div>
      )
    }


    if(notes.length === 0){
      return (
        <div className="flex items-center justify-center min-h-200">
          <div className="text-center max-w-md">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-slate-100 to-slate-200 shadow-lg shadow-slate-200/50 mb-6">
              <StickyNote className='w-10 h-10 text-slate-400' strokeWidth={2} />
            </div>
            <h3 className="text-lg font-medium text-slate-900 tracking-tight mb-2">No Notes Yet</h3>
            <p className="text-sm text-slate-500 mb-6">Get started to add Note..</p>
            <button onClick={() => setOpenModal(true)} className="group inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-500 font-semibold hover:text-slate-900 text-sm rounded-lg transition-all duration-200">
              <Plus className='size-4 group-hover:scale-120' strokeWidth={2.5} />
              Add Note
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {
          notes?.data.map((note, index) => (
              <NoteCard 
                key={index}
                note={note}
                onDelete={handleDeleteRequest}
              />
          ))
        }
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="relative max-w-7xl mx-auto" >
        {renderContent()}
      </div>
    </div>
  )
}

export default Notes