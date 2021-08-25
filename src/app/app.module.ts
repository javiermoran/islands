import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ControlsComponent } from './components/controls/controls.component';
import { GridComponent } from './components/grid/grid.component';
import { TileComponent } from './components/tile/tile.component';
import { SummaryComponent } from './components/summary/summary.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ControlsComponent,
    GridComponent,
    TileComponent,
    SummaryComponent,
  ],
  imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
