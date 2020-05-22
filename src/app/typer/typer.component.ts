import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-typer',
  templateUrl: './typer.component.html',
  styleUrls: ['./typer.component.css']
})
export class TyperComponent implements OnInit {
  @Input() typedMessages: any = [];
  @Input() pauseDuration: number = 10;
  @Input() typeDifference: boolean = true;

  messageInterval: any;
  message: string = '';
  currentMessage: number = 0;
  currentMessagePosition: number = 0;
  pauseForTicks: number = this.pauseDuration;

  constructor() { }

  ngOnInit(): void {
    this.messageInterval = setInterval(() => this.doTyping(), 50);
  }

  ngOnDestroy() {
    clearInterval(this.messageInterval);
  }

  doTyping(): void {
    if (this.currentMessagePosition < this.typedMessages[this.currentMessage].length) {
      this.message += this.typedMessages[this.currentMessage][this.currentMessagePosition++];
    } else if (this.currentMessagePosition === this.typedMessages[this.currentMessage].length) {
      this.doBackspace();
    }
  }

  doBackspace(): any {
    if (this.pauseForTicks > 0) return this.pauseForTicks--;
    if (this.message.length > 0) {
      this.message = this.message.substring(0, this.message.length - 1);
    } else if (this.message.length === 0) {
      this.currentMessagePosition = 0;
      this.pauseForTicks = this.pauseDuration;
      this.currentMessage = this.currentMessage + 1 < this.typedMessages.length ? this.currentMessage + 1 : 0;
    }
  }
}
