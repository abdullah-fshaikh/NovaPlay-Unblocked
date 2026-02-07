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

  return React.createElement('div', { className: 'max-w-7xl mx-auto px-6 py-8' },
    React.createElement('div', { className: 'flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12' },
      React.createElement('div', null,
        React.createElement('h2', { className: 'text-4xl font-outfit font-black tracking-tight' }, 
          showOnlyFavorites ? 'Your ' : 'Explore ',
          React.createElement('span', { className: 'text-indigo-500' }, showOnlyFavorites ? 'Library' : 'Games')
        ),
        React.createElement('p', { className: 'text-zinc-500 text-sm mt-1 font-medium' }, 
          `Syncing ${filteredGames.length} available titles`
        )
      ),
      React.createElement('div', { className: 'flex items-center gap-2 overflow-x-auto pb-4 lg:pb-0 no-scrollbar' },
        CATEGORIES.map(cat => React.createElement('button', {
          key: cat,
          onClick: () => setSelectedCategory(cat),
          className: `px-5 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap border-b-2 ${selectedCategory === cat ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400' : 'bg-zinc-900/50 border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'}`
        }, cat.toUpperCase()))
      )
    ),
    filteredGames.length > 0 
      ? React.createElement('div', { className: 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8' },
          filteredGames.map((game, idx) => React.createElement(GameCard, {
            key: game.id,
            game: game,
            onClick: () => onGameSelect(game.id),
            onFavoriteChange: () => setRefreshKey(prev => prev + 1)
          }))
        )
      : React.createElement('div', { className: 'text-center py-32 bg-zinc-900/20 border border-zinc-800/50 rounded-3xl backdrop-blur-sm' },
          React.createElement('i', { className: 'fa-solid fa-gamepad text-6xl text-zinc-800 mb-6 block' }),
          React.createElement('p', { className: 'text-xl font-outfit font-bold text-zinc-600' }, 'Zero results in this sector.'),
          React.createElement('button', { 
            onClick: () => setSelectedCategory(GameCategory.ALL),
            className: 'mt-4 text-indigo-500 hover:text-indigo-400 font-black text-sm uppercase tracking-widest underline'
          }, 'Reset Filter')
        )
  );
};

export default HomePage;