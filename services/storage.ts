
const FAVORITES_KEY = 'novaplay_favorites';

export const getFavorites = (): string[] => {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const toggleFavorite = (gameId: string): string[] => {
  const favorites = getFavorites();
  const index = favorites.indexOf(gameId);
  let newFavorites;
  
  if (index === -1) {
    newFavorites = [...favorites, gameId];
  } else {
    newFavorites = favorites.filter(id => id !== gameId);
  }
  
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  return newFavorites;
};

export const isFavorite = (gameId: string): boolean => {
  return getFavorites().includes(gameId);
};
