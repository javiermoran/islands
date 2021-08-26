import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IslandsService } from 'src/app/services/islands.service';

@Component({
  selector: 'isl-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent implements OnInit {
  public controlsForm = new FormGroup({
    rows: new FormControl(20, [Validators.required, Validators.min(1)]),
    cols: new FormControl(20, [Validators.required, Validators.min(1)]),
  });

  constructor(public islandsService: IslandsService) {}

  ngOnInit(): void {}

  onGenerateWorld() {
    const { rows, cols } = this.controlsForm.value;
    this.islandsService.generateGrid(rows, cols);
  }
}
