import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import jwt_decode from 'jwt-decode';

const endpoint = 'http://127.0.0.1:3000';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

export interface User {
  id: number;
  username: string;
  email: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public access_token: string = undefined;

  constructor(private http: HttpClient) {}

  getAccessToken(): boolean {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      const decoded: any = jwt_decode(access_token);
      if (decoded.exp > Date.now() / 1000) {
        this.access_token = access_token;
        return true;
      }
    }
    return false;
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      const response = await this.http
        .post<{ access_token: string }>(`${endpoint}/auth/login`, {
          username,
          password,
        })
        .toPromise();

      this.access_token = response.access_token;

      localStorage.setItem('access_token', this.access_token);
      return true;
    } catch (ex) {
      return false;
    }
  }
}
