import { Component, OnInit, Input, HostListener, ElementRef, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})


export class BlogCardComponent implements OnInit {
  @Input() author: string;
  @Input() content: string;
  @Input() image: string;
  @Input() postTime: string;
  @Input() slug: string;
  @Input() title: string;

  showContent: boolean;
  card: string = '';

  constructor(private element: ElementRef, private router: Router, private location: Location) { }

  ngOnInit(): void {
  }

  getReadTime(): number {
    return Math.ceil(this.content.split(' ').length / 200);
  }

  timeAgo(): string {
    const now = new Date().getTime();
    const then = new Date(this.postTime).getTime();
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

  @HostBinding('class')
  get full() {
    return this.showContent ? 'full' : 'normal';
  };

  @HostListener('click', ['$event'])
  onClick(e) {
    this.router.navigate([`/blog/${this.slug}`]);
    window.scroll(0, 0);
  }
}
