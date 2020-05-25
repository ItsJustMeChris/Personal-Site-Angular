import { Component, OnInit, Input, HostListener, ElementRef, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { BlogCardService } from '../blog-card.service';

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

  showContent: boolean = false;
  card: string = '';

  constructor(private element: ElementRef, public service: BlogCardService, private router: Router) { }

  ngOnInit(): void {
    this.service.card.subscribe(data => this.card = data);
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

  @HostListener('document:click', ['$event'])
  clickout(event) {
    console.log(`Card ${this.card}, SLUG ${this.slug}`);
    if (this.element.nativeElement.contains(event.target)) {
      this.service.setCurrentCard(this.slug);
      this.showContent = true;
      this.router.navigate([`/blog/${this.slug}`]);
    } else if (this.slug === this.card) {
      this.service.setCurrentCard('');
      this.showContent = false;
      this.router.navigate(['/']);
    }
  }
}
