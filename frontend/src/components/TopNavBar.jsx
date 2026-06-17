import React from 'react';
import { Search, Star, PieChart, Grid, Menu, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const navLinks = [
  "Cryptocurrencies",
  "Dashboards",
  "DexScan",
  "Exchanges",
  "Community",
  "API",
  "Products"
];

function TopNavBar() {
  return (
    <header className="bg-background border-b border-border w-full h-[60px] flex items-center px-4 md:px-6 justify-between text-sm">
      
      {/* Left Section: Logo & Main Nav */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-textMain font-bold text-lg tracking-tight">
           <div className="w-6 h-6 rounded-full bg-accentBlue flex items-center justify-center text-white text-xs">C</div>
           CoinMarketCap Clone
        </Link>
        
        {/* Nav Links (hidden on mobile, visible on lg screens) */}
        <nav className="hidden lg:flex items-center gap-5 font-semibold text-textMain">
          {navLinks.map((link) => (
            <Link key={link} to={`/${link.toLowerCase()}`} className="hover:text-accentBlue transition-colors">
              {link}
            </Link>
          ))}
        </nav>
      </div>

      {/* Right Section: Utilities & Auth */}
      <div className="flex items-center gap-4 text-textMain font-semibold">
         
         {/* Utility Links */}
         <div className="hidden md:flex items-center gap-4 border-r border-border pr-4 mr-2">
            <Link to="/portfolio" className="flex items-center gap-1 hover:text-accentBlue transition-colors">
               <PieChart size={16} className="text-textMuted" />
               Portfolio
            </Link>
            <Link to="/watchlist" className="flex items-center gap-1 hover:text-accentBlue transition-colors">
               <Star size={16} className="text-textMuted" />
               Watchlist
            </Link>
         </div>

         {/* Search Bar */}
         <div className="hidden sm:flex items-center bg-card rounded-lg px-3 py-1.5 text-textMuted border border-border hover:border-textMuted transition-colors cursor-text group">
            <Search size={16} className="mr-2 group-hover:text-textMain transition-colors" />
            <span className="w-32 lg:w-48 text-left outline-none bg-transparent flex-grow text-xs font-normal">Search</span>
            <div className="bg-border rounded px-1.5 py-0.5 text-[10px] font-mono font-medium tracking-widest flex items-center shadow-sm">
               /
            </div>
         </div>

         {/* Grid Icon */}
         <button className="hidden sm:block hover:text-accentBlue transition-colors">
            <Grid size={18} className="text-textMuted hover:text-textMain" />
         </button>

         {/* Login Button */}
         <Link to="/login" className="bg-accentBlue hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg transition-colors shadow-sm">
            Log In
         </Link>

         {/* Hamburger & Avatar */}
         <div className="flex items-center gap-2 cursor-pointer hover:text-accentBlue transition-colors">
            <Menu size={20} />
            <UserCircle size={24} className="text-textMuted" />
         </div>
      </div>
    </header>
  );
}

export default TopNavBar;
