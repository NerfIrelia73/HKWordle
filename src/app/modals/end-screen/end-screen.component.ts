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
  @Input() public hardMode: any;

  ngOnInit(): void {
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
    const now = Date.now()
    let text = ""
    let longest = 0
    if (this.won) {
      text = `I solved Hunter's Journle #${Math.floor(now / 86400000) - 19115} in ${this.guesses.length} guesses${this.hardMode ? ' :star2: **on Hard Mode!** :star2:': '!'}\n\n`
    } else {
      text = `I was unable to solve Hunter's Journle #${Math.floor(now / 86400000) - 19115}${this.hardMode ? ' :star2: **on Hard Mode** :star2:': ''}\n\n`
    }
    for (let i = 0; i < this.guesses.length; i++) {
      if (longest < this.guesses[i].name.length) {
        longest = this.guesses[i].name.length
      }
    }
    for (let i = this.guesses.length - 1; i >= 0; i--) {
      if (this.guesses[i].area == this.answer.area) {
        text += ":blue_heart:" //(this.hardMode ? ":star2:" : ":green_square:")
      } else {
        text += ":black_large_square:"
      }

      if (this.guesses[i].kills == this.answer.kills) {
        text += ":blue_heart:" //(this.hardMode ? ":star2:" : ":green_square:")
      } else {
        text += ":black_large_square:"
      }

      if (this.guesses[i].health == this.answer.health) {
        text += ":blue_heart:" //(this.hardMode ? ":star2:" : ":green_square:")
      } else {
        text += ":black_large_square:"
      }

      if (this.guesses[i].geo == this.answer.geo) {
        text += ":blue_heart:" //(this.hardMode ? ":star2:" : ":green_square:")
      } else {
        text += ":black_large_square:"
      }
      text += ` ||${this.guesses[i].name}`
      text += ' '.repeat(longest - this.guesses[i].name.length + 10) + "||\n"
    }
    text += "\nTry it yourself at https://hunters-journle.web.app/"
    return text
  }

}
