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
  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.searchService.getPosts().subscribe((posts: Post[]) => {
      this.post = posts
      this.searchService.dataEntries = posts
    });
  }

  onSelectedOption(e: any) {
    this.getFilteredExpenseList();
  }

  getFilteredExpenseList() {
    if (this.searchService.searchOption.length > 0)
      this.post = this.searchService.filteredListOptions();
    else {
      this.post = this.searchService.dataEntries;
    }

    console.log(this.post)
  }
}
