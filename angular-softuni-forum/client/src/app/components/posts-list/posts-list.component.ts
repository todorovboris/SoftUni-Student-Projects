import { Component } from '@angular/core';
import { PostsService } from '../../services';

@Component({
  selector: 'app-posts-list',
  imports: [],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css',
})
export class PostsListComponent {
  constructor(private api: PostsService) {
    this.api.getPosts().subscribe((posts) => {
      console.log(posts);
    });
  }
}
