import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-view',
  template: `
   <div *ngIf="dataService.loading; else dataViewContent" class="loader-container">
      <div class="loader">
    <div class="spinner">Loader</div>
  </div>
      <div class="loader"></div>
    </div>
    <ng-template #dataViewContent>
      <!-- HTML para mostrar la data -->
      <div *ngFor="let item of filteredData$ | async" class="breed-item">
        <div class="image-container">
          <img [src]="item.image.url" alt="{{ item.name  }}" width="170px" height="170px" [border]="1">
        </div>
        <div class="breed-details">
          <p>Name: {{ item.name }}</p>
          <p>Origin: {{ item.origin }}</p>
        </div>
      </div>
    </ng-template>
    
  `,
  
})
export class DataViewComponent implements OnInit, OnDestroy {
  public filteredData$: Observable<any[]> | undefined;

  constructor(public dataService: DataService) {}

  ngOnInit() {
    this.filteredData$ = this.dataService.getFilteredData();
  }

  ngOnDestroy(): void {
    // Se invocará automáticamente al destruir el componente
  }
}

