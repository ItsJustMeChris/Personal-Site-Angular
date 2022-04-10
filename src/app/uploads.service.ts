import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

const endpoint = 'https://api.itschris.dev';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  async upload(file: File, key: string): Promise<any> {
    if (!this.authService.access_token) {
      return false;
    }
    const { url }: { url: string } = await this.http
      .post<any>(
        `${endpoint}/uploads`,
        {
          key,
        },
        {
          headers: {
            Authorization: `Bearer ${this.authService.access_token}`,
          },
        }
      )
      .toPromise();

    try {
      await this.http.put(url, file).toPromise();
      return `https://itschris.s3.filebase.com/${key}`;
    } catch (ex) {
      return null;
    }
  }
}
