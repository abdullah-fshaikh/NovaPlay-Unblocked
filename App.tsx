
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import GameView from './pages/GameView';
import { GAMES_DATA } from './constants';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      // Scroll to top on route change
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    // Game page: #/game/game-id
    if (currentHash.startsWith('#/game/')) {
      const gameId = currentHash.split('/').pop();
      const game = GAMES_DATA.find(g => g.id === gameId);
      if (game) {
        return (
          <GameView 
            game={game} 
            onBack={() => window.location.hash = '#/'} 
          />
        );
      }
    }

    // Favorites page
    if (currentHash === '#/favorites') {
      return (
        <HomePage 
          searchTerm={searchTerm} 
          onGameSelect={(id) => window.location.hash = `#/game/${id}`}
          showOnlyFavorites={true}
        />
      );
    }

    // Default Home
    return (
      <HomePage 
        searchTerm={searchTerm} 
        onGameSelect={(id) => window.location.hash = `#/game/${id}`}
      />
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Header searchTerm={searchTerm} onSearch={setSearchTerm} />
      
      <main className="flex-1">
        {renderContent()}
      </main>

      <footer className="bg-zinc-950 border-t border-zinc-900 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xs text-center md:text-left">
             <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
              <div className="w-8 h-8 bg-zinc-800 rounded flex items-center justify-center">
                <i className="fa-solid fa-gamepad text-indigo-500 text-sm"></i>
              </div>
              <h1 className="text-xl font-outfit font-extrabold">
                NOVAPLAY<span className="text-indigo-500">.</span>
              </h1>
            </div>
            <p className="text-zinc-500 text-sm">
              The ultimate destination for premium unblocked gaming. Fast, secure, and always free.
            </p>
          </div>

          <div className="flex gap-12 text-sm">
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-white uppercase text-xs tracking-widest">Platform</h4>
              <a href="#/" className="text-zinc-500 hover:text-white transition-colors">Games</a>
              <a href="#/favorites" className="text-zinc-500 hover:text-white transition-colors">Favorites</a>
              <a href="#/" className="text-zinc-500 hover:text-white transition-colors">Categories</a>
            </div>
             <div className="flex flex-col gap-3">
              <h4 className="font-bold text-white uppercase text-xs tracking-widest">Support</h4>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">Discord</a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">Contact</a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">Request a Game</a>
            </div>
          </div>

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-indigo-600 transition-all">
              <i className="fa-brands fa-discord"></i>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-indigo-600 transition-all">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-indigo-600 transition-all">
              <i className="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between gap-4 text-xs text-zinc-600 text-center">
          <p>© 2024 NovaPlay Unblocked. All rights reserved.</p>
          <div className="flex gap-6 justify-center">
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">DMCA</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
