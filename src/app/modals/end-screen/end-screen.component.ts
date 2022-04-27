import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  styleUrls: ['./end-screen.component.scss']
})
export class EndScreenComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  @Input() public guesses: any;

  ngOnInit(): void {
    console.log("Logging guesses")
    console.log(this.guesses)
  }

  copyToClipboard() {
    const copyText = document.getElementById("shareButton");
    const text = this.createText()
    navigator.clipboard.writeText(text);
    const tooltip = document.getElementById("myTooltip");
    if (tooltip) {
      tooltip.innerHTML = "Copied to clipboard!";
    }
  }

  createText() {
    let text = `I solved today's Hunter's Journle in ${this.guesses.length} guesses!\n\n`
    for (let i = this.guesses.length - 1; i >= 0; i--) {
      if (this.guesses[i].area == this.guesses[0].area) {
        text += ":green_square:"
      } else {
        text += ":black_large_square:"
      }

      if (this.guesses[i].kills == this.guesses[0].kills) {
        text += ":green_square:"
      } else {
        text += ":black_large_square:"
      }

      if (this.guesses[i].health == this.guesses[0].health) {
        text += ":green_square:"
      } else {
        text += ":black_large_square:"
      }

      if (this.guesses[i].geo == this.guesses[0].geo) {
        text += ":green_square:"
      } else {
        text += ":black_large_square:"
      }
      text += `||${this.guesses[i].name}||\n`
    }
    text += "\nTry it yourself at {{ website }}"
    return text
  }

}
