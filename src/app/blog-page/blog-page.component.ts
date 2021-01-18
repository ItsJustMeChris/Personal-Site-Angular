import { Component, OnInit } from '@angular/core';
import { BlogService, BlogPost, BlogPostResponse } from '../blog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {
  private blog: BlogService;
  public blogPost: BlogPostResponse;

  constructor(blog: BlogService, private route: ActivatedRoute) {
    this.blog = blog;
  }

  async ngOnInit(): Promise<any> {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.blogPost = await this.blog.getBlogPost(slug);
  }

}
