import React, { useState, useEffect } from 'react';
import Header from './components/Header.js';
import HomePage from './pages/HomePage.js';
import GameView from './pages/GameView.js';
import { GAMES_DATA } from './constants.js';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const handleHashChange = () => {
      setIsLoading(true);
      setCurrentHash(window.location.hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Artificial delay for smoothness
      setTimeout(() => setIsLoading(false), 400);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return React.createElement('div', { className: 'flex-1 flex items-center justify-center min-h-[60vh]' },
        React.createElement('span', { className: 'loader-pulse' })
      );
    }

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

  return React.createElement('div', { className: 'min-h-screen flex flex-col relative' },
    React.createElement(Header, { searchTerm: searchTerm, onSearch: setSearchTerm }),
    React.createElement('main', { className: 'flex-1 animate-fade-in' }, renderContent()),
    React.createElement('footer', { className: 'bg-black/40 backdrop-blur-xl border-t border-zinc-900 py-12 px-6 mt-auto' },
      React.createElement('div', { className: 'max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8' },
        React.createElement('div', { className: 'max-w-xs text-center md:text-left' },
          React.createElement('div', { className: 'flex items-center gap-2 mb-4 justify-center md:justify-start' },
            React.createElement('div', { className: 'w-8 h-8 bg-indigo-600 rounded flex items-center justify-center shadow-lg shadow-indigo-500/50' },
              React.createElement('i', { className: 'fa-solid fa-gamepad text-white text-sm' })
            ),
            React.createElement('h1', { className: 'text-xl font-outfit font-extrabold tracking-tight' }, 'TERMINALPLAY', React.createElement('span', { className: 'text-indigo-500' }, '.'))
          ),
          React.createElement('p', { className: 'text-zinc-500 text-sm' }, 'TerminalPlay Unblocked premium gaming destination.')
        ),
        React.createElement('div', { className: 'flex gap-8 text-sm text-zinc-500 font-bold' },
          React.createElement('a', { href: '#/', className: 'hover:text-indigo-400 transition-colors' }, 'EXPLORE'),
          React.createElement('a', { href: '#/favorites', className: 'hover:text-indigo-400 transition-colors' }, 'LIBRARY')
        )
      )
    )
  );
};

export default App;