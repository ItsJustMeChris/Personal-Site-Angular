import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogPosts: any = [];

  constructor(public blog: BlogService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.blog.getBlogPosts(0).subscribe(data => this.blogPosts = data);
  }
}
