import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VehiculosVentasService } from '../vehiculos-ventas.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  template: `<section id="login">
                <header>
                  <h1>Bienvenido</h1>
                  <h4>Ingrese usuario y contrasena</h4>
                </header>
                @if (errorMensaje){ 
                  <section id="errorMsg">
                    <p><i>{{errorMensaje}}</i></p>
                  </section>
                }
                <section id="login-form">
                  <article>
                    <input type="text" placeholder="Usuario" [(ngModel)]="usuario"/>
                  </article>
                  <article>
                  <input type="password" placeholder="Contrasena" [(ngModel)]="contrasena"/>
                  </article>
               
                    @if (showConfirContrasena){
                      <article>
                      <input type="password" placeholder="Repetir contrasena" [(ngModel)]="contrasena2"/>
                      </article>
                    }
               
                  @if(showConfirContrasena){
                    <article>
                  <button (click)="guadar()">Guardar</button> 
                  </article>  
                  <article>
                  <button (click)="cancelar()">Cancelar</button> 
                  </article>
                  }@else {
                      
                  <article>
                  <button (click)="loginAction()">Entrar</button> 
                  </article> 
                  <article>
                  <button (click)="registrar()">Registrar</button> 
                  </article> 
                  }                    
                </section>
              </section>`,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario = "";
  contrasena = "";
  contrasena2 = "";
  showConfirContrasena = false;
  errorMensaje = "";
  private AuthService: AuthService;
  private router: Router;
  private vehiculosVentasService: VehiculosVentasService;
  constructor(AuthService: AuthService, router: Router, vehiculosVentasService: VehiculosVentasService) {
    this.vehiculosVentasService = vehiculosVentasService;
    this.router = router;
    this.AuthService = AuthService;
  }

  guadar() {
    this.showConfirContrasena = !this.showConfirContrasena;
    let params = {
      username: this.usuario,
      password: this.contrasena
    }
    this.errorMensaje = "";
    this.AuthService.register(params).subscribe(a => {
    }, error => {
      this.errorMensaje = error.message;
    })
  }

  cancelar() {
    this.showConfirContrasena = !this.showConfirContrasena;
  }

  registrar() {
    this.showConfirContrasena = !this.showConfirContrasena;
  }

  loginAction() {
    this.showConfirContrasena = false;
    let params = {
      username: this.usuario,
      password: this.contrasena
    }
    this.errorMensaje = "";
    this.AuthService.login(params).subscribe(a => {
      if (a) {
        localStorage.setItem('token', a.token);
        this.vehiculosVentasService.setUserToken(a.token);
        this.router.navigate(['/vehiculos']);
      }
    }, error => {
      this.errorMensaje = error.message;
    })
  }




}
