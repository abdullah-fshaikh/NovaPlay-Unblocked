import React, { useState, useMemo } from 'react';
import { GAMES_DATA, CATEGORIES } from '../constants.js';
import { GameCategory } from '../types.js';
import GameCard from '../components/GameCard.js';

const HomePage = ({ searchTerm, onGameSelect, showOnlyFavorites = false }) => {
  const [selectedCategory, setSelectedCategory] = useState(GameCategory.ALL);
  const [refreshKey, setRefreshKey] = useState(0);

  const filteredGames = useMemo(() => {
    const favorites = JSON.parse(localStorage.getItem('novaplay_favorites') || '[]');
    return GAMES_DATA.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === GameCategory.ALL || game.category === selectedCategory;
      const matchesFavorite = showOnlyFavorites ? favorites.includes(game.id) : true;
      return matchesSearch && matchesCategory && matchesFavorite;
    });
  }, [searchTerm, selectedCategory, showOnlyFavorites, refreshKey]);

  return React.createElement('div', { className: 'max-w-7xl mx-auto px-6 py-12' },
    React.createElement('div', { className: 'flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 border-l-4 border-pink-500 pl-6' },
      React.createElement('div', null,
        React.createElement('h2', { className: 'text-5xl font-outfit font-black tracking-tighter uppercase glitch', 'data-text': showOnlyFavorites ? 'SYSTEM_LIB' : 'MAIN_GRID' }, 
          showOnlyFavorites ? 'SYSTEM_LIB' : 'MAIN_GRID'
        ),
        React.createElement('p', { className: 'text-cyan-500 font-mono text-[10px] mt-2 tracking-[0.3em] font-bold' }, 
          `STATUS: ONLINE // CACHED_ENTRIES: ${filteredGames.length}`
        )
      ),
      React.createElement('div', { className: 'flex items-center gap-3 overflow-x-auto pb-4 lg:pb-0 no-scrollbar' },
        CATEGORIES.map(cat => React.createElement('button', {
          key: cat,
          onClick: () => setSelectedCategory(cat),
          className: `px-6 py-2 rounded-sm text-[9px] font-mono font-black transition-all border ${selectedCategory === cat ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.3)]' : 'bg-black border-zinc-800 text-zinc-600 hover:text-zinc-300 hover:border-zinc-500'}`
        }, `[ ${cat.toUpperCase()} ]`))
      )
    ),
    filteredGames.length > 0 
      ? React.createElement('div', { className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10' },
          filteredGames.map((game, idx) => React.createElement(GameCard, {
            key: game.id,
            game: game,
            onClick: () => onGameSelect(game.id),
            onFavoriteChange: () => setRefreshKey(prev => prev + 1)
          }))
        )
      : React.createElement('div', { className: 'text-center py-40 bg-zinc-950/40 border border-zinc-900 rounded-sm' },
          React.createElement('i', { className: 'fa-solid fa-triangle-exclamation text-4xl text-pink-500 mb-6 neon-text-pink' }),
          React.createElement('p', { className: 'text-sm font-mono text-zinc-500 uppercase tracking-widest' }, 'Error: Data sector empty.'),
          React.createElement('button', { 
            onClick: () => setSelectedCategory(GameCategory.ALL),
            className: 'mt-8 text-cyan-400 font-mono text-[10px] hover:neon-text-cyan underline'
          }, '>> FORCE_RESCAN_ALL')
        )
  );
};

export default HomePage;