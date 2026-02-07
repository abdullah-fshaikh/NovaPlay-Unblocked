
import React, { useState, useMemo } from 'react';
import { GAMES_DATA, CATEGORIES } from '../constants';
import { GameCategory } from '../types';
import GameCard from '../components/GameCard';

interface HomePageProps {
  searchTerm: string;
  onGameSelect: (gameId: string) => void;
  showOnlyFavorites?: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ searchTerm, onGameSelect, showOnlyFavorites = false }) => {
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>(GameCategory.ALL);
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

  const featuredGames = useMemo(() => {
    return GAMES_DATA.filter(g => g.featured);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Hero / Featured Slider Placeholder */}
      {!searchTerm && selectedCategory === GameCategory.ALL && !showOnlyFavorites && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <i className="fa-solid fa-star text-amber-400"></i>
            <h2 className="text-xl font-outfit font-bold">Featured Games</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredGames.slice(0, 3).map(game => (
              <div 
                key={game.id}
                onClick={() => onGameSelect(game.id)}
                className="relative h-48 rounded-2xl overflow-hidden cursor-pointer group"
              >
                <img src={game.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-lg font-outfit font-bold">{game.title}</h3>
                  <button className="mt-2 flex items-center gap-2 bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold hover:bg-indigo-500 hover:text-white transition-all">
                    PLAY NOW <i className="fa-solid fa-play text-[10px]"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl font-outfit font-extrabold flex items-center gap-2">
          {showOnlyFavorites ? 'Your Library' : 'Discovery'}
          <span className="text-zinc-500 text-sm font-normal">({filteredGames.length} games)</span>
        </h2>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as GameCategory)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredGames.map(game => (
            <GameCard 
              key={game.id} 
              game={game} 
              onClick={() => onGameSelect(game.id)}
              onFavoriteChange={() => setRefreshKey(prev => prev + 1)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
          <i className="fa-solid fa-ghost text-5xl mb-4"></i>
          <p className="text-lg">No games found matches your filters.</p>
          <button 
            onClick={() => { setSelectedCategory(GameCategory.ALL); setRefreshKey(k => k+1); }}
            className="mt-4 text-indigo-500 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
