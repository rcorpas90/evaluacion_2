import { Component } from '@angular/core';
import { RestClientService } from '../rest-client-vehiculos.service';
import { VehiculosVentasService } from '../vehiculos-ventas.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  imports: [FormsModule],
  template: `<h1>Vehiculos</h1>
             <div class="form">
              <div class="form-group">
                <label for="marca">Marca:</label>
                <input type="text" id="marca" placeholder="marca" [(ngModel)]="marca">
              </div>
              <div class="form-group">
                <label for="modelo">Modelo:</label>
                <input type="text" id="modelo" placeholder="modelo" [(ngModel)]="modelo">
              </div>
              <div class="form-group">
                <label for="modelo">Matricula:</label>
                <input type="text" id="modelo" placeholder="modelo" [(ngModel)]="matricula">
              </div>
              <div class="form-group">
                <label for="cantidad">Precio:</label>
                <input type="number" id="cantidad" placeholder="precio"   [(ngModel)]="precio">
              </div>
              <div class="form-group">
                <button (click)="adicionarVehiculo()">Adicionar</button>
              </div>
            </div>`,
  styleUrl: './formulario-vehiculos.component.css'
})
export class FormularioComponent {
  marca = "";
  modelo = "";
  matricula = "";
  precio = 0;
  private RestClientService: RestClientService;
  private repuestosService: VehiculosVentasService;
  constructor(RestClientService: RestClientService, repuestosService: VehiculosVentasService) {
    this.RestClientService = RestClientService;
    this.repuestosService = repuestosService;
  }

  adicionarVehiculo() {
    let repuesto = {
      marca: this.marca,
      modelo: this.modelo,
      matricula: this.matricula,
      precio: this.precio
    }
    this.RestClientService.addVehiculos(repuesto).subscribe((data) => {

      let repuestos = this.repuestosService.getVehiculos();
      repuestos.push(data);
      this.repuestosService.updateVehiculos(repuestos);
    });
  }
}
