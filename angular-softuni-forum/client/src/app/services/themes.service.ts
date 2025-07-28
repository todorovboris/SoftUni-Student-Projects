import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Theme } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/api/themes';

  getThemes() {
    return this.http.get<Theme[]>(this.apiUrl);
  }
}
