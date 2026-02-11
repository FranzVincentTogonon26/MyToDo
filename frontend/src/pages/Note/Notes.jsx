import React, {useEffect, useState} from 'react'
import toast from "react-hot-toast";

import noteService from '../../services/noteService';
import NoteCard from '../components/Note/NoteCard';
import { CheckCheckIcon, Loader, Plus, StickyNote, Trash2Icon, X } from 'lucide-react';

const Notes = () => {

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add Note
  const [openModal, setOpenModal] = useState(false);

  // Deleting Note
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
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

  const handleConfirmDelete = () => {

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
        <div  className="group relative h-60 bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-lg p-5 text-slate-500 hover:text-slate-900 hover:border-slate-300/60 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1" >
          <div className="flex items-center justify-center min-h-full">
              <div className="flex items-center gap-1.5 text-xs ">
                  <Plus className='size-16' strokeWidth={1} />
              </div> 
          </div>
          <div className='absolute inset-0 rounded-xl bg-linear-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-300 pointer-events-none' />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">

      <div className="relative max-w-7xl mx-auto " >
        {renderContent()}
      </div>

      {/* Modal Delete */}

      { isDeleteModalOpen && ( 
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-2xl shadow-slate-900/20 p-8">
  
            {/* Close Button */}
            <button 
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200"
            >
              <X className='w-5 h-5' strokeWidth={2} />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <h2 className="text-xl font-medium text-slate-900 tracking-tight">Confirm Deletion</h2>
            </div>

            {/* Content */}
            <p className="text-sm text-slate-600 mb-6">
              Are you sure you want to delete {" "}
              <span className="font-semibold text-slate-900 italic">{selectedNote?.title}</span>
              ? This action cannot be undo.
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button 
                className="flex-1 h-11 px-4 border-2 border-slate-200 rounded-xl bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                type='button'
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button 
                className="flex-1 h-11 px-4 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                onClick={handleConfirmDelete}
                disabled={deleting}
              >
                { deleting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                    Deleting..
                  </span>
                ) : (
                  "Delete"
                ) }
              </button>
            </div>

          </div>
        </div> 
        ) 
      }

    </div>
  )
}

export default Notes