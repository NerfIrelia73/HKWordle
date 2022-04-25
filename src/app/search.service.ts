import { Injectable } from '@angular/core';
import { Post } from './post';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import entries from "../assets/entries.json";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchOption: Post[] = []
  dataEntries: Post[] = []

  constructor() {
    this.dataEntries = entries.entries
  }


  getPosts(): Observable<Post[]> {
    console.log(this.dataEntries)
    if (this.dataEntries.length > 0) {}
    return of(this.dataEntries)
  }

  filteredListOptions() {
    console.log("We got here to filter")
    let posts = this.dataEntries;
        let filteredPostsList: Post[] = [];
        for (let post of posts) {
            for (let options of this.searchOption) {
                if (options.name === post.name) {
                  filteredPostsList.push(post);
                }
            }
        }
        console.log(filteredPostsList);
        return filteredPostsList;
  }
}