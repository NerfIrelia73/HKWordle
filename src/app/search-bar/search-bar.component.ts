import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms'
import { SearchService } from '../search.service';
import { Post } from '../post'

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  myControl = new FormControl()
  dailyPosts: Post[] = []
  autoCompleteList: any[] = []
  counter = 0

  @ViewChild('autocompleteInput')
  autocompleteInput!: ElementRef;
  @Output() onSelectedOption = new EventEmitter();
  @Input() public wonGame: any
  @Input() public listLength: any
  @Input() public hardMode: any

  constructor(
    public searchService: SearchService
  ) { }

  ngOnInit() {
    this.searchService.getPosts().subscribe(posts => {
      this.searchService.allPosts = posts
      console.log(posts)
      console.log(this.searchService.searchOption)
    });

    this.myControl.valueChanges.subscribe(userInput => {
      this.autoCompleteExpenseList(userInput);
    })

    if (localStorage.getItem("dailyArr") != null) {
      this.dailyPosts = JSON.parse(localStorage.getItem("dailyArr") as string)
      this.searchService.searchOption = this.dailyPosts
      this.counter = this.dailyPosts.length
      for (let option of this.dailyPosts) {
        this.searchService.allPosts = this.searchService.allPosts.filter(function(el) { return el.name != option.name; });
      }
    }
    console.log(this.searchService.searchOption)
  }

  private autoCompleteExpenseList(input: any) {
    let categoryList = this.filterCategoryList(input)
    this.autoCompleteList = categoryList;
  }

  filterCategoryList(val: string | null) {
    if (typeof val != "string") {
      return [];
    }
    if (val === '' || val === null) {
      return [];
    }
    return val ? this.searchService.allPosts.filter((s) => {
      let check = false
      for (const alias of s.alias) {
        if (alias.toLowerCase().indexOf(val.toLowerCase()) != -1) {
          check = true
        }
      }
      if (s.name.toLowerCase().indexOf(val.toLowerCase()) != -1) {
        check = true
      }
      return check
    })
    : this.searchService.allPosts;
  }

  displayFn(post: Post) {
    let k = post ? post.name : post;
    return k;
  }

  filterPostList(event: any) {
    console.log("filter post")
    console.log(event.source.value)
    let posts = event.source.value;
    this.counter++
    posts.order = this.counter
    if(!posts) {
      this.searchService.searchOption=[]
    }
    else {
      this.searchService.searchOption.push(posts);
      this.searchService.allPosts = this.searchService.allPosts.filter(function(el) { return el.name != posts.name; });
      this.onSelectedOption.emit(this.searchService.searchOption)
    }
    this.focusOnPlaceInput();
  }


  removeOption(option: any) {
    let index = this.searchService.searchOption.indexOf(option);
    if (index >= 0)
        this.searchService.searchOption.splice(index, 1);
        this.focusOnPlaceInput();

        this.onSelectedOption.emit(this.searchService.searchOption)
}

focusOnPlaceInput() {
  this.autocompleteInput.nativeElement.focus();
  this.autocompleteInput.nativeElement.value = '';
}

}
