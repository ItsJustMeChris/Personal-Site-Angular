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
  private cache = [];
  constructor(private http: HttpClient) { }

  async getBlogPosts(page: number): Promise<BlogPost[]> {
    if (this.cache[page]) return [...this.cache[page]];
    const posts = await this.http.get<BlogPost[]>(`${endpoint}/blog/paginate/${page}`).toPromise();
    this.cache[page] = [];
    posts.forEach((post) => this.cache[page].push(post));
    return this.cache[page];
  }

  async getBlogPost(slug: string): Promise<BlogPost> {
    const cached = this.cache.filter((post) => post.slug === slug);
    console.log(cached, slug)
    if (cached.length > 0) return cached[0];
    const post = await this.http.get<BlogPost>(`${endpoint}/blog/post/${slug}`).toPromise();
    return post;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    }
  }
}
