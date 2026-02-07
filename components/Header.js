import React from 'react';

const Header = ({ onSearch, searchTerm }) => {
  return React.createElement('header', { className: 'sticky top-0 z-50 w-full bg-black/80 backdrop-blur-xl border-b border-pink-500/30 px-6 py-5' },
    React.createElement('div', { className: 'max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6' },
      React.createElement('div', { 
        className: 'flex items-center gap-3 cursor-pointer group', 
        onClick: () => window.location.hash = '' 
      },
        React.createElement('div', { className: 'w-12 h-12 neon-border-cyan bg-black rounded-sm flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-500' },
          React.createElement('i', { className: 'fa-solid fa-bolt text-cyan-400 text-xl -rotate-45 group-hover:rotate-0 transition-transform duration-500 neon-text-cyan' })
        ),
        React.createElement('h1', { 
          className: 'text-3xl font-outfit font-black tracking-tighter glitch', 
          'data-text': 'TERMINALPLAY' 
        }, 'TERMINALPLAY')
      ),
      React.createElement('div', { className: 'relative w-full md:w-[450px]' },
        React.createElement('div', { className: 'absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full blur opacity-20 group-hover:opacity-40 transition' }),
        React.createElement('i', { className: 'fa-solid fa-terminal absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500 text-xs font-mono' }),
        React.createElement('input', {
          type: 'text',
          placeholder: '> SEARCH_GAME...',
          className: 'relative w-full bg-black border border-zinc-800 rounded-full py-3 pl-12 pr-6 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-xs font-mono tracking-widest text-cyan-400 placeholder-zinc-700',
          value: searchTerm,
          onChange: (e) => onSearch(e.target.value)
        })
      ),
      React.createElement('nav', { className: 'hidden md:flex items-center gap-8 text-[10px] font-black tracking-[0.2em] text-zinc-500' },
        React.createElement('a', { href: '#/', className: 'hover:text-cyan-400 hover:neon-text-cyan transition-all' }, 'HOME_SYS'),
        React.createElement('a', { href: '#/favorites', className: 'hover:text-pink-400 hover:neon-text-pink transition-all' }, 'LIB_CORE'),
        React.createElement('button', { 
          className: 'px-6 py-2 bg-transparent neon-border text-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300 rounded-sm'
        }, 'REBOOT_SESSION')
      )
    )
  );
};

export default Header;