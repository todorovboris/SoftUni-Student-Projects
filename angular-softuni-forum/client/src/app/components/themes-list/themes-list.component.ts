import { Component, OnInit } from '@angular/core';
import { ThemesService } from '../../services';

@Component({
  selector: 'app-themes-list',
  imports: [],
  templateUrl: './themes-list.component.html',
  styleUrl: './themes-list.component.css',
})
export class ThemesListComponent {
  constructor(private api: ThemesService) {}

  ngOnInit(): void {
    this.api.getThemes().subscribe((themes) => {
      console.log(themes);
    });
  }
}
