import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void { }

}
