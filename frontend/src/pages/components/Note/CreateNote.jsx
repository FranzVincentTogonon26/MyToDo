import { X } from "lucide-react";

const CreateNote = ({
                        openModal,
                        setOpenModal,
                        handleCreateNote,
                        title,
                        setTitle,
                        content,
                        setContent,
                        createNote
                    }) => {

    if (!openModal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-2xl shadow-slate-900/20 p-8">
                {/* Close button */}
                <button
                    onClick={() => setOpenModal(false)}
                    className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200"
                >
                    <X className='w-5 h-5' strokeWidth={2} />
                </button>

                {/* Modal Header */}
                <div className="mb-6">
                    <h2 className="text-3xl font-medium text-slate-900 tracking-tight">New Note</h2>
                </div>

                {/* Form */}
                <form onSubmit={handleCreateNote} className="space-y-5">

                    {/* Title  */}
                    <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-900 uppercase wide">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full h-12 px-4 border border-slate-200 rounded-lg bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10"
                            placeholder='Title..'
                        />
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wide"> Description</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            rows={8}
                            className="w-full px-4 border border-slate-200 rounded-lg bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10"
                        />
                    </div>

                    {/* Actions Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button
                            className="flex-1 h-11 px-4 border border-slate-200 rounded-lg bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            type='button'
                            onClick={() => setOpenModal(false)}
                            disabled
                        >
                            Cancel
                        </button>

                        <button
                            className="flex-1 h-11 px-4 text-slate-100 bg-slate-700 hover:bg-slate-800 text-sm font-semibold rounded-lg transition-all duration-200 shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                            type='submit'
                            disabled={createNote}
                        >
                            {createNote ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                                    Creating..
                                </span>
                            ) : (
                                "Create Note"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default CreateNote
