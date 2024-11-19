import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.baseUrl}/Auth`; 
  
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    
    return this.http.post<ApiResponse<User>>(`${this.apiUrl}/login`, credentials).pipe(
      map((response: ApiResponse<User>) => {
        if (response.success) {
          const encodedData = btoa(`${username}:${password}`);
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('authData', encodedData);
          localStorage.setItem('userId', response.data!.id!.toString());
        }
        return response;
      }),
      catchError(error => {
        console.error('Login failed', error);
        localStorage.removeItem('authData');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userId');
        throw error;
      })
    );
  }

  register(username: string, password: string): Observable<any> {
    const encodedPassword = btoa(password);
    const credentials = { username, password:encodedPassword};
    return this.http.post(`${this.apiUrl}/register`, credentials);
  }

  logout(): void {
    localStorage.removeItem('authData');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userId');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('isAuthenticated');
  }

  getDecodedAuthData(): string | null {
    const encodedData = localStorage.getItem('authData');
    if (encodedData) {
      return atob(encodedData); 
    }
    return null;
  }
}
