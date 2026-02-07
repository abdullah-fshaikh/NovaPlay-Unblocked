import React, { useState, useEffect } from 'react';
import { isFavorite, toggleFavorite } from '../services/storage.js';

const GameView = ({ game, onBack }) => {
  const [favorite, setFavorite] = useState(isFavorite(game.id));
  const [iframeLoading, setIframeLoading] = useState(true);

  const toggleFullscreen = () => {
    const iframe = document.getElementById('game-iframe');
    if (iframe && iframe.requestFullscreen) iframe.requestFullscreen();
  };

  return React.createElement('div', { className: 'flex flex-col h-[calc(100vh-80px)]' },
    React.createElement('div', { className: 'bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50 px-6 py-3 flex items-center justify-between' },
      React.createElement('div', { className: 'flex items-center gap-4' },
        React.createElement('button', { 
          onClick: onBack, 
          className: 'w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-indigo-600 hover:border-indigo-500 hover:text-white transition-all shadow-xl' 
        },
          React.createElement('i', { className: 'fa-solid fa-chevron-left' })
        ),
        React.createElement('div', null,
          React.createElement('h2', { className: 'font-outfit font-black text-lg leading-tight' }, game.title),
          React.createElement('p', { className: 'text-[10px] text-indigo-500 uppercase font-black tracking-widest' }, game.category)
        )
      ),
      React.createElement('div', { className: 'flex gap-3' },
        React.createElement('button', { 
          onClick: () => { toggleFavorite(game.id); setFavorite(!favorite); },
          className: `px-5 py-2 rounded-full text-xs font-black transition-all flex items-center gap-2 ${favorite ? 'bg-indigo-600 text-white' : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'}`
        }, 
          React.createElement('i', { className: `fa-${favorite ? 'solid' : 'regular'} fa-heart` }),
          favorite ? 'SAVED' : 'FAVORITE'
        ),
        React.createElement('button', { 
          onClick: toggleFullscreen, 
          className: 'px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-xs font-black shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-all' 
        }, 
          React.createElement('i', { className: 'fa-solid fa-expand' }),
          'FULLSCREEN'
        )
      )
    ),
    React.createElement('div', { className: 'flex-1 relative bg-black shadow-2xl overflow-hidden' },
      iframeLoading && React.createElement('div', { className: 'absolute inset-0 flex flex-col items-center justify-center z-10 bg-zinc-950' },
        React.createElement('span', { className: 'loader-pulse mb-4' }),
        React.createElement('p', { className: 'text-zinc-500 font-outfit font-bold text-xs animate-pulse uppercase tracking-widest' }, 'Optimizing Stream...')
      ),
      React.createElement('iframe', {
        id: 'game-iframe',
        src: game.iframeUrl,
        className: 'w-full h-full border-none',
        allowFullScreen: true,
        onLoad: () => setIframeLoading(false),
        title: game.title
      })
    )
  );
};

export default GameView;