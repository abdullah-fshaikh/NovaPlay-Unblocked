import React, { useState } from 'react';
import { isFavorite, toggleFavorite } from '../services/storage.js';

const GameCard = ({ game, onClick, onFavoriteChange }) => {
  const [favorite, setFavorite] = useState(isFavorite(game.id));

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(game.id);
    setFavorite(!favorite);
    onFavoriteChange();
  };

  return React.createElement('div', { 
    onClick: onClick,
    className: 'group relative bg-black border border-zinc-900 rounded-sm overflow-hidden cursor-pointer transition-all duration-500 hover:border-cyan-500 hover:-translate-y-1'
  },
    React.createElement('div', { className: 'aspect-video relative overflow-hidden bg-zinc-950' },
      React.createElement('img', { 
        src: game.thumbnail, 
        alt: game.title, 
        className: 'w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700'
      }),
      /* Glitch overlay on hover */
      React.createElement('div', { className: 'absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 pointer-events-none mix-blend-screen' }),
      React.createElement('div', { className: 'absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent' }),
      
      React.createElement('button', { 
        onClick: handleFavoriteClick,
        className: `absolute top-3 right-3 w-8 h-8 rounded-sm z-10 flex items-center justify-center transition-all ${favorite ? 'bg-pink-500 text-white neon-border' : 'bg-black/80 text-zinc-600 border border-zinc-800'}`
      },
        React.createElement('i', { className: `fa-${favorite ? 'solid' : 'regular'} fa-heart text-xs` })
      ),
      
      game.featured && React.createElement('div', { className: 'absolute top-0 left-0 bg-cyan-500 text-black text-[8px] font-black px-2 py-1 uppercase tracking-tighter' }, '!! PRIORITY_UNIT !!')
    ),
    React.createElement('div', { className: 'p-4 border-t border-zinc-900 group-hover:border-cyan-500/50' },
      React.createElement('h3', { className: 'font-mono font-bold text-xs text-zinc-400 group-hover:text-cyan-400 truncate uppercase tracking-widest' }, game.title),
      React.createElement('div', { className: 'flex items-center justify-between mt-2' },
        React.createElement('p', { className: 'text-[9px] text-zinc-700 font-bold tracking-tighter' }, `ID: ${game.id.toUpperCase()}`),
        React.createElement('span', { className: 'text-[8px] px-2 py-0.5 border border-zinc-800 text-zinc-600 group-hover:text-pink-500 group-hover:border-pink-500 uppercase font-black transition-all' }, game.category)
      )
    ),
    /* Bottom scan bar */
    React.createElement('div', { className: 'absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-500 transition-all duration-500 group-hover:w-full' })
  );
};

export default GameCard;