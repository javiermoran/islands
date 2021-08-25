import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Tile, TILE_TYPE } from '../interfaces/Tile';
import { v4 as uuidv4 } from 'uuid';
import { GridData } from '../interfaces/GridData';

@Injectable({
  providedIn: 'root',
})
export class IslandsService {
  islandCount = 0;
  grid: Tile[][] = [];
  gridData?: GridData;
  gridGenerated = new Subject<Tile[][]>();
  gridDataUpdated = new Subject<GridData>();

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
    this.gridData = this.getGridData();
    this.gridDataUpdated.next(this.gridData);
  }

  cleanGrid(): void {
    this.islandCount = 0;
    for (let row of this.grid) {
      for (let tile of row) {
        if (tile.type === TILE_TYPE.land) {
          tile.island = 0;
        }
      }
    }
  }

  getGridData(): GridData {
    let filled = 0;
    const islandQty = this.countIslands();
    const width = this.grid.length;
    const height = this.grid[0].length;

    for (let row of this.grid) {
      for (let tile of row) {
        if (tile.type === TILE_TYPE.land) {
          filled++;
        }
      }
    }

    return { width, height, filled, islandQty };
  }

  countIslands(): number {
    this.cleanGrid();

    if (this.grid.length === 0) {
      return 0;
    }

    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[0].length; j++) {
        if (
          this.grid[i][j].type == TILE_TYPE.land &&
          this.grid[i][j].island == 0
        ) {
          this.islandCount++;
          this.markIsland(i, j);
        }
      }
    }
    return this.islandCount;
  }

  markIsland(i: number, j: number): void {
    if (
      this.isOutOfBounds(i, j) ||
      this.grid[i][j].type == TILE_TYPE.sea ||
      this.grid[i][j].island > 0
    ) {
      return;
    }

    this.grid[i][j].island = this.islandCount;

    this.markIsland(i, j - 1);
    this.markIsland(i, j + 1);
    this.markIsland(i - 1, j);
    this.markIsland(i + 1, j);
  }

  isOutOfBounds(i: number, j: number): boolean {
    return i < 0 || j < 0 || i >= this.grid.length || j >= this.grid[0].length;
  }
}
