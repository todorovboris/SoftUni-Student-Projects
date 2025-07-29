import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services';
import { Post } from '../../types';

@Component({
  selector: 'app-posts-list',
  imports: [],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css',
})
export class PostsListComponent implements OnInit {
  posts: Post[] = [];

  constructor(private api: PostsService) {}

  ngOnInit(): void {
    this.api.getPosts(5).subscribe((posts) => {
      this.posts = posts;
    });
  }
}
