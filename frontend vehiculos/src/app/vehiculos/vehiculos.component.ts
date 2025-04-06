import { Component, OnInit } from '@angular/core';
import { RestClientService } from '../rest-client-vehiculos.service';
import { VehiculosVentasService } from '../vehiculos-ventas.service';
import { FormsModule } from '@angular/forms';
import { FormularioComponent } from '../formulario-vehiculos/formulario-vehiculos.component';
@Component({
  selector: 'app-repuestos',
  imports: [FormsModule, FormularioComponent],
  template: `
  <app-formulario/>
  <div class="table">
  <div class="table-header">
    <div class="table-row">
      <div class="table-cell">Marca</div>
      <div class="table-cell">Modelo</div>
      <div class="table-cell">Matricula</div>
      <div class="table-cell">Precio adquisicion</div>
      <div class="table-cell">Acciones</div>
    </div>
  </div>
  <div class="table-body">
    @for (item of repuestos(); track item._id) {
      <div class="table-row">
       @if(editRepuesto[item._id]) {
        <div class="table-cell">
          <input type="text" [(ngModel)]="item.marca">
        </div>
        <div class="table-cell">
          <input type="text" [(ngModel)]="item.modelo">
        </div>
        <div class="table-cell">
          <input type="text" [(ngModel)]="item.matricula">
        </div>
        <div class="table-cell">
          <input type="number" [(ngModel)]="item.precio">
        </div>
        <div class="table-cell">
        <button (click)="guardarRepuesto(item._id, item.marca, item.modelo, item.matricula, item.precio)">Guardar</button>
        </div>
        }@else {  
          <div class="table-cell">{{item.marca}}</div>
          <div class="table-cell">{{item.modelo}}</div>
          <div class="table-cell">{{item.matricula}}</div>
          <div class="table-cell">{{item.precio}}</div>
        }
      
      <div class="table-cell">  
        <button (click)="editarRepuesto(item._id)">Editar</button>
        <button (click)="eliminarRepuesto(item._id)">Eliminar</button>
      </div>
    </div>
    }    
  </div>
</div>`,
  styleUrl: './vehiculos.component.css'
})
export class RepuestosComponent implements OnInit {
  editRepuesto: { [key: string]: boolean } = {};
  private RestClientService: RestClientService;
  private repuestosService: VehiculosVentasService;
  constructor(RestClientService: RestClientService, repuestosService: VehiculosVentasService) {
    this.RestClientService = RestClientService;
    this.repuestosService = repuestosService;
  }

  ngOnInit() {
    this.RestClientService.getVehiculos().subscribe((data) => {
      this.repuestosService.updateVehiculos(data.vehiculos);
    });
  }


  repuestos() {
    return this.repuestosService.getVehiculos();
  }

  eliminarRepuesto(id: String) {
    this.RestClientService.deleteVehiculos(id).subscribe((data) => {
      let repuestos = this.repuestosService.getVehiculos();
      let index = repuestos.findIndex((a) => a._id === id);
      repuestos.splice(index, 1);
      this.repuestosService.updateVehiculos(repuestos);
    });

  }

  editarRepuesto(id: string) {
    for (let key in this.editRepuesto) {
      if (key !== id)
        this.editRepuesto[key] = false;
    }
    this.editRepuesto[id] = !this.editRepuesto[id];
  }

  guardarRepuesto(id: string, marca: string, modelo: string, matricula: string, precio: number) {
    var params = {
      _id: id,
      marca: marca,
      modelo: modelo,
      matricula: matricula,
      precio: precio
    }
    this.RestClientService.updateVehiculos(id, params).subscribe((data) => {
      this.repuestosService.updateSingleVehiculo(id, params);
      this.editRepuesto[id] = false;
    });
  }

}
