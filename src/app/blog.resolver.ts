import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { BlogPostResponse, BlogPostsResponse, BlogService } from './blog.service';

@Injectable({
  providedIn: 'root'
})
export class BlogResolver implements Resolve<Array<BlogPostResponse | BlogPostsResponse>> {

  constructor(private blogService: BlogService) { }

  public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    const slug = route.paramMap.get('slug');
    if (slug) {
      console.log('start')
      await this.blogService.getBlogPost(slug);
      console.log('end');
      return true;
    }
    return await this.blogService.getBlogPosts(0);
  }
}
