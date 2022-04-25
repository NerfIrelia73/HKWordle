import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms'
import { Observable } from 'rxjs';
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

  filterPostList(event: { source: { value: any; }; }) {
    var posts= event.source.value;
        if(!posts) {
          this.searchService.searchOption=[]
        }
        else {
          console.log("not")

            this.searchService.searchOption.push(posts);
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
