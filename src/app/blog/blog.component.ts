import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService, BlogPost, BlogPostsResponse } from '../blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  blogPosts: Partial<any[]> = [];
  loadedPosts: Promise<boolean>;

  constructor(
    public blog: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // Check blogPosts for slug if slug is present, we want to load that element first,
  // Once loaded, we load the page of blog posts, filter out and reorder based on time,
  // If slug is not found, we navigate to the 404 page, not just replace the location since, this is a missing page.
  async ngOnInit(): Promise<any> {
    this.blog.getBlogPosts(0).then((posts) => {
      this.blogPosts = posts;
    });
    this.loadedPosts = Promise.resolve(true);
  }
}
