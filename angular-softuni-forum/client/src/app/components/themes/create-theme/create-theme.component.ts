import { Component, inject } from '@angular/core';
import { AuthService, PostsService } from '../../../services';
import { Router } from '@angular/router';
import { Post } from '../../../types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-theme',
  imports: [FormsModule],
  templateUrl: './create-theme.component.html',
  styleUrl: './create-theme.component.css',
})
export class CreateThemeComponent {
  private authService = inject(AuthService);
  private postService = inject(PostsService);
  private router = inject(Router);

  themeName: string = '';
  postText: string = '';

  themeNameError: boolean = false;
  postTextError: boolean = false;

  themeNameErrorMessage: string = '';
  postTextErrorMessage: string = '';

  validateThemeName(): void {
    if (!this.themeName) {
      this.themeNameError = true;
      this.themeNameErrorMessage = 'Theme name is required!';
    } else if (this.themeName.length < 5) {
      this.themeNameError = true;
      this.themeNameErrorMessage = 'Theme name must be at least 5 characters!';
    } else {
      this.themeNameError = false;
      this.themeNameErrorMessage = '';
    }
  }

  validatePostText(): void {
    if (!this.postText) {
      this.postTextError = true;
      this.postTextErrorMessage = 'Post is required!';
    } else if (this.postText.length < 10) {
      this.postTextError = true;
      this.postTextErrorMessage = 'Post must be at least 10 characters!';
    } else {
      this.postTextError = false;
      this.postTextErrorMessage = '';
    }
  }

  isFormValid(): boolean {
    return (
      Boolean(this.themeName) &&
      Boolean(this.postText) &&
      !this.themeNameError &&
      !this.postTextError
    );
  }

  onCancel(): void {
    this.router.navigate(['/home']);
  }

  onSubmit(): void {
    this.validateThemeName();
    this.validatePostText();

    if (this.isFormValid()) {
      const newTheme = {
        themeName: this.themeName,
        postText: this.postText,
        userId: this.authService.getCurrentUserId(),
      };

      console.log(newTheme);

      setTimeout(() => {
        this.router.navigate(['/themes']);
      }, 5000);

      //! Maybe for next workshops
      // const response = this.postService.createPost(
      //   this.themeName,
      //   this.postText
      // );

      // response.subscribe((post: Post) => {
      //   if (post) {
      //     this.router.navigate(['/themes']);
      //   }
      // });
    }
  }
}
