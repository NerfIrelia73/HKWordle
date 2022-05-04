import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InstructionsComponent } from '../modals/instructions/instructions.component';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  faQuestionCircle = faQuestionCircle

  ngOnInit(): void {
  }

  openInstructions() {
    const modalRef = this.modalService.open(InstructionsComponent, {
      size: 'xl',
      centered: true,
      windowClass: 'dark-modal'
    });
  }

}
