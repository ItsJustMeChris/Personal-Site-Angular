import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  public year: number = this.getYear();
  constructor() {}

  ngOnInit(): void {}

  public getYear(): number {
    return new Date().getFullYear();
  }
}
