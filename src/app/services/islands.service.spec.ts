import { TestBed } from '@angular/core/testing';
import { TILE_TYPE } from '../interfaces/Tile';

import { IslandsService } from './islands.service';

describe('IslandsService', () => {
  let service: IslandsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IslandsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createTile()', () => {
    it('should create a tile with id with type sea and no island', () => {
      const tile = service.createTile();
      expect(tile).toBeDefined();
      expect(tile.id).toBeDefined();
      expect(tile.island).toEqual(0);
      expect(tile.type).toEqual(TILE_TYPE.sea);
    });
  });

  describe('generateGrid()', () => {
    it('should generate a 5x5 grid', () => {
      const grid = service.generateGrid(5, 5);
      expect(grid.length).toEqual(5);
      expect(grid[0].length).toEqual(5);
    });

    it('should generate a 1x5 grid', () => {
      const grid = service.generateGrid(1, 5);
      expect(grid.length).toEqual(1);
      expect(grid[0].length).toEqual(5);
    });

    it('should generate a 5x1 grid', () => {
      const grid = service.generateGrid(5, 1);
      expect(grid.length).toEqual(5);
      expect(grid[0].length).toEqual(1);
    });
  });

  describe('cleanGrid()', () => {
    beforeEach(() => {
      service.islandCount = 2;
      service.grid = service.generateGrid(2, 2);
      service.grid[0][0].island = 1;
      service.grid[1][1].island = 2;
      service.grid[0][0].type = TILE_TYPE.land;
      service.grid[1][1].type = TILE_TYPE.land;
    });

    it('should have tile at position 0x0 as 1', () => {
      expect(service.grid[0][0].island).toEqual(1);
    });

    it('should have tile at position 1x1 as 2', () => {
      expect(service.grid[1][1].island).toEqual(2);
    });

    it('should set all tiles island as 0 when cleanGrid is called', () => {
      service.cleanGrid();
      expect(service.grid[0][0].island).toEqual(0);
      expect(service.grid[0][1].island).toEqual(0);
      expect(service.grid[1][0].island).toEqual(0);
      expect(service.grid[1][1].island).toEqual(0);
    });

    it('should reset islandCount when cleanGrid is called', () => {
      expect(service.islandCount).toEqual(2);
      service.cleanGrid();
      expect(service.islandCount).toEqual(0);
    });
  });

  describe('countIslands()', () => {
    beforeEach(() => {
      service.grid = service.generateGrid(5, 5);
    });

    it('should be 0 if grid is an empty array', () => {
      service.grid = [];
      const islandCount = service.countIslands();
      expect(islandCount).toEqual(0);
    });

    it('should be 0 if grid has no land', () => {
      const islandCount = service.countIslands();
      expect(islandCount).toEqual(0);
    });

    it('should be 1 if there is only one tile with land', () => {
      service.grid[0][0].type = TILE_TYPE.land;
      const islandCount = service.countIslands();
      expect(islandCount).toEqual(1);
    });

    it('should be 2 if there are two not connected land tiles', () => {
      service.grid[0][0].type = TILE_TYPE.land;
      service.grid[4][4].type = TILE_TYPE.land;
      const islandCount = service.countIslands();
      expect(islandCount).toEqual(2);
    });

    it('should be 2 if there are two diagonaly connected land tiles', () => {
      service.grid[0][0].type = TILE_TYPE.land;
      service.grid[1][1].type = TILE_TYPE.land;
      const islandCount = service.countIslands();
      expect(islandCount).toEqual(2);
    });

    it('should be 1 if there are two connected land tiles', () => {
      service.grid[1][0].type = TILE_TYPE.land;
      service.grid[1][1].type = TILE_TYPE.land;
      const islandCount = service.countIslands();
      expect(islandCount).toEqual(1);
    });

    it('should be 2 if there are two separate groups of islands', () => {
      service.grid[1][0].type = TILE_TYPE.land;
      service.grid[1][1].type = TILE_TYPE.land;
      service.grid[3][3].type = TILE_TYPE.land;
      service.grid[3][4].type = TILE_TYPE.land;
      const islandCount = service.countIslands();
      expect(islandCount).toEqual(2);
    });

    it('should call cleanGrid()', () => {
      const cleanGridSpy = spyOn(service, 'cleanGrid');
      service.countIslands();
      expect(cleanGridSpy).toHaveBeenCalled();
    });
  });

  describe('isOutOfBounds()', () => {
    beforeEach(() => {
      service.grid = service.generateGrid(2, 2);
    });

    it('should be true for negative indexes', () => {
      expect(service.isOutOfBounds(-1, 0)).toBeTrue();
      expect(service.isOutOfBounds(-1, -1)).toBeTrue();
      expect(service.isOutOfBounds(0, -1)).toBeTrue();
    });

    it('should be false if it is inside the bounds', () => {
      expect(service.isOutOfBounds(0, 0)).toBeFalse();
      expect(service.isOutOfBounds(0, 1)).toBeFalse();
      expect(service.isOutOfBounds(1, 0)).toBeFalse();
      expect(service.isOutOfBounds(1, 1)).toBeFalse();
    });

    it('should be true if indexes are larger than the bounds', () => {
      expect(service.isOutOfBounds(2, 0)).toBeTrue();
      expect(service.isOutOfBounds(2, 1)).toBeTrue();
      expect(service.isOutOfBounds(1, 2)).toBeTrue();
      expect(service.isOutOfBounds(0, 2)).toBeTrue();
      expect(service.isOutOfBounds(2, 2)).toBeTrue();
    });
  });

  describe('updateGrid()', () => {
    it('should replace the grid', () => {
      service.generateGrid(2, 2);
      const grid = [...service.grid];
      service.grid = [];

      expect(service.grid.length).toEqual(0);
      service.updateGrid(grid);
      expect(service.grid.length).toEqual(2);
    });

    it('should call getGridData()', () => {
      const getGridDataSpy = spyOn(service, 'getGridData');
      service.updateGrid([[]]);
      expect(getGridDataSpy).toHaveBeenCalled();
    });

    it('should call gridDataUpdated.next()', () => {
      const updatedSubjectSpy = spyOn(service.gridDataUpdated, 'next');
      service.updateGrid([[]]);
      expect(updatedSubjectSpy).toHaveBeenCalled();
    });
  });
});
