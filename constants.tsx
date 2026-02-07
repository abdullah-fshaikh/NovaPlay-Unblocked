
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
    id: 'tunnel-rush',
    title: 'Tunnel Rush',
    description: 'Speed through colorful tunnels avoiding obstacles in this rhythmic arcade game.',
    category: GameCategory.ARCADE,
    thumbnail: 'https://picsum.photos/seed/tunnel/400/250',
    iframeUrl: 'https://kdata1.com/2020/05/tunnel-rush/',
    featured: true
  },
  {
    id: 'moto-x3m',
    title: 'Moto X3M',
    description: 'The ultimate bike racing game with challenging levels and crazy stunts.',
    category: GameCategory.RACING,
    thumbnail: 'https://picsum.photos/seed/moto/400/250',
    iframeUrl: 'https://games.poki.com/458742/moto-x3m',
    featured: true
  },
  {
    id: '2048',
    title: '2048',
    description: 'Join the numbers and get to the 2048 tile!',
    category: GameCategory.PUZZLE,
    thumbnail: 'https://picsum.photos/seed/2048/400/250',
    iframeUrl: 'https://play2048.co/',
  },
  {
    id: 'cookie-clicker',
    title: 'Cookie Clicker',
    description: 'An idle game about making cookies by clicking on a giant cookie.',
    category: GameCategory.ARCADE,
    thumbnail: 'https://picsum.photos/seed/cookie/400/250',
    iframeUrl: 'https://orteil.dashnet.org/cookieclicker/',
  },
  {
    id: 'geometry-dash',
    title: 'Geometry Dash',
    description: 'Jump and fly your way through danger in this rhythm-based action platformer!',
    category: GameCategory.ACTION,
    thumbnail: 'https://picsum.photos/seed/geo/400/250',
    iframeUrl: 'https://geometrydash.io/game/geometry-dash-lite/',
  },
  {
    id: 'subway-surfers',
    title: 'Subway Surfers',
    description: 'Dash as fast as you can through the subway tracks and dodge the oncoming trains.',
    category: GameCategory.ACTION,
    thumbnail: 'https://picsum.photos/seed/subway/400/250',
    iframeUrl: 'https://poki.com/en/g/subway-surfers',
  },
  {
    id: 'temple-run',
    title: 'Temple Run',
    description: 'Run from the demons in this classic endless runner game.',
    category: GameCategory.ARCADE,
    thumbnail: 'https://picsum.photos/seed/temple/400/250',
    iframeUrl: 'https://poki.com/en/g/temple-run-2',
  },
  {
    id: 'drift-hunters',
    title: 'Drift Hunters',
    description: 'The ultimate car drifting simulator with realistic physics and customizable cars.',
    category: GameCategory.RACING,
    thumbnail: 'https://picsum.photos/seed/drift/400/250',
    iframeUrl: 'https://kdata1.com/2020/05/drift-hunters/',
  }
];

export const CATEGORIES = Object.values(GameCategory);
