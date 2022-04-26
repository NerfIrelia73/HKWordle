import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameMode = 0
  post: Post[] = []
  answer: Post = {name: "", area: "", kills: 0, health: 0, geo: 0}
  constructor(
    private searchService: SearchService
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
    this.post = e
    if (e.includes(this.answer)) {
      console.log("You win!")
    }
  }
}
