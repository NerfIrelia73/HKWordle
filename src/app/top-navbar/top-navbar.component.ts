import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopNavbarComponent implements OnInit {

  constructor() { }

  @Output() newModeEvent = new EventEmitter<number>();

  ngOnInit(): void {
  }

  changeGameMode(mode: any) {
    console.log(`This is the first one`)
    console.log(mode.tab.textLabel)
    this.newModeEvent.emit(mode)
  }

}
