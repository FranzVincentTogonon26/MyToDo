import { X } from "lucide-react";

const DeleteNote = ({
                        selectedNote,
                        isDeleteModalOpen,
                        setIsDeleteModalOpen,
                        handleConfirmDelete,
                        deleting
                    }) => {

    if (!isDeleteModalOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-white rounded-2xl p-8">

                {/* Close */}
                <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="absolute top-6 right-6"
                >
                    <X />
                </button>

                <h2 className="text-xl font-medium mb-4 tracking-tight">Confirm Deletion</h2>

                <p className="mb-6 text-sm text-slate-600">
                    Delete <strong>{selectedNote?.title}</strong>? This cannot be undone.
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={() => setIsDeleteModalOpen(false)}
                        disabled={deleting}
                        className='flex-1 h-11 px-4 border border-slate-200 rounded-xl bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleConfirmDelete}
                        disabled={deleting}
                        className='flex-1 h-11 px-4 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]'
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
    );
};

export default DeleteNote;