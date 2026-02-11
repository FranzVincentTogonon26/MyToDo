import React, { useState } from 'react'
import { Trash, Trash2, Trash2Icon } from 'lucide-react'
import { useNavigate } from 'react-router'

const NoteCard = ({ note, onDelete }) => {

  const randomTheme = ['#fdf2b3','#d1eaed','#ffdada','#ffd4a9'];

  const [randomColor] = useState(
    () => randomTheme[Math.floor(Math.random() * randomTheme.length)]
  );

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/notes/${note._id}`)
  }

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(note);
  }

  return (
    <div onClick={handleNavigate} style={{ backgroundColor: randomColor }} className="group relative h-60 backdrop-blur-xl border border-slate-200/60 rounded-lg p-5 hover:border-slate-300/60 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1" >
      <div>
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-2xl font-semibold text-slate-900 truncate mb-2" title={note.title}>{note.title}</h2>
          <button onClick={handleDelete} className="opacity-0 group-hover:opacity-100 w-8 h-8 flex items-center justify-center text-slate-900 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200">
              <Trash2Icon className='w-4 h-4' />
          </button> 
        </div>
        {/* Content */}
        <div className="text-justify">
            <div className="flex items-center gap-1.5 text-xs text-slate-900">
                <span>{note.content}</span>
            </div> 
        </div>
      </div>
      {/* Hover Indicator */}
      <div className='absolute inset-0 rounded-xl bg-linear-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-300 pointer-events-none' />
    </div>
  )
}

export default NoteCard