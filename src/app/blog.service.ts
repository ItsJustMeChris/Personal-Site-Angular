import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = "https://api.itschris.dev/api/v1";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export interface BlogPost {
  author: string;
  content: string;
  image: string;
  postTime: string;
  slug: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})

export class BlogService {

  constructor(private http: HttpClient) { }

  getBlogPosts(page: number): Observable<BlogPost[]> {
    const posts = this.http.get<BlogPost[]>(`${endpoint}/blog/paginate/${page}`);
    console.log(posts);
    return posts;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
