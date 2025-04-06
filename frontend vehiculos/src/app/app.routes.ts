import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RepuestosComponent } from './vehiculos/vehiculos.component';
import { PartesComponent } from './ventas/ventas.component';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(): boolean {
        const token = localStorage.getItem('token');
        if (token) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'vehiculos', component: RepuestosComponent, canActivate: [AuthGuard] },
    { path: 'ventas', component: PartesComponent, canActivate: [AuthGuard] }
];
