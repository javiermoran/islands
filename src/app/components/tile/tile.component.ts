import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Coordinates } from 'src/app/interfaces/Coordinates';
import { Tile } from 'src/app/interfaces/Tile';
import { TILE_TYPE } from 'src/app/interfaces/TileType';

@Component({
  selector: 'isl-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent implements OnInit {
  @Input() tile?: Tile;
  @Input() coordinates?: Coordinates;
  @Output() tileToggle = new EventEmitter<{
    tile?: Tile;
    coordinates?: Coordinates;
  }>();
  land = TILE_TYPE.land;

  constructor() {}

  ngOnInit(): void {}

  toggleType() {
    if (this.tile) {
      this.tile.type =
        this.tile?.type === TILE_TYPE.land ? TILE_TYPE.sea : TILE_TYPE.land;
    }
    this.tileToggle.emit({ tile: this.tile, coordinates: this.coordinates });
  }
}
