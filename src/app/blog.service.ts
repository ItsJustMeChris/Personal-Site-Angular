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

export function timeAgo(blogPost: any): string {
  const now = new Date().getTime();
  const then = new Date(blogPost.created_at).getTime();
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

function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, '');

  // Make the string lowercase
  str = str.toLowerCase();

  // Remove accents, swap ñ for n, etc
  var from =
    'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;';
  var to =
    'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------';
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  // Remove invalid chars
  str = str
    .replace(/[^a-z0-9 -]/g, '')
    // Collapse whitespace and replace by -
    .replace(/\s+/g, '-')
    // Collapse dashes
    .replace(/-+/g, '-');

  return str;
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private cache: BlogPostsResponse[] = [];
  private blogPostCache: BlogPost[] = [];
  constructor(private http: HttpClient, private authService: AuthService) {}

  async createBlogPost(title: string, content: string): Promise<any> {
    if (!this.authService.access_token) {
      return false;
    }
    const post: any = await this.http
      .post<any>(
        `${endpoint}/posts`,
        {
          title,
          content,
          slug: slugify(title),
        },
        {
          headers: {
            Authorization: `Bearer ${this.authService.access_token}`,
          },
        }
      )
      .toPromise();
    return post;
  }

  async getBlogPosts(page: number): Promise<any> {
    const posts: any[] = await this.http
      .get<any[]>(`${endpoint}/posts`)
      .toPromise();

    posts.forEach((post: BlogPost) => this.blogPostCache.push(post));
    return posts;
  }

  async getBlogPost(slug: string): Promise<any> {
    const post = await this.http
      .get<BlogPostResponse>(`${endpoint}/posts/${slug}`)
      .toPromise();

    return post;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
