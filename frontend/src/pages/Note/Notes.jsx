import React, {useEffect, useState} from 'react'
import toast from "react-hot-toast";

import noteService from '../../services/noteService';
import { Loader, Plus, StickyNote } from 'lucide-react';

import NoteCard from '../components/Note/NoteCard';
import CreateNote from '../components/Note/CreateNote';
import DeleteNote from "../components/Note/DeleteNote";

const Notes = () => {

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add Note
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createNote, setCreateNote] = useState(false);

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
    fetchNotes().catch(console.error);
  }, []);

  const handleDeleteRequest = (note) => {
    setSelectedNote(note);
    setIsDeleteModalOpen(true);
  }

  const handleCreateNote = async (e) => {
    e.preventDefault();
  }

  const handleConfirmDelete = async () => {
    if(!selectedNote) return;
    setDeleting(true);
    try {
      await noteService.deleteNote(selectedNote._id);
      toast.success('Deleting note.');
      setSelectedNote(null);
      setIsDeleteModalOpen(false);
      setNotes(notes.filter( (prev) => prev._id !== selectedNote._id ));
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete note.');
    } finally {
      setDeleting(false);
    }
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
          notes?.map((note, index) => (
              <NoteCard 
                key={index}
                note={note}
                onDelete={handleDeleteRequest}
              />
          ))
        }
        <button type='button' onClick={() => setOpenModal(true)}  className="group relative h-60 bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-lg p-5 text-slate-500 hover:text-slate-900 hover:border-slate-300/60 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1" >
          <div className="flex items-center justify-center min-h-full">
              <div className="flex items-center gap-1.5 text-xs ">
                  <Plus className='size-16' strokeWidth={1} />
              </div>
          </div>
          <div className='absolute inset-0 rounded-xl bg-linear-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-300 pointer-events-none' />
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="absolute top-3 md:ml-0 ml-14 ">
        <h1 className="text-3xl font-semibold tracking-tighter bg-slate-900  inline-block text-transparent bg-clip-text">Sticky Wall</h1>
      </div>
      <div className="relative max-w-7xl mx-auto " >
        {renderContent()}
      </div>

      {/* Create Note By Modal */}
      <CreateNote
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleCreateNote={handleCreateNote}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          createNote={createNote}
      />

      {/* Modal Delete */}
      <DeleteNote
          selectedNote={selectedNote}
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          handleConfirmDelete={handleConfirmDelete}
          deleting={deleting}
      />

    </div>
  )
}

export default Notes