
import { Game, GameCategory } from './types';

export const GAMES_DATA: Game[] = [
  {
    id: 'slope',
    title: 'Slope',
    description: 'A fast-paced neon running game where you navigate a ball through a 3D obstacle course.',
    category: GameCategory.ARCADE,
    thumbnail: 'https://picsum.photos/seed/slope/400/250',
    iframeUrl: 'https://kdata1.com/2020/05/slope/',
    featured: true
  },
  {
    id: 'basket-hoop',
    title: 'Basket Hoop',
    description: 'A fun and addictive basketball game where you test your shooting skills and aim for high scores.',
    category: GameCategory.SPORTS,
    thumbnail: 'https://picsum.photos/seed/basket/400/250',
    iframeUrl: 'https://d11jzht7mj96rr.cloudfront.net/games/2024/construct/311/basket-hoop/index-gg.html',
    featured: false
  }
];

export const CATEGORIES = Object.values(GameCategory);
