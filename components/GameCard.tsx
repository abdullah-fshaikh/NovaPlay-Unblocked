
import React from 'react';
import { Game } from '../types';
import { isFavorite, toggleFavorite } from '../services/storage';

interface GameCardProps {
  game: Game;
  onClick: () => void;
  onFavoriteChange: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick, onFavoriteChange }) => {
  const [favorite, setFavorite] = React.useState(isFavorite(game.id));

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(game.id);
    setFavorite(!favorite);
    onFavoriteChange();
  };

  return (
    <div 
      onClick={onClick}
      className="group relative bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden cursor-pointer hover:border-indigo-500/50 transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        <button 
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            favorite ? 'bg-indigo-600 text-white' : 'bg-black/40 text-zinc-300 hover:bg-black/60'
          }`}
        >
          <i className={`fa-${favorite ? 'solid' : 'regular'} fa-heart`}></i>
        </button>

        {game.featured && (
          <span className="absolute bottom-2 left-2 bg-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded tracking-wider shadow-lg">
            FEATURED
          </span>
        )}
      </div>

      <div className="p-3">
        <h3 className="font-outfit font-semibold text-sm truncate group-hover:text-indigo-400 transition-colors">
          {game.title}
        </h3>
        <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-widest font-bold">
          {game.category}
        </p>
      </div>
    </div>
  );
};

export default GameCard;
