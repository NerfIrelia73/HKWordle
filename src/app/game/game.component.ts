import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { SearchService } from '../search.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { openEndScreen, sortArray, openInstructions, getDailyAnswer } from '../helper-functions'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameMode = "The Daily Puzzle"
  faArrowDown = faArrowDown
  faArrowUp = faArrowUp
  faQuestionCircle = faQuestionCircle
  won = false;
  post: Post[] = []
  answer: Post = {name: "", area: "", kills: 0, health: 0, geo: 0, order: -1}
  constructor(
    private searchService: SearchService, private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.searchService.getPosts().subscribe((posts: Post[]) => {
      this.searchService.dataEntries = posts
      this.answer = getDailyAnswer()
      if (localStorage.getItem("dailyArr") != null) {
        this.post = JSON.parse(localStorage.getItem("dailyArr") as string)
      }
      this.checkVictory()
      console.log(this.answer)
    });
  }

  onSelectedOption(e: any) {
    console.log("This is E")
    console.log(e)
    this.post = sortArray(e)
    if (this.gameMode == "The Daily Puzzle") {
      localStorage.setItem("dailyArr", JSON.stringify(this.post))
    }
    this.checkVictory()
  }


  changeMode(mode: any) {
    console.log(`This is mode: ${mode.tab.textLabel}`)
    this.gameMode = mode.tab.textLabel
    this.won = false
    if (mode.tab.textLabel == "The Daily Puzzle") {
      if (localStorage.getItem("dailyArr") != null) {
        this.post = JSON.parse(localStorage.getItem("dailyArr") as string)
        this.checkVictory()
      } else {
        this.post = []
      }
      this.answer = getDailyAnswer()
    } else if (mode.tab.textLabel == "Free Play") {
      this.answer = this.searchService.dataEntries[Math.floor(Math.random() * this.searchService.dataEntries.length)]
      this.post = []
    }
  }

  checkVictory() {
    console.log("Checking victory")
    console.log(this.post)
    console.log(this.answer)
    console.log(this.post.includes(this.answer))
    //We can't use includes because the order attribute gets reset
    for (let item of this.post) {
      if (item.name == this.answer.name) {
        this.won = true
      }
    }
    if (this.won) {
      openEndScreen(true, this.modalService, this.post, this.answer, this.gameMode)
    } else if (this.post.length == 5) {
      openEndScreen(false, this.modalService, this.post, this.answer, this.gameMode)
    }
  }

  openInst() {
    openInstructions(this.modalService)
  }
}
