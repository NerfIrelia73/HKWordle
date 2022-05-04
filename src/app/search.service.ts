import { Injectable } from '@angular/core';
import { Post } from './post';
import { Observable, of } from 'rxjs';
import entries from "../assets/entries.json";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchOption: Post[] = []
  dataEntries: Post[] = []
  allPosts: Post[] = []

  constructor() {
    this.dataEntries = entries.entries
  }


  getPosts(): Observable<Post[]> {
    if (this.dataEntries.length > 0) {}
    return of(this.dataEntries)
  }
}