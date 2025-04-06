import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormularioPartesComponent } from '../formulario-ventas/formulario-ventas.component';
import { VehiculosVentasService } from '../vehiculos-ventas.service';
import { RestClientService } from '../rest-client-vehiculos.service';

@Component({
  selector: 'app-partes',
  imports: [FormsModule, FormularioPartesComponent],
  template: `
  <app-formulario-partes/>
  <div class="table">
  <div class="table-header">
    <div class="table-row">
      <div class="table-cell">Matricula vehiculo</div>
      <div class="table-cell">Nombre comprador</div>
      <div class="table-cell">Nombre vendedor</div>
      <div class="table-cell">Fecha compra</div>
      <div class="table-cell">Precio venta</div>
      <div class="table-cell">Margen obtenido</div>
      <div class="table-cell">Acciones</div>
    </div>
  </div>
  <div class="table-body">
    @for (item of partes(); track item._id) {
      <div class="table-row">
      @if(edit[item._id]) {
        <div class="table-cell">
          {{item.vehiculo.matricula}}
        </div>
        <div class="table-cell">
          <input type="text" [(ngModel)]="item.nombre_comprador">
        </div>
        <div class="table-cell">
          <input type="text" [(ngModel)]="item.nombre_vendedor">
        </div>
        <div class="table-cell">
          {{item.vehiculo.fecha}}
        </div>
        <div class="table-cell">
          <input type="number" [(ngModel)]="item.precio">
        </div>
        <div class="table-cell">
        <button (click)="guardar(item._id, item.nombre_comprador, item.nombre_vendedor, item.precio)">Guardar</button>
        </div>
        }@else { 
        <div class="table-cell">{{item.vehiculo.matricula}}</div>
        <div class="table-cell">{{item.nombre_comprador}}</div>
        <div class="table-cell">{{item.nombre_vendedor}}</div>
        <div class="table-cell">{{item.fecha}}</div>
        <div class="table-cell">{{item.precio}}</div>    
        <div class="table-cell">{{item.precio - item.vehiculo.precio}}</div>       
       
       }
       <div class="table-cell">
        <button (click)="editar(item._id)">Editar</button>
        <button (click)="eliminar(item._id)">Eliminar</button>
      </div>
      </div> 
    }  
  </div>
</div>`,
  styleUrl: './ventas.component.css'
})
export class PartesComponent {
  edit: { [key: string]: boolean } = {};
  private RestClientService: RestClientService;
  private VehiculosVentasService: VehiculosVentasService;
  constructor(RestClientService: RestClientService, VehiculosVentasService: VehiculosVentasService) {
    this.RestClientService = RestClientService;
    this.VehiculosVentasService = VehiculosVentasService;
  }

  ngOnInit() {
    this.RestClientService.getVentas().subscribe((data) => {
       this.VehiculosVentasService.updateVentas(data.ventas);
    });
  }


  partes() {
    return this.VehiculosVentasService.getVentas();
  }

  editar(id: string) {
    for (let key in this.edit) {
      if (key !== id)
        this.edit[key] = false;
    }
    this.edit[id] = !this.edit[id];
  }

  eliminar(id: string){
    this.RestClientService.deleteVentas(id).subscribe((data) => {
      let ventas = this.VehiculosVentasService.getVentas();
      let index = ventas.findIndex((a) => a._id === id);
      ventas.splice(index, 1);
      this.VehiculosVentasService.updateVehiculos(ventas);
    });
    
  }

  guardar(id: string, comprador: string, vendedor: string, precio: number){
    var params = {
      _id: id,
      nombre_vendedor: vendedor,
      nombre_comprador: comprador,
      precio: precio
    }
    this.RestClientService.updateVentas(id, params).subscribe((data) => {
      this.VehiculosVentasService.updateSingleVenta(id, params);
      this.edit[id] = false;
    });
  }
}
