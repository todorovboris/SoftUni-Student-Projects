import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services';
import { Post } from '../../types';
import { LoaderComponent } from '../shared/loader/loader.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  imports: [LoaderComponent, RouterLink],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css',
})
export class PostsListComponent implements OnInit {
  posts: Post[] = [];
  isLoading: boolean = true;

  constructor(private api: PostsService) {}

  ngOnInit(): void {
    // this.api.getPosts(5).subscribe((posts) => {
    //   this.posts = posts;
    //   this.isLoading = false;
    // });

    this.api.getPosts(5).subscribe({
      next: (posts) => {
        this.posts = posts;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error:', err);
      },
    });
  }
}
