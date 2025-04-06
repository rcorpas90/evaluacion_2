import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VehiculosVentasService {
  private vehiculos = signal<any[]>([]);
  private ventas = signal<any[]>([]);
  private userToken = signal<string | null>(null);
  constructor() { }

  getVehiculos() {
    return this.vehiculos();
  }

  updateVehiculos(vehiculos: any[]) {
    this.vehiculos.set(vehiculos);
  }

  updateSingleVehiculo(id: string, params: Object) {
    let vehiculos = this.vehiculos();
    let index = vehiculos.findIndex((a) => a._id === id);
    this.vehiculos()[index] = params;
    console.log(this.vehiculos());
  }

  getVentas() {
    return this.ventas();
  }

  updateVentas(ventas: any[]) {
    this.ventas.set(ventas);
  }

  updateSingleVenta(id: string, params: Object) {
    let ventas = this.ventas();
    let index = ventas.findIndex((a) => a._id === id);
    this.ventas()[index] = params;
    console.log(this.ventas());
  }

  getUserToken() {
    return this.userToken();
  }

  setUserToken(token: string) {
    this.userToken.set(token);
  }
  deleteUserToken() {
    this.userToken.set(null);
  }
}
