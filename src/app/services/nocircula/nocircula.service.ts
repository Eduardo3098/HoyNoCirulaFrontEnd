import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NocirculaService {

  constructor(private http: HttpClient) { }

  public postVehiculo(vehiculo: Vehiculo) {
    const url = environment.urlServiciosBackend + 'nocircula/guardar';
    const json = Object.assign({}, vehiculo);
    return this.http.post<Vehiculo>(url, json);
  }

  public getVehiculo(placa: string) {
    const url = environment.urlServiciosBackend + `vehiculos/buscar/${placa}`;
    return this.http.get(url);
  }

  public getReestriccion(placa: string, fecha: string) {
    const url = environment.urlServiciosBackend + `calendario/validar/${placa}/${fecha}`;
    return this.http.get(url);
  }
}

export class Vehiculo {
  placa: string;
  color: string;
  modelo: string;
  chasis: string;
  anio: string;
}
