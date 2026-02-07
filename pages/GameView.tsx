
import React, { useState } from 'react';
import { Game } from '../types';
import { isFavorite, toggleFavorite } from '../services/storage';

interface GameViewProps {
  game: Game;
  onBack: () => void;
}

const GameView: React.FC<GameViewProps> = ({ game, onBack }) => {
  const [isFull, setIsFull] = useState(false);
  const [favorite, setFavorite] = useState(isFavorite(game.id));

  const toggleFullscreen = () => {
    const iframe = document.getElementById('game-iframe');
    if (iframe?.requestFullscreen) {
      iframe.requestFullscreen();
    } else if ((iframe as any)?.webkitRequestFullscreen) {
      (iframe as any).webkitRequestFullscreen();
    }
  };

  const handleFavorite = () => {
    toggleFavorite(game.id);
    setFavorite(!favorite);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-zinc-950">
      <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div>
            <h2 className="font-outfit font-bold text-lg">{game.title}</h2>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{game.category}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleFavorite}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              favorite ? 'bg-indigo-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            <i className={`fa-${favorite ? 'solid' : 'regular'} fa-heart`}></i>
            {favorite ? 'SAVED' : 'FAVORITE'}
          </button>
          <button 
            onClick={toggleFullscreen}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full text-xs font-bold transition-all"
          >
            <i className="fa-solid fa-expand"></i>
            FULLSCREEN
          </button>
        </div>
      </div>

      <div className="flex-1 relative bg-black flex items-center justify-center">
        <iframe
          id="game-iframe"
          src={game.iframeUrl}
          className="w-full h-full border-none"
          allowFullScreen
          title={game.title}
        ></iframe>
      </div>

      <div className="bg-zinc-900 border-t border-zinc-800 p-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-outfit font-bold mb-2">About {game.title}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {game.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-xs">
            <div className="bg-zinc-800 px-3 py-1.5 rounded-md">
              <span className="text-zinc-500 mr-2 uppercase">Controls:</span>
              <span className="text-zinc-300">Keyboard / Mouse</span>
            </div>
            <div className="bg-zinc-800 px-3 py-1.5 rounded-md">
              <span className="text-zinc-500 mr-2 uppercase">Platform:</span>
              <span className="text-zinc-300">Web Browser</span>
            </div>
            {game.developer && (
              <div className="bg-zinc-800 px-3 py-1.5 rounded-md">
                <span className="text-zinc-500 mr-2 uppercase">Dev:</span>
                <span className="text-zinc-300">{game.developer}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameView;
