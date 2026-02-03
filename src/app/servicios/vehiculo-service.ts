import { Injectable } from '@angular/core';
import { Vehiculo } from '../models/vehiculo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  private apiUrl = 'http://localhost:8000/api/vehiculos';

  constructor(private http: HttpClient) { }

  getVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.apiUrl);
  }

  getVehiculoByPlaca(placa: string): Observable<Vehiculo> {
    // Llama a: GET /api/vehiculos/AAA-123
    return this.http.get<Vehiculo>(`${this.apiUrl}/${placa}`);
  }
  createVehiculo(vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.http.post<Vehiculo>(this.apiUrl, vehiculo);
  }
  
}
