import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = "https://api.itschris.dev";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export interface BlogPost {
  author: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
  slug: string;
  title: string;
}

export interface BlogPostsResponse extends Response {
  limit: number;
  message: string;
  page: number;
  posts: BlogPost[];
  status: string;
  total: number;
}

export interface User {
  name: string;
}

export interface Response {
  message: string;
  status: string;
  code?: number;
}

export interface BlogPostResponse extends Response {
  post: BlogPost;
  user: User;
}


@Injectable({
  providedIn: 'root'
})

export class BlogService {
  private cache: BlogPostsResponse[] = [];
  constructor(private http: HttpClient) { }

  async getBlogPosts(page: number): Promise<BlogPostsResponse> {
    const cachedPage = this.cache.filter((res: BlogPostsResponse) => res.page == page)[0];
    if (cachedPage) return cachedPage;
    const posts: BlogPostsResponse = await this.http.get<BlogPostsResponse>(`${endpoint}/post?page=${page}`).toPromise();
    this.cache.push(posts);
    return posts;
  }

  async getBlogPost(slug: string): Promise<BlogPostResponse> {
    const post = await this.http.get<BlogPostResponse>(`${endpoint}/post/slug/${slug}`).toPromise();
    return post;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    }
  }
}
