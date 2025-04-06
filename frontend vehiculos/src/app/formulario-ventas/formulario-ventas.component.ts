import { Component, OnInit } from '@angular/core';
import { RestClientService } from '../rest-client-vehiculos.service';
import { VehiculosVentasService } from '../vehiculos-ventas.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-formulario-partes',
  imports: [FormsModule],
  template: `<h1>Ventas</h1>
             <div class="form">
              <div class="form-group">
              <label for="coches">Vehiculo:</label>
              <!--<div class="dropdown">
                  <button>Seleccionar opciones</button>
                  <div class="dropdown-content">
                  
                  @for (item of repuestos; track item._id) {
                    <label>
                    <input  [(ngModel)]="item.selected" (change)="addVehiculosSeleccionados(item)"> {{item.marca}}
                    </label>
                  }                   
                    
                  </div>
              </div>-->
              <select [(ngModel)]="vehiculoSeleccionado">
                @for (item of vehiculos; track item._id) {
                    <option [value]="item._id">{{ item.matricula }}</option>
                 }  
 
              </select>
              </div>
             <div class="form-group">
                <label for="modelo">Nombre comprador:</label>
                <input type="text" id="comprador" placeholder="comprador" [(ngModel)]="nombre_comprador">
              </div>    
              <div class="form-group">
                <label for="modelo">Nombre vendedor:</label>
                <input type="text" id="vendedor" placeholder="vendedor" [(ngModel)]="nombre_vendedor">
              </div>    
              <div class="form-group">
                <label for="modelo">Precio compra:</label>
                <input type="number" id="precio" placeholder="precio" [(ngModel)]="precio_compra">
              </div>            
              <div class="form-group">
                <button (click)="adicionarParte()">Adicionar</button>
              </div>
            </div>`,
  styleUrls: ['./formulario-ventas.component.css']
})
export class FormularioPartesComponent implements OnInit {
  vehiculos = Array<any>();
  vehiculoSeleccionado=null;
  nombre_comprador="";
  nombre_vendedor="";
  precio_compra=0;
  private RestClientService: RestClientService;
  private VehiculosVentasService: VehiculosVentasService;
  constructor(RestClientService: RestClientService, VehiculosVentasService: VehiculosVentasService) {
    this.RestClientService = RestClientService;
    this.VehiculosVentasService = VehiculosVentasService;
  }
  ngOnInit() {
    this.RestClientService.getVehiculos().subscribe((data) => {
       this.vehiculos = data.vehiculos;
    });
    
  }

  adicionarParte() {
    let repuesto = {
       vehiculo: this.vehiculoSeleccionado,
       nombre_comprador: this.nombre_comprador,
       nombre_vendedor: this.nombre_vendedor,
       fecha: new Date(),
       precio: this.precio_compra

    }
    this.RestClientService.addVentas(repuesto).subscribe((data) => {
      let ventas = this.VehiculosVentasService.getVentas();
      ventas.push(data);
      this.VehiculosVentasService.updateVentas(ventas);
    });
  }

 
}
