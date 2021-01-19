import { Component, OnInit, Input, HostListener, ElementRef, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { BlogPost, getReadTime, timeAgo } from '../blog.service';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})


export class BlogCardComponent {
  @Input() blogPost: BlogPost;
  public getReadTime = getReadTime;
  public timeAgo = timeAgo;

  public showContent: boolean;

  constructor(private element: ElementRef, private router: Router, private location: Location) { }

  @HostBinding('class')
  get full() {
    return this.showContent ? 'full' : 'normal';
  };

  @HostListener('click', ['$event'])
  onClick() {
    this.router.navigate([`/blog/${this.blogPost.slug}`]);
    window.scroll(0, 0);
  }
}
