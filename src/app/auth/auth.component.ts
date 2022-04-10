import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BlogService, BlogPost, BlogPostsResponse } from '../blog.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  public form: FormGroup;
  public invalidLogin: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  async onSubmit(form: FormGroup) {
    this.invalidLogin = false;

    if (!this.form.valid) {
      return;
    }

    const { username, password } = form.value;

    const loggedIn = await this.authService.login(username, password);
    if (loggedIn) {
      this.router.navigate(['/']);
    } else {
      this.invalidLogin = true;
    }
  }
}
