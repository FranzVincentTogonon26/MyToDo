import React, {useEffect, useState} from 'react'
import {Loader} from "lucide-react";
import noteService from "../../services/noteService.js";
import {useNavigate, useParams} from "react-router";
import toast from "react-hot-toast";

const UpdateNote = () => {

    const [loading, setLoading] = useState(true);
    const [note, setNote] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const { data } = await noteService.getNoteById(id);
                setNote(data);
            } catch (error) {
                console.error(error);
                toast.error('Failed to fetch notes.');
            } finally {
                setLoading(false);
            }
        }
        void fetchNotes();
    }, [])

    const handleUpdateNote = async  (e) => {
        e.preventDefault();
        if(!note.title.trim() || !note.content.trim()){
            toast.error('All are Required is required');
            return;
        }
        try {
            await noteService.updateNote( id, note );
            toast.success('Note updated successfully.');
            navigate('/notes');
        } catch (error) {
            console.error(error);
            toast.error('Failed to Update Note.');
        } finally {
            setLoading(false);
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

        return (
            <div className=''>
                {/* Form */}
                <form onSubmit={handleUpdateNote} className="space-y-5">

                    {/* Title  */}
                    <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-900 uppercase wide">Title</label>
                        <input
                            type="text"
                            value={note.title}
                            onChange={(e) => setNote({ ...note, title: e.target.value} ) }
                            className="w-full h-11 px-4 border border-slate-200 rounded-lg bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-slate-900 focus:bg-white focus:shadow-lg focus:shadow-slate-500/10"
                            placeholder='Title..'
                        />
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wide"> Description</label>
                        <textarea
                            value={note.content}
                            onChange={(e) => setNote({ ...note, content: e.target.value} ) }
                            rows={6}
                            className="w-full p-4 border border-slate-200 rounded-lg bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-slate-900 focus:bg-white focus:shadow-lg focus:shadow-slate-500/10"
                        />
                    </div>

                    {/* Actions Buttons */}
                    <button
                        className="flex-1 h-11 px-4 text-slate-100 bg-slate-700 hover:bg-slate-800 text-sm font-semibold rounded-lg transition-all duration-200 shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                        type='submit'
                        disabled={loading}
                    >
                        { loading ? (
                            <span className="flex items-center justify-center gap-2">
                                    <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                                    Updating..
                                </span>
                        ) : (
                            "Update Note"
                        )}
                    </button>
                </form>
            </div>
        )
    }
    return (
       <div className=''>
           <div className="absolute top-3.5 md:ml-0 ml-14 ">
               <h1 className="text-3xl font-semibold tracking-tighter bg-slate-900  inline-block text-transparent bg-clip-text">Sticky Wall</h1>
           </div>
           <div className="relative max-w-7xl mx-auto " >
               {renderContent()}
           </div>
       </div>
    )
}
export default UpdateNote
