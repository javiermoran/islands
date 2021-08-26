import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TILE_TYPE } from 'src/app/interfaces/Tile';

import { TileComponent } from './tile.component';

describe('TileComponent', () => {
  let component: TileComponent;
  let fixture: ComponentFixture<TileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggleType()', () => {
    beforeEach(() => {
      component.tile = {
        id: '1',
        type: TILE_TYPE.land,
        island: 0,
      };
    });

    it('should change the tile type to sea', () => {
      component.toggleType();
      expect(component.tile?.type).toEqual(TILE_TYPE.sea);
    });

    it('should change the tile type to land', () => {
      if (component.tile) {
        component.tile.type = TILE_TYPE.sea;
      }
      component.toggleType();
      expect(component.tile?.type).toEqual(TILE_TYPE.land);
    });

    it('should emit tileToggle', () => {
      const tileToggleSpy = spyOn(component.tileToggle, 'emit');
      component.toggleType();
      expect(tileToggleSpy).toHaveBeenCalledWith({
        tile: component.tile,
        coordinates: component.coordinates,
      });
    });
  });
});
