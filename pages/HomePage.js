
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
    React.createElement('div', { className: 'flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8' },
      React.createElement('h2', { className: 'text-2xl font-outfit font-extrabold' }, 
        showOnlyFavorites ? 'Your Library' : 'Discovery',
        React.createElement('span', { className: 'text-zinc-500 text-sm font-normal ml-2' }, `(${filteredGames.length} games)`)
      ),
      React.createElement('div', { className: 'flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar' },
        CATEGORIES.map(cat => React.createElement('button', {
          key: cat,
          onClick: () => setSelectedCategory(cat),
          className: `px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-indigo-600 text-white' : 'bg-zinc-900 text-zinc-400'}`
        }, cat.toUpperCase()))
      )
    ),
    filteredGames.length > 0 
      ? React.createElement('div', { className: 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6' },
          filteredGames.map(game => React.createElement(GameCard, {
            key: game.id,
            game: game,
            onClick: () => onGameSelect(game.id),
            onFavoriteChange: () => setRefreshKey(prev => prev + 1)
          }))
        )
      : React.createElement('div', { className: 'text-center py-20 text-zinc-500' }, 'No games found.')
  );
};

export default HomePage;
