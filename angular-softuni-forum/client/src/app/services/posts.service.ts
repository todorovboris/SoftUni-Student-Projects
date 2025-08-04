import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private apiUrl = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) {}

  getPosts(limit?: number): Observable<Post[]> {
    if (limit) {
      this.apiUrl += `?limit=${limit}`;
    }

    return this.http.get<Post[]>(this.apiUrl);
  }

  createPost(themeName: string, postText: string): Observable<Post> {
    const body = JSON.stringify({ themeName, postText });
    return this.http.post<Post>(this.apiUrl, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
