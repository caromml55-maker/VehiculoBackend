import { Routes } from '@angular/router';
import { VehiculoMatricula } from './vehiculo-matricula/vehiculo-matricula';

export const routes: Routes = [
    {path: '', redirectTo: 'vehiculos', pathMatch: 'full'},
    {path: 'vehiculos', component:VehiculoMatricula},
];
