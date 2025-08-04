import { Component, inject, OnInit } from '@angular/core';
import { AuthService, PostsService, ThemesService } from '../../services';
import { Post, Theme } from '../../types';
import { LoaderComponent } from '../shared/loader/loader.component';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { PostsListComponent } from '../posts-list/posts-list.component';

@Component({
  selector: 'app-themes-list',
  imports: [LoaderComponent, RouterLink, PostsListComponent],
  templateUrl: './themes-list.component.html',
  styleUrl: './themes-list.component.css',
})
export class ThemesListComponent implements OnInit {
  isLoading: boolean = true;

  posts$: Observable<Post[]>;
  themes$: Observable<Theme[]>;
  themes: Theme[] = [];

  private authService = inject(AuthService);
  readonly isLoggedIn = this.authService.isLoggedIn;

  constructor(
    private themeService: ThemesService,
    private postService: PostsService
  ) {
    this.themes$ = this.themeService.getThemes();
    this.posts$ = this.postService.getPosts();
  }

  ngOnInit(): void {
    this.themeService.getThemes().subscribe((themes) => {
      this.themes = themes;
      this.isLoading = false;
    });
  }
}
