import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IslandsService } from 'src/app/services/islands.service';

import { ControlsComponent } from './controls.component';

const IslandsServiceMock = {
  generateGrid: () => null,
};

describe('ControlsComponent', () => {
  let component: ControlsComponent;
  let fixture: ComponentFixture<ControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlsComponent],
      providers: [{ provide: IslandsService, useValue: IslandsServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create controlsForm', () => {
    expect(component.controlsForm).toBeDefined();
    expect(component.controlsForm.get('rows')).toBeDefined();
    expect(component.controlsForm.get('cols')).toBeDefined();
  });

  describe('onGenerateWorld()', () => {
    it('should call islandsService.generateGrid()', () => {
      const generateGridSpy = spyOn(component.islandsService, 'generateGrid');
      component.onGenerateWorld();
      expect(generateGridSpy).toHaveBeenCalledWith(20, 20);
    });
  });
});
