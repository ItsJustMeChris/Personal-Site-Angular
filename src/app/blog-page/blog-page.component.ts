import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import {
  BlogService,
  BlogPost,
  BlogPostResponse,
  getReadTime,
} from '../blog.service';
import { ActivatedRoute } from '@angular/router';
import TimeAgo from 'javascript-time-ago';

import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safeHTML' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css'],
})
export class BlogPageComponent implements OnInit {
  private blog: BlogService;
  public blogPost: any;
  public getReadTime = getReadTime;
  public timeAgo = new TimeAgo('en-US');

  constructor(blog: BlogService, private route: ActivatedRoute) {
    this.blog = blog;
  }

  public getTimeAgo(time) {
    const date = new Date(time);
    // const userTimezoneOffset = date.getTimezoneOffset() * 60000;

    return this.timeAgo.format(new Date(date.getTime()));
  }

  async ngOnInit(): Promise<any> {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.blogPost = await this.blog.getBlogPost(slug);
  }
}
