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

  constructor() { }

  ngOnInit(): void { }
}
