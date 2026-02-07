
import React, { useState, useEffect } from 'react';
import Header from './components/Header.js';
import HomePage from './pages/HomePage.js';
import GameView from './pages/GameView.js';
import { GAMES_DATA } from './constants.js';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    if (currentHash.startsWith('#/game/')) {
      const gameId = currentHash.split('/').pop();
      const game = GAMES_DATA.find(g => g.id === gameId);
      if (game) {
        return React.createElement(GameView, { 
          game: game, 
          onBack: () => window.location.hash = '#/' 
        });
      }
    }

    if (currentHash === '#/favorites') {
      return React.createElement(HomePage, { 
        searchTerm: searchTerm, 
        onGameSelect: (id) => window.location.hash = `#/game/${id}`,
        showOnlyFavorites: true
      });
    }

    return React.createElement(HomePage, { 
      searchTerm: searchTerm, 
      onGameSelect: (id) => window.location.hash = `#/game/${id}`
    });
  };

  return React.createElement('div', { className: 'min-h-screen bg-zinc-950 text-zinc-100 flex flex-col' },
    React.createElement(Header, { searchTerm: searchTerm, onSearch: setSearchTerm }),
    React.createElement('main', { className: 'flex-1' }, renderContent()),
    React.createElement('footer', { className: 'bg-zinc-950 border-t border-zinc-900 py-12 px-6 mt-auto' },
      React.createElement('div', { className: 'max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8' },
        React.createElement('div', { className: 'max-w-xs text-center md:text-left' },
          React.createElement('div', { className: 'flex items-center gap-2 mb-4 justify-center md:justify-start' },
            React.createElement('div', { className: 'w-8 h-8 bg-zinc-800 rounded flex items-center justify-center' },
              React.createElement('i', { className: 'fa-solid fa-gamepad text-indigo-500 text-sm' })
            ),
            React.createElement('h1', { className: 'text-xl font-outfit font-extrabold' }, 'NOVAPLAY', React.createElement('span', { className: 'text-indigo-500' }, '.'))
          ),
          React.createElement('p', { className: 'text-zinc-500 text-sm' }, 'Unblocked premium gaming destination.')
        ),
        React.createElement('div', { className: 'flex gap-8 text-sm text-zinc-500' },
          React.createElement('a', { href: '#/', className: 'hover:text-white' }, 'Games'),
          React.createElement('a', { href: '#/favorites', className: 'hover:text-white' }, 'Favorites')
        )
      )
    )
  );
};

export default App;
