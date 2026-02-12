import React from 'react'
import { useAuth } from '../../../context/useAuth'
import { Menu } from 'lucide-react';

const Header = ({toggleSidebar}) => {

  const { user } = useAuth();

  return (
   <header className='sticky top-0 z-40 w-full h-16 '>
      <div className="flex items-center justify-between h-full px-6">

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleSidebar}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200"
          aria-label='Toogle Sidebar'
        >
          <Menu size={24} />
        </button>

        {/* Header Title */}
        <div className="hidden md:block"></div>

        <div className="flex items-center gap-3">
          {/* User Profile */}
          <div className="flex items-center  pl-3 ">
            <div className="flex items-center gap-3 px-3 py-1.5 rounded-full hover:bg-slate-50 transition-colors duration-200 cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-slate-400 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:shadow-lg group-hover:shadow-emerald-500/30 transition-all duration-200">
                <img className="mx-auto rounded-full sm:mx-0 sm:shrink-0" src="https://tailwindcss.com/_next/static/media/erin-lindford.fbd7bb53.jpg" alt="" />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">{user?.username || 'User'}</p>
              <p className="text-xs text-slate-900">{user?.email || 'user_email.com'}</p>
            </div>
          </div>

        </div>

      </div>
    </header>
  )
}
	
export default Header