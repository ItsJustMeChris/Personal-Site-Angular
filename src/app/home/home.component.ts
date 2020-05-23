import { Component, OnInit, HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  typedMessage: any = [
    "I create things",
    "I help build the future",
    "I write JavaScript, PHP, and More",
    "I make the impossible",
  ];

  background: string;

  constructor() { }

  ngOnInit(): void {
    this.background = this.getColor();
  }

  getColor(): string {
    return `hsl(${360 * Math.random()}, ${Math.random() * (80 - 25) + 25}%, ${Math.random() * (60 - 45) + 45}%)`;
  }
}
