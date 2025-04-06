import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3004/';
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  login(params: Object): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'login', params).pipe(
      catchError(this.handleError)
    );
  }


  register(params: Object): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'register', params).pipe(
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }


}