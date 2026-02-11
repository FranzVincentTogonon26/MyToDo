import React from 'react'
import { Calendar, CheckCheckIcon, CheckCircle2Icon, CheckIcon, LogOut, Notebook, Settings, StickyNote } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router'
import { useAuth } from '../../../context/useAuth'

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {

const { logout } = useAuth();
const navigate = useNavigate();

const navLinks = [
    { to: '/notes', icon: StickyNote, text: 'Sticky Wall'},
    { to: '/calendars', icon: Calendar, text: 'Calendar'}
];

const handleLogout = () => {
    logout();
    navigate('/login');
}

  return (
    <>
        {/*  */}
        <div 
            className={`fixed inset-0 bg-black/30 z-40 mf:hidden transition-opacity duration-300 ${ isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none' }`}
            onClick={toggleSidebar}
            aria-hidden="true"
        />
        <aside className={`fixed top-0 left-0 h-full w-64 bg-white/90 backdrop-blur-lg border-r border-slate-200/60 z-50 md:relative md:w-64 md:shrink-0 md:flex md:flex-col md:translate-x-0 transition-transform duration-300 ease-in-out ${ isSidebarOpen ? 'translate-x-0' : '-translate-x-full' }`}>
            <div className="flex items-center justify-start h-16 px-5 border-b border-slate-200/60">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9">
                        <CheckCheckIcon className='w-5 h-5 text-slate-700' strokeWidth={3} />
                    </div>
                    <h1 className="text-sm md:text-base font-bold tracking-tight bg-linear-to-r from-slate-900 via-slate-600 to-indigo-500 inline-block text-transparent bg-clip-text">My ToDo</h1>
                </div>
            </div>
            <nav className="flex-1 px-3 py-6 space-y-1.5">
                {
                    navLinks.map((link) => (
                        <NavLink 
                            key={link.to}
                            to={link.to}
                            className={
                                ({ isActive }) => 
                                    `group flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-all duration-200
                                        ${ isActive ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-semibold' }
                                    `
                            }
                        >
                            {
                                ({ isActive }) => (
                                    <>
                                        <link.icon size={18} strokeWidth={2.5} className={`transition-transform duration-200 ${ isActive ? '' : 'group-hover:scale-110' }`} />
                                        {link.text}
                                    </>
                                )
                            }
                        </NavLink>
                    ))
                }
            </nav>
            <div className="px-3 py-4 border-slate-200/60">
                <button className='group flex items-center gap-3 w-full px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-all duration-200'>
                    <Settings className='transition-transform duration-200 group-hover:scale-110' size={18} strokeWidth={2.5} />
                    Setting
                </button>
                <button onClick={handleLogout} className='group flex items-center gap-3 w-full px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200'>
                    <LogOut className='transition-transform duration-200 group-hover:scale-110' size={18} strokeWidth={2.5} />
                    Log Out
                </button>
            </div>
        </aside>
    </>
  )
}

export default Sidebar