import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../types';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(limit?: number) {
    let apiUrl = 'http://localhost:3000/api/posts';

    if (limit) {
      apiUrl += `?limit=${limit}`;
    }

    return this.http.get<Post[]>(apiUrl);
  }
}
