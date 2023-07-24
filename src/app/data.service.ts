import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {
  private apiKey = 'live_0bPdTGlRE1aaDmuM99YgEwErS9ygM7zeV6Ly1jxnjwGVMIQAcQABuBW9Wn1w3Haf'; 
  private apiUrl = 'https://api.thedogapi.com/v1/breeds';
  loading = false; // Agregar la variable loading
  private data$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private filteredData$: Observable<any[]>;
  private subscription: Subscription | undefined;

  constructor(private http: HttpClient) {
    this.fetchData();
    this.filteredData$ = this.data$.asObservable();
  }

  fetchData(): void {
    this.loading = true; // Activar el loader
    const headers = new HttpHeaders({ 'x-api-key': this.apiKey });
    this.subscription = this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      map((data) => {
        console.log(data)
        // Filtrar datos para obtener solo el nombre y tamaño de cada raza
        return data.map(breed => {
          return {
            image:breed.image,
            name: breed.name,
            origin: breed.origin
          };
        });
      })
    ).subscribe((filteredData) => {
      this.data$.next(filteredData);
      this.loading = false; // Desactivar el loader después de recibir los datos
    });
  }

  getFilteredData(): Observable<any[]> {
    return this.filteredData$;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
