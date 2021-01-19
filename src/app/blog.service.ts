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

export function getReadTime(blogPost: BlogPost): number {
  return Math.ceil(blogPost.content.split(' ').length / 200);
}

export function timeAgo(blogPost: BlogPost): string {
  const now = new Date().getTime();
  const then = new Date(blogPost.createdAt).getTime();
  const seconds = Math.floor((now - then) / 1000);
  if (Math.floor(seconds / 31536000) >= 1) {
    return `${Math.floor(seconds / 31536000)} years ago`;
  }
  if (Math.floor(seconds / 2592000) >= 1) {
    return `${Math.floor(seconds / 2592000)} months ago`;
  }
  if (Math.floor(seconds / 86400) >= 1) {
    return `${Math.floor(seconds / 86400)} days ago`;
  }
  if (Math.floor(seconds / 3600) >= 1) {
    return `${Math.floor(seconds / 3600)} hours ago`;
  }
  if (Math.floor(seconds / 60) >= 1) {
    return `${Math.floor(seconds / 60)} minutes ago`;
  }
  return `${Math.floor(seconds)} seconds ago`;
}

@Injectable({
  providedIn: 'root'
})

export class BlogService {
  private cache: BlogPostsResponse[] = [];
  private blogPostCache: BlogPost[] = [];
  constructor(private http: HttpClient) { }

  async getBlogPosts(page: number): Promise<BlogPostsResponse> {
    const cachedPage = this.cache.filter((res: BlogPostsResponse) => res.page == page)[0];
    if (cachedPage) return cachedPage;
    const posts: BlogPostsResponse = await this.http.get<BlogPostsResponse>(`${endpoint}/post?page=${page}`).toPromise();
    this.cache.push(posts);
    posts.posts.forEach((post: BlogPost) => this.blogPostCache.push(post));
    return posts;
  }

  async getBlogPost(slug: string): Promise<BlogPostResponse> {
    const a = this.blogPostCache.filter((post) => post.slug === slug)[0];
    if (a) return { post: a, message: '' } as BlogPostResponse;
    const post = await this.http.get<BlogPostResponse>(`${endpoint}/post/slug/${slug}`).toPromise();
    this.blogPostCache.push(post.post);
    return post;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    }
  }
}
