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
  resetPosts: Post[] = []
  won = false;
  post: Post[] = []
  answer: Post = {name: "", area: "", kills: 0, health: 0, geo: 0, alias: [""], order: -1}
  now = Date.now()
  puzzleNumber = Math.floor(this.now / 86400000) - 19115
  hardMode = false;
  constructor(
    private searchService: SearchService, private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.searchService.getPosts().subscribe((posts: Post[]) => {
      const now = Date.now()
      const today = Math.floor(now / 86400000) as unknown as string
      this.searchService.dataEntries = posts
      this.resetPosts = posts
      this.answer = getDailyAnswer()
      console.log("Hello world")
      if (localStorage.getItem('today') == null) {
        localStorage.clear()
        localStorage.setItem('today', today)
      } else {
        if (localStorage.getItem("dailyArr") != null && localStorage.getItem("today") != null && (localStorage.getItem('today') as string == today)) {
          this.post = JSON.parse(localStorage.getItem("dailyArr") as string)
          this.hardMode = localStorage.getItem('hardMode') == 'true'
        } else {
          localStorage.clear()
          localStorage.setItem('today', today)
        }
      }
      this.checkVictory()
      console.log(this.post)
    });
  }

  onSelectedOption(e: any) {
    console.log(this.post)
    console.log(e)
    this.post = sortArray(e)
    if (this.gameMode == "The Daily Puzzle") {
      localStorage.setItem("dailyArr", JSON.stringify(this.post))
    }
    this.checkVictory()
  }


  changeMode(mode: any) {
    this.gameMode = mode.tab.textLabel
    this.won = false
    if (mode.tab.textLabel == "The Daily Puzzle") {
      this.answer = getDailyAnswer()
      const now = Date.now()
      const today = Math.floor(now / 86400000) as unknown as string
      if (localStorage.getItem('today') == null) {
        localStorage.clear()
        localStorage.setItem('today', today)
        this.post = []
      } else {
        if (localStorage.getItem("dailyArr") != null && localStorage.getItem("today") != null && (localStorage.getItem('today') as string == today)) {
          this.post = JSON.parse(localStorage.getItem("dailyArr") as string)
          this.hardMode = localStorage.getItem('hardMode') == 'true'
        } else {
          localStorage.clear()
          localStorage.setItem('today', today)
          this.post = []
        }
      }
      this.checkVictory()
    } else if (mode.tab.textLabel == "Free Play") {
      this.answer = this.searchService.dataEntries[Math.floor(Math.random() * this.searchService.dataEntries.length)]
      this.post = []
    }
    this.searchService.searchOption = this.post
    console.log(this.searchService.searchOption)
    this.searchService.allPosts = this.resetPosts
    for (let option of this.post) {
        this.searchService.allPosts = this.searchService.allPosts.filter(function(el) { return el.name != option.name; });
    }
  }

  checkVictory() {
    //We can't use includes because the order attribute gets reset
    for (let item of this.post) {
      if (item.name == this.answer.name) {
        this.won = true
      }
    }
    if (this.won) {
      openEndScreen(true, this.modalService, this.post, this.answer, this.gameMode)
    } else if (this.post.length == 8) {
      openEndScreen(false, this.modalService, this.post, this.answer, this.gameMode)
    }
  }

  goAgain() {
    this.answer = this.searchService.dataEntries[Math.floor(Math.random() * this.searchService.dataEntries.length)]
    this.post = []
    this.searchService.searchOption = this.post
    this.searchService.allPosts = this.resetPosts
    this.won = false
  }

  openInst() {
    openInstructions(this.modalService)
  }

  updateLocalVar() {
    if (this.gameMode == "The Daily Puzzle") {
      localStorage.setItem('hardMode', this.hardMode.toString())
    }
  }
}
