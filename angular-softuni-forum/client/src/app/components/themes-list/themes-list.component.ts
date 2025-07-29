import { Component, OnInit } from '@angular/core';
import { ThemesService } from '../../services';
import { Theme } from '../../types';

@Component({
  selector: 'app-themes-list',
  imports: [],
  templateUrl: './themes-list.component.html',
  styleUrl: './themes-list.component.css',
})
export class ThemesListComponent implements OnInit {
  themes: Theme[] = [];

  constructor(private api: ThemesService) {}

  ngOnInit(): void {
    this.api.getThemes().subscribe((themes) => {
      this.themes = themes;
    });
  }
}
