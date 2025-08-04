import { Component, inject, OnInit } from '@angular/core';
import { AuthService, ThemesService } from '../../services';
import { Theme } from '../../types';
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

  // themes$: Observable<Theme[]>;
  themes: Theme[] = [];

  private authService = inject(AuthService);
  readonly isLoggedIn = this.authService.isLoggedIn;

  constructor(private themeService: ThemesService) {
    // this.themes$ = this.themeService.getThemes();
  }

  ngOnInit(): void {
    this.themeService.getThemes().subscribe((themes) => {
      this.themes = themes;
      this.isLoading = false;
    });
  }
}
