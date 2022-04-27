import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms'
import { SearchService } from '../search.service';
import { Post } from '../post'

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  myControl = new FormControl();
  allPosts: Post[] = [];
  autoCompleteList: any[] = []
  counter = 0

  @ViewChild('autocompleteInput')
  autocompleteInput!: ElementRef;
  @Output() onSelectedOption = new EventEmitter();

  constructor(
    public searchService: SearchService
  ) { }

  ngOnInit() {
    this.searchService.getPosts().subscribe(posts => {
      this.allPosts = posts
      console.log("This has gone")
      console.log(this.allPosts)
    });

    this.myControl.valueChanges.subscribe(userInput => {
      this.autoCompleteExpenseList(userInput);
    })
  }

  private autoCompleteExpenseList(input: any) {
    let categoryList = this.filterCategoryList(input)
    this.autoCompleteList = categoryList;
  }

  filterCategoryList(val: string | null) {
    var categoryList = []
    if (typeof val != "string") {
      return [];
    }
    if (val === '' || val === null) {
      return [];
    }
    return val ? this.allPosts.filter(s => s.name.toLowerCase().indexOf(val.toLowerCase()) != -1)
      : this.allPosts;
  }

  displayFn(post: Post) {
    let k = post ? post.name : post;
    return k;
  }

  filterPostList(event: any) {
    let posts = event.source.value;
    this.counter++
    posts.order = this.counter
      console.log("event")
      console.log(event)
        if(!posts) {
          this.searchService.searchOption=[]
        }
        else {
          this.searchService.searchOption.push(posts);
          this.allPosts = this.allPosts.filter(function(el) { return el.name != posts.name; });
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
