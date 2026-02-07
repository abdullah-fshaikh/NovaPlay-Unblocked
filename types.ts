
export interface Game {
  id: string;
  title: string;
  description: string;
  category: GameCategory;
  thumbnail: string;
  iframeUrl: string;
  developer?: string;
  featured?: boolean;
}

export enum GameCategory {
  ALL = 'All',
  ACTION = 'Action',
  ARCADE = 'Arcade',
  PUZZLE = 'Puzzle',
  SPORTS = 'Sports',
  SHOOTING = 'Shooting',
  RACING = 'Racing'
}
