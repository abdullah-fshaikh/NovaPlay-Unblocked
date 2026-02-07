
import React from 'react';

const Header = ({ onSearch, searchTerm }) => {
  return React.createElement('header', { className: 'sticky top-0 z-50 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-6 py-4' },
    React.createElement('div', { className: 'max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4' },
      React.createElement('div', { className: 'flex items-center gap-2 cursor-pointer', onClick: () => window.location.hash = '' },
        React.createElement('div', { className: 'w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg' },
          React.createElement('i', { className: 'fa-solid fa-gamepad text-white text-xl' })
        ),
        React.createElement('h1', { className: 'text-2xl font-outfit font-extrabold tracking-tight' }, 'NOVAPLAY', React.createElement('span', { className: 'text-indigo-500' }, '.'))
      ),
      React.createElement('div', { className: 'relative w-full md:w-96' },
        React.createElement('i', { className: 'fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500' }),
        React.createElement('input', {
          type: 'text',
          placeholder: 'Search for games...',
          className: 'w-full bg-zinc-900 border border-zinc-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm',
          value: searchTerm,
          onChange: (e) => onSearch(e.target.value)
        })
      ),
      React.createElement('nav', { className: 'hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400' },
        React.createElement('a', { href: '#/', className: 'hover:text-white' }, 'Home'),
        React.createElement('a', { href: '#/favorites', className: 'hover:text-white' }, 'Favorites')
      )
    )
  );
};

export default Header;
