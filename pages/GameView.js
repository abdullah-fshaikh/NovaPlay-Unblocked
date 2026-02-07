import React, { useState, useEffect } from 'react';
import { isFavorite, toggleFavorite } from '../services/storage.js';

const GameView = ({ game, onBack }) => {
  const [favorite, setFavorite] = useState(isFavorite(game.id));
  const [iframeLoading, setIframeLoading] = useState(true);

  const toggleFullscreen = () => {
    const iframe = document.getElementById('game-iframe');
    if (iframe && iframe.requestFullscreen) iframe.requestFullscreen();
  };

  return React.createElement('div', { className: 'flex flex-col h-[calc(100vh-90px)] p-4 bg-black' },
    React.createElement('div', { className: 'neon-border-cyan bg-black/80 mb-4 px-6 py-4 flex items-center justify-between' },
      React.createElement('div', { className: 'flex items-center gap-6' },
        React.createElement('button', { 
          onClick: onBack, 
          className: 'w-10 h-10 bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-pink-500 hover:border-pink-500 hover:text-white transition-all shadow-xl rounded-sm' 
        },
          React.createElement('i', { className: 'fa-solid fa-code-branch rotate-180' })
        ),
        React.createElement('div', null,
          React.createElement('h2', { className: 'font-outfit font-black text-xl leading-tight tracking-tighter text-white' }, game.title),
          React.createElement('div', { className: 'flex gap-2 items-center' },
            React.createElement('span', { className: 'w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]' }),
            React.createElement('p', { className: 'text-[9px] text-zinc-500 font-mono uppercase tracking-[0.2em]' }, `STREAMING // ${game.category}`)
          )
        )
      ),
      React.createElement('div', { className: 'flex gap-4' },
        React.createElement('button', { 
          onClick: () => { toggleFavorite(game.id); setFavorite(!favorite); },
          className: `px-6 py-2 text-[10px] font-mono font-black transition-all flex items-center gap-3 border ${favorite ? 'border-pink-500 text-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.3)]' : 'border-zinc-800 text-zinc-600 hover:text-zinc-200'}`
        }, 
          React.createElement('i', { className: `fa-${favorite ? 'solid' : 'regular'} fa-heart` }),
          favorite ? 'CORE_SAVED' : 'CACHE_FAV'
        ),
        React.createElement('button', { 
          onClick: toggleFullscreen, 
          className: 'px-6 py-2 bg-cyan-500 text-black text-[10px] font-mono font-black shadow-lg shadow-cyan-500/20 flex items-center gap-3 transition-all hover:bg-cyan-400 rounded-sm' 
        }, 
          React.createElement('i', { className: 'fa-solid fa-expand' }),
          'EXPAND_VIEW'
        )
      )
    ),
    React.createElement('div', { className: 'flex-1 relative bg-zinc-950 neon-border shadow-2xl overflow-hidden' },
      iframeLoading && React.createElement('div', { className: 'absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/90' },
        React.createElement('span', { className: 'loader-pulse mb-6' }),
        React.createElement('p', { className: 'text-pink-500 font-mono font-black text-[10px] animate-pulse uppercase tracking-[0.5em] neon-text-pink' }, 'Establishing Neural Link...')
      ),
      React.createElement('iframe', {
        id: 'game-iframe',
        src: game.iframeUrl,
        className: 'w-full h-full border-none opacity-90 hover:opacity-100 transition-opacity',
        allowFullScreen: true,
        onLoad: () => setIframeLoading(false),
        title: game.title
      })
    )
  );
};

export default GameView;