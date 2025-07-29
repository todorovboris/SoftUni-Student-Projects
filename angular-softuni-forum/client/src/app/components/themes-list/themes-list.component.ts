import { Component, OnInit } from '@angular/core';
import { ThemesService } from '../../services';
import { Theme } from '../../types';
import { LoaderComponent } from '../shared/loader/loader.component';

@Component({
  selector: 'app-themes-list',
  imports: [LoaderComponent],
  templateUrl: './themes-list.component.html',
  styleUrl: './themes-list.component.css',
})
export class ThemesListComponent implements OnInit {
  themes: Theme[] = [];
  isLoading: boolean = true;

  constructor(private api: ThemesService) {}

  ngOnInit(): void {
    this.api.getThemes().subscribe((themes) => {
      this.themes = themes;
      this.isLoading = false;
    });
  }
}
