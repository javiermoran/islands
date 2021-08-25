import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GridData } from 'src/app/interfaces/GridData';
import { IslandsService } from 'src/app/services/islands.service';

@Component({
  selector: 'isl-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit, OnDestroy {
  data?: GridData;
  destroy$ = new Subject<boolean>();

  constructor(private islandsService: IslandsService) {}

  ngOnInit(): void {
    this.islandsService.gridDataUpdated
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: GridData) => {
        this.data = data;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
