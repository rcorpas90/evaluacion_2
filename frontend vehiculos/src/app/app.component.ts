import { Component, computed } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { VehiculosVentasService } from './vehiculos-ventas.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
  template: `<header>
    @if(userToken()){
      <a routerLink="/vehiculos" routerLinkActive="active" ariaCurrentWhenActive="page">Vehiculos</a>
      <a routerLink="/ventas" routerLinkActive="active" ariaCurrentWhenActive="page">Ventas</a>   
    }
                   
                  <a routerLink="/" routerLinkActive="active" ariaCurrentWhenActive="page" (click)="logOut()">Desconectar</a>
             </header>
               <router-outlet>
             <footer>
              Copyright 2025
             </footer>`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ejercicio3';
  private router: Router;
  userToken = computed(() => this.vehiculosVentasService.getUserToken() || null);
  constructor(router: Router, private vehiculosVentasService: VehiculosVentasService) {
    this.vehiculosVentasService = vehiculosVentasService;
    this.router = router;
  }


  logOut() {
    localStorage.removeItem('token');
    this.vehiculosVentasService.deleteUserToken();
    this.router.navigate(['/login']);
    this.vehiculosVentasService.updateVehiculos([]);
    this.vehiculosVentasService.updateVentas([]);
    }
}
