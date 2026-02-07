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
    className: 'group relative bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden cursor-pointer game-card-glow'
  },
    React.createElement('div', { className: 'aspect-video relative overflow-hidden' },
      React.createElement('img', { 
        src: game.thumbnail, 
        alt: game.title, 
        className: 'w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
      }),
      React.createElement('div', { className: 'absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity' }),
      React.createElement('button', { 
        onClick: handleFavoriteClick,
        className: `absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-md z-10 flex items-center justify-center transition-all ${favorite ? 'bg-indigo-600 text-white shadow-lg' : 'bg-black/60 text-zinc-300 hover:bg-black/90'}`
      },
        React.createElement('i', { className: `fa-${favorite ? 'solid' : 'regular'} fa-heart text-xs` })
      ),
      game.featured && React.createElement('span', { className: 'absolute bottom-3 left-3 bg-indigo-600 text-[9px] font-black px-2 py-0.5 rounded-sm shadow-lg tracking-widest' }, 'FEATURED')
    ),
    React.createElement('div', { className: 'p-4' },
      React.createElement('h3', { className: 'font-outfit font-bold text-sm truncate group-hover:text-indigo-400 transition-colors' }, game.title),
      React.createElement('div', { className: 'flex items-center justify-between mt-1' },
        React.createElement('p', { className: 'text-[9px] text-zinc-500 uppercase tracking-tighter font-bold' }, game.category),
        React.createElement('i', { className: 'fa-solid fa-circle-play text-indigo-500/0 group-hover:text-indigo-500 text-sm transition-all' })
      )
    )
  );
};

export default GameCard;