import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'https://api.itschris.dev';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TraktTVService {
  private cache = [];
  constructor(private http: HttpClient) {}

  async getNowPlaying(): Promise<any> {
    const songInfo = await this.http
      .get<any>(`${endpoint}/tools/trakttv`)
      .toPromise();
    return songInfo;
  }
}
