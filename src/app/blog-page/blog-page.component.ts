import { Component, OnInit } from '@angular/core';
import { BlogService, BlogPost, BlogPostResponse, getReadTime, timeAgo } from '../blog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {
  private blog: BlogService;
  public blogPost: BlogPostResponse;
  public getReadTime = getReadTime;
  public timeAgo = timeAgo;

  constructor(blog: BlogService, private route: ActivatedRoute) {
    this.blog = blog;
  }

  async ngOnInit(): Promise<any> {
    console.log('buid');
    const slug = this.route.snapshot.paramMap.get('slug');
    this.blogPost = await this.blog.getBlogPost(slug);
  }
}
