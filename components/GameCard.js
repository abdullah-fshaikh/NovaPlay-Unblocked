
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
    className: 'group relative bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden cursor-pointer hover:border-indigo-500/50 transition-all duration-300'
  },
    React.createElement('div', { className: 'aspect-video relative overflow-hidden' },
      React.createElement('img', { 
        src: game.thumbnail, 
        alt: game.title, 
        className: 'w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
      }),
      React.createElement('button', { 
        onClick: handleFavoriteClick,
        className: `absolute top-2 right-2 p-2 rounded-full backdrop-blur-md z-10 ${favorite ? 'bg-indigo-600 text-white' : 'bg-black/40 text-zinc-300'}`
      },
        React.createElement('i', { className: `fa-${favorite ? 'solid' : 'regular'} fa-heart` })
      ),
      game.featured && React.createElement('span', { className: 'absolute bottom-2 left-2 bg-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded shadow-lg' }, 'FEATURED')
    ),
    React.createElement('div', { className: 'p-3' },
      React.createElement('h3', { className: 'font-outfit font-semibold text-sm truncate group-hover:text-indigo-400' }, game.title),
      React.createElement('p', { className: 'text-[10px] text-zinc-500 mt-1 uppercase tracking-widest font-bold' }, game.category)
    )
  );
};

export default GameCard;
