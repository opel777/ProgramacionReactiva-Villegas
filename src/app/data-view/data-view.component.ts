import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-view',
  template: `
    <div *ngFor="let item of filteredData$ | async">
      <div>
      <img [src]="item.image.url" alt="{{ item.name }}" width="170px" [border]="1">
      </div>
     <div>Name: {{ item.name }} <br> Origen:{{ item.origin }}</div>
    </div>
  `,
})
export class DataViewComponent implements OnInit, OnDestroy {
  public filteredData$: Observable<any[]> | undefined;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.filteredData$ = this.dataService.getFilteredData();
  }

  ngOnDestroy(): void {
    // Se invocará automáticamente al destruir el componente
  }
}

