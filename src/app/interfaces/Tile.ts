export enum TILE_TYPE {
  sea = 0,
  land = 1,
}

export interface Tile {
  id: string;
  type: TILE_TYPE;
  island: number;
}
