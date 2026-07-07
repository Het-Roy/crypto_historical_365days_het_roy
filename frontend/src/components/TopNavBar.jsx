import React from 'react';
import { Grid, Menu, UserCircle, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function TopNavBar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-background border-b border-border w-full h-[60px] flex items-center px-4 md:px-6 justify-between text-sm">
      
      {/* Left Section: Logo */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-textMain font-bold text-lg tracking-tight">
           <div className="w-6 h-6 rounded-full bg-accentBlue flex items-center justify-center text-white text-xs">C</div>
           CryptoVault
        </Link>
      </div>

      {/* Right Section: Auth */}
      <div className="flex items-center gap-4 text-textMain font-semibold">
         
         {/* Grid Icon */}
         <button className="hidden sm:block hover:text-accentBlue transition-colors">
            <Grid size={18} className="text-textMuted hover:text-textMain" />
         </button>

         {user ? (
           <>
             {/* Logged in state */}
             <div className="flex items-center gap-2 text-textMuted border-l border-border pl-4 ml-2">
               <UserCircle size={20} />
               <span className="hidden md:block truncate max-w-[120px]">{user.email}</span>
             </div>
             <button 
               onClick={logout}
               className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
               title="Log Out"
             >
               <LogOut size={16} />
               <span className="hidden sm:block">Log Out</span>
             </button>
           </>
         ) : (
           <>
             {/* Logged out state */}
             <Link to="/login" className="hover:text-accentBlue transition-colors px-2 py-1.5">
                Log In
             </Link>
             <Link to="/register" className="bg-accentBlue hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg transition-colors shadow-sm">
                Sign Up
             </Link>
           </>
         )}
      </div>
    </header>
  );
}

export default TopNavBar;
