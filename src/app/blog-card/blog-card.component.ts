import {
  Component,
  OnInit,
  Input,
  HostListener,
  ElementRef,
  HostBinding,
} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { BlogPost, getReadTime, timeAgo } from '../blog.service';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css'],
})

// English.
export class BlogCardComponent {
  @Input() blogPost: any;
  public getReadTime = getReadTime;
  public timeAgo = new TimeAgo('en-US');

  public showContent: boolean;

  constructor(
    private element: ElementRef,
    private router: Router,
    private location: Location
  ) {}

  @HostBinding('class')
  get full() {
    return this.showContent ? 'full' : 'normal';
  }

  public getTimeAgo(time) {
    const date = new Date(time);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;

    return this.timeAgo.format(new Date(date.getTime() - userTimezoneOffset));
  }

  @HostListener('click', ['$event'])
  onClick() {
    this.router.navigate([`/blog/${this.blogPost.slug}`]);
    window.scroll(0, 0);
  }
}
