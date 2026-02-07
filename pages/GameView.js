
import React, { useState } from 'react';
import { isFavorite, toggleFavorite } from '../services/storage.js';

const GameView = ({ game, onBack }) => {
  const [favorite, setFavorite] = useState(isFavorite(game.id));

  const toggleFullscreen = () => {
    const iframe = document.getElementById('game-iframe');
    if (iframe && iframe.requestFullscreen) iframe.requestFullscreen();
  };

  return React.createElement('div', { className: 'flex flex-col h-[calc(100vh-80px)] bg-zinc-950' },
    React.createElement('div', { className: 'bg-zinc-900 border-b border-zinc-800 px-6 py-3 flex items-center justify-between' },
      React.createElement('div', { className: 'flex items-center gap-4' },
        React.createElement('button', { onClick: onBack, className: 'w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center' },
          React.createElement('i', { className: 'fa-solid fa-arrow-left' })
        ),
        React.createElement('div', null,
          React.createElement('h2', { className: 'font-outfit font-bold text-lg' }, game.title),
          React.createElement('p', { className: 'text-[10px] text-zinc-500 uppercase' }, game.category)
        )
      ),
      React.createElement('div', { className: 'flex gap-2' },
        React.createElement('button', { 
          onClick: () => { toggleFavorite(game.id); setFavorite(!favorite); },
          className: `px-4 py-2 rounded-full text-xs font-bold ${favorite ? 'bg-indigo-600' : 'bg-zinc-800 text-zinc-400'}`
        }, favorite ? 'SAVED' : 'FAVORITE'),
        React.createElement('button', { onClick: toggleFullscreen, className: 'px-4 py-2 bg-zinc-800 text-zinc-300 rounded-full text-xs font-bold' }, 'FULLSCREEN')
      )
    ),
    React.createElement('div', { className: 'flex-1 relative bg-black' },
      React.createElement('iframe', {
        id: 'game-iframe',
        src: game.iframeUrl,
        className: 'w-full h-full border-none',
        allowFullScreen: true,
        title: game.title
      })
    )
  );
};

export default GameView;
