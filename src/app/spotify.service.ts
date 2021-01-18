import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = "https://api.spotify.com/v1";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class SpotifyService {
  private cache = [];
  constructor(private http: HttpClient) { }

  // async getNowPlaying(): Promise<any> {
  //   const songInfo = await this.http.get<any>(`${endpoint}/me/player`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer BQDN7EOGowYW3bSmIYyHxe0FIjR8pCQT8_pDI8wdlYEkTHah6I2xPk5gaLgsvYOqGcDTUBzB78r--4mwqU6PSWjNmgQ7Mg8idP5XBdOM5l-2gK2FHXICfww4qVgEeufFGSqptbd5hxDCV8dGUFSaFvCuYwFcL2bQiQ'
  //     }
  //   }).toPromise();
  //   return songInfo;
  // }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    }
  }
}
