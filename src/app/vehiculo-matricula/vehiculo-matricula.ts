import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../models/vehiculo';
import { VehiculoService } from '../servicios/vehiculo-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vehiculo-matricula',
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './vehiculo-matricula.html',
  styleUrl: './vehiculo-matricula.scss',
})
export class VehiculoMatricula implements OnInit{
  vehiculos: Vehiculo[] = [];
  
  // Objeto para el formulario
  nuevoVehiculo: Vehiculo = {
    placa: '',
    propietario: '',
    marca: '',
    fabricacion: 2024,
    valor_comercial: 0
  };

  placaBusqueda: string = ''; 

  mensajeError: string = '';



  constructor(private vehiculoService: VehiculoService) {}

  ngOnInit(): void {
    this.cargarVehiculos();
  }

  cargarVehiculos() {
    this.vehiculoService.getVehiculos().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data); // DEBUG: Mira la consola del navegador
        this.vehiculos = data;
      },
      error: (e) => {
        console.error('Error al cargar:', e); // DEBUG: Si sale error aquí, es conexión
        this.mensajeError = 'No se pudo conectar con el servidor.';
      }
    });
  }

  buscar() {
    // Si el campo está vacío, recargamos toda la lista
    if (!this.placaBusqueda.trim()) {
      this.cargarVehiculos();
      return;
    }

    this.mensajeError = ''; // Limpiar errores
    
    this.vehiculoService.getVehiculoByPlaca(this.placaBusqueda.trim()).subscribe({
      next: (data) => {
        // Como la tabla espera un Array, metemos el resultado único en un array
        this.vehiculos = [data]; 
      },
      error: (err) => {
        console.error(err);
        this.vehiculos = []; // Limpiamos la tabla
        if (err.status === 404) {
          this.mensajeError = 'Vehículo no encontrado con esa placa.';
        } else {
          this.mensajeError = 'Error al buscar.';
        }
      }
    });
  }

  guardar() {
    this.mensajeError = ''; 
    this.vehiculoService.createVehiculo(this.nuevoVehiculo).subscribe({
      next: (res) => {
        this.cargarVehiculos();
        // Resetear formulario
        this.nuevoVehiculo = { 
          placa: '', propietario: '', marca: '', 
          fabricacion: 2024, valor_comercial: 0 
        };
      },
      error: (err) => {
        console.error(err);
        if (err.status === 400 || err.status === 409) {
          this.mensajeError = err.error.detail;
        } else {
          this.mensajeError = 'Error al guardar. Revise la conexión.';
        }
      }
    });
  }

}
