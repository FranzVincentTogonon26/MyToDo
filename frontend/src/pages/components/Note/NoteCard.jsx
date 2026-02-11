import React from 'react'
import { Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router'

const NoteCard = ({ note, onDelete }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/notes${note._id}`)
  }

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(document);
  }

  return (
    <div onClick={handleNavigate} className="group relative bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-5 hover:border-slate-300/60 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1" >
      <div>
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-base font-semibold text-slate-900 truncate mb-2" title={note.title}>{note.title}</h3>
          <button onClick={handleDelete} className="opacity-0 group-hover:opacity-100 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200">
              <Trash2 className='w-4 h-4' />
          </button> 
        </div>
      </div>
      {/* Content */}
      <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span>{note.content}</span>
          </div> 
      </div>
      {/* Hover Indicator */}
      <div className='absolute inset-0 rounded-xl bg-linear-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-300 pointer-events-none' />
    </div>
  )
}

export default NoteCard