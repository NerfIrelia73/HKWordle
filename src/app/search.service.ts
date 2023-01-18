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


  async getPosts(): Promise<Observable<Post[]>> {
    // await this.afs.collection('images').get().toPromise().then(resp => {
    //   console.log("We are in the then thing")
    //   //console.log(resp.docs)
    //   for (const item of resp.docs) {
    //     const data = item.data() as any
    //     const index = this.dataEntries.findIndex(obj => obj.name == data.name)
    //     this.dataEntries[index].url = data.url
    //   }
    // })
    // for (const item of this.dataEntries) {
    //   const index = this.dataEntries.findIndex((obj) => obj.name == item.name)
    //   this.dataEntries[index].url = `https://HuntersJournlePullZone.b-cdn.net/icons/${item.name}.webp`
    // }
    // console.log(JSON.stringify(this.dataEntries))
    return of(this.dataEntries)
  }
}