import { Component, Injector, OnInit } from '@angular/core';
import { Post } from '../post';
import { SearchService } from '../search.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EndScreenComponent } from '../modals/end-screen/end-screen.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameMode = 0
  post: Post[] = []
  answer: Post = {name: "", area: "", kills: 0, health: 0, geo: 0, order: -1}
  constructor(
    private searchService: SearchService, private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.searchService.getPosts().subscribe((posts: Post[]) => {
      this.searchService.dataEntries = posts
      this.answer = posts[Math.floor(Math.random() * posts.length)]
      console.log(this.answer)
    });
  }

  onSelectedOption(e: any) {
    console.log("This is E")
    console.log(e)
    this.post = this.sortArray(e)
    if (e.includes(this.answer)) {
      this.openEndScreen()
    }
  }

  sortArray(e: Post[]) {
    e.sort((a, b) => (a.order < b.order) ? 1 : -1)
    console.log("Sorted E")
    console.log(e)
    return e
  }

  openEndScreen() {
    console.log("hello world")
    const modalRef = this.modalService.open(EndScreenComponent, {
      size: 'l',
      centered: true,
      windowClass: 'dark-modal'
    });
    modalRef.componentInstance.guesses = this.post;
  }
}
