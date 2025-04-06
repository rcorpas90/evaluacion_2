import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestClientService {
  private apiUrl = 'http://localhost:3004/';
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getVehiculos(): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });  
    return this.http.get<any>(this.apiUrl + 'vehiculo', { headers });
  }


  addVehiculos(params: any): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });   
    return this.http.post<any>(this.apiUrl + 'vehiculo', params, { headers });
  }

  updateVehiculos(id: String, params: any) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') }); 
    return this.http.put<any>(`${this.apiUrl}vehiculo/${id}`, params, { headers }); 
  }


  deleteVehiculos(id: String) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });    
    return this.http.delete<any>(`${this.apiUrl}vehiculo/${id}`, { headers });
  }


  getVentas(): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });  
    return this.http.get<any>(this.apiUrl + 'venta', { headers });
  }


  addVentas(params: any): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
    return this.http.post<any>(this.apiUrl + 'venta', params,   { headers });
  }

  updateVentas(id: String, params: any) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
    return this.http.put<any>(`${this.apiUrl}venta/${id}`, params,  { headers });
  }


  deleteVentas(id: String) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });   
    return this.http.delete<any>(`${this.apiUrl}venta/${id}`,   { headers });
  }
}
