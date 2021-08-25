import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Tile, TILE_TYPE } from '../interfaces/Tile';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class IslandsService {
  grid?: Tile[][];
  gridGenerated = new Subject<Tile[][]>();
  gridDataUpdated = new Subject<any>();

  constructor() {}

  generateGrid(rows: number, cols: number): Tile[][] {
    const grid: Tile[][] = [];
    for (let i = 0; i < rows; i++) {
      grid[i] = [];
      for (let j = 0; j < cols; j++) {
        grid[i][j] = this.createTile();
      }
    }
    this.gridGenerated.next(grid);
    this.grid = grid;
    return grid;
  }

  createTile(): Tile {
    return {
      id: uuidv4(),
      island: 0,
      type: TILE_TYPE.sea,
    };
  }

  updateGrid(grid: Tile[][]): void {
    this.grid = grid;
  }
}
