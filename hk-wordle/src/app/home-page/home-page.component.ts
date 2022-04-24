import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InstructionsComponent } from '../instructions/instructions.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openInstructions() {
    console.log("hello world")
    const modalRef = this.modalService.open(InstructionsComponent, {
      size: 'xl',
      centered: true,
      windowClass: 'dark-modal'
    });
  }

}
