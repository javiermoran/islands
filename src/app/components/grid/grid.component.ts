import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Coordinates } from 'src/app/interfaces/Coordinates';
import { Tile } from 'src/app/interfaces/Tile';
import { IslandsService } from 'src/app/services/islands.service';

@Component({
  selector: 'isl-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit, OnDestroy {
  grid?: Tile[][];
  destroy$ = new Subject<boolean>();

  constructor(private islandsService: IslandsService) {}

  ngOnInit(): void {
    this.islandsService.gridGenerated
      .pipe(takeUntil(this.destroy$))
      .subscribe((grid: Tile[][]) => {
        this.grid = grid;
      });
  }

  onTileToggle(event: { tile?: Tile; coordinates?: Coordinates }) {
    const { tile, coordinates } = event;
    if (this.grid && tile && coordinates) {
      this.grid[coordinates?.y][coordinates?.x] = tile;
      this.islandsService.updateGrid(this.grid);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
