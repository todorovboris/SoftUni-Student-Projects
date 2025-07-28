import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(limit?: number): Observable<Post[]> {
    let apiUrl = 'http://localhost:3000/api/posts';

    if (limit) {
      apiUrl += `?limit=${limit}`;
    }

    return this.http.get<Post[]>(apiUrl);
  }
}
