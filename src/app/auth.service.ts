import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import jwt_decode from 'jwt-decode';

const endpoint = 'https://api.itschris.dev';

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
  private refreshTicker: number = undefined;

  constructor(private http: HttpClient) {}

  getAccessToken(): boolean {
    const access_token = localStorage.getItem('access_token');
    if (
      access_token !== 'undefined' &&
      access_token !== null &&
      access_token !== undefined &&
      access_token
    ) {
      const decoded: any = jwt_decode(access_token);
      if (decoded.exp > Date.now() / 1000) {
        this.access_token = access_token;
        this.startTicker();
        return true;
      }
    }
    return false;
  }

  async refreshAccessToken() {
    const response: any = await this.http
      .post(
        `${endpoint}/auth/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.access_token}`,
          },
        }
      )
      .toPromise();

    if (!response.access_token) {
      return;
    }

    this.access_token = response.access_token;

    this.startTicker();

    localStorage.setItem('access_token', this.access_token);
  }

  watchAccessToken(access_token: string) {
    const decoded: any = jwt_decode(access_token);
    // if token is within 10 minutes of expiring, refresh it
    if (decoded.exp * 1000 - Date.now() < 10 * 60 * 1000) {
      this.refreshAccessToken();
      clearInterval(this.refreshTicker);
      this.refreshTicker = undefined;
    }
  }

  startTicker() {
    if (this.refreshTicker) {
      clearInterval(this.refreshTicker);
      this.refreshTicker = undefined;
    }
    this.refreshTicker = setInterval(() => {
      this.watchAccessToken(this.access_token);
    });
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      const response = await this.http
        .post<{ access_token: string }>(`${endpoint}/auth/login`, {
          username,
          password,
        })
        .toPromise();

      if (!response.access_token) {
        return false;
      }
      this.access_token = response.access_token;

      this.startTicker();

      localStorage.setItem('access_token', this.access_token);
      return true;
    } catch (ex) {
      return false;
    }
  }
}
