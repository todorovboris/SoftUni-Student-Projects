import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services';
import { Post } from '../../types';
import { LoaderComponent } from '../shared/loader/loader.component';

@Component({
  selector: 'app-posts-list',
  imports: [LoaderComponent],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css',
})
export class PostsListComponent implements OnInit {
  posts: Post[] = [];
  isLoading: boolean = true;

  constructor(private api: PostsService) {}

  ngOnInit(): void {
    this.api.getPosts(5).subscribe((posts) => {
      this.posts = posts;
      this.isLoading = false;
    });
  }
}
