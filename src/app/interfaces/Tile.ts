import { TILE_TYPE } from './TileType';

export interface Tile {
  id: string;
  type: TILE_TYPE;
  island: number;
}
