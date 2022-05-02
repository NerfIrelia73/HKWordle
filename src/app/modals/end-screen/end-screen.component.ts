import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CopiedComponent } from '../copied/copied.component';

@Component({
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  styleUrls: ['./end-screen.component.scss']
})
export class EndScreenComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) { }

  @Input() public guesses: any;
  @Input() public won: any;
  @Input() public answer: any;
  @Input() public mode: any;

  ngOnInit(): void {
    console.log("Logging guesses")
    console.log(this.guesses)
    console.log(this.won)
  }

  copyToClipboard() {
    const text = this.createText()
    navigator.clipboard.writeText(text);
    const tooltip = document.getElementById("myTooltip");
    if (tooltip) {
      tooltip.innerHTML = "Copied to clipboard!";
    }
    this.modalService.open(CopiedComponent, {
      size: 'm',
      centered: false,
      windowClass: 'dark-modal'
    });
  }

  createText() {
    let text = ""
    if (this.won) {
      text = `I solved today's Hunter's Journle in ${this.guesses.length} guesses!\n\n`
    } else {
      text = "I was unable to solve today's Hunter's Journel\n\n"
    }
    for (let i = this.guesses.length - 1; i >= 0; i--) {
      if (this.guesses[i].area == this.answer.area) {
        text += ":green_square:"
      } else {
        text += ":black_large_square:"
      }

      if (this.guesses[i].kills == this.answer.kills) {
        text += ":green_square:"
      } else {
        text += ":black_large_square:"
      }

      if (this.guesses[i].health == this.answer.health) {
        text += ":green_square:"
      } else {
        text += ":black_large_square:"
      }

      if (this.guesses[i].geo == this.answer.geo) {
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
