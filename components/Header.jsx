
import React from 'react';

const Header = ({ onSearch, searchTerm }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.hash = ''}>
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <i className="fa-solid fa-gamepad text-white text-xl"></i>
          </div>
          <h1 className="text-2xl font-outfit font-extrabold tracking-tight">
            NOVAPLAY<span className="text-indigo-500">.</span>
          </h1>
        </div>

        <div className="relative w-full md:w-96">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"></i>
          <input
            type="text"
            placeholder="Search for games..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
          <a href="#/" className="hover:text-white transition-colors">Home</a>
          <a href="#/favorites" className="hover:text-white transition-colors">Favorites</a>
          <a href="#/trending" className="hover:text-white transition-colors">Trending</a>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-xs font-bold transition-all shadow-lg shadow-indigo-500/20">
            JOIN DISCORD
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
