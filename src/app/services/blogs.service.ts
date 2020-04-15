import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  bookmarkedBlogs : Array<any> =[];
  likedBlogs : Array<any> =[];
  constructor() { }
}
