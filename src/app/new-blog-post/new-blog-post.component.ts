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
import Quill from 'quill';
import { UploadService } from '../uploads.service';

@Component({
  selector: 'app-new-blog-post',
  templateUrl: './new-blog-post.component.html',
  styleUrls: ['./new-blog-post.component.css'],
})
export class NewBlogPostComponent {
  public form: FormGroup;

  constructor(
    private blogService: BlogService,
    private formBuilder: FormBuilder,
    private uploadService: UploadService,
    private router: Router
  ) {
    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      content: new FormControl('', Validators.required),
    });
  }

  async uploadFile(e: Event) {
    const targ = e.target as HTMLInputElement;
    const file = targ.files[0];
    const fileURL = await this.uploadService.upload(file, file.name);
  }

  async onSubmit(form: FormGroup) {
    console.log(form.get('title').errors);
    if (!this.form.valid) {
      return;
    }

    const { title, content } = form.value;

    const post = await this.blogService.createBlogPost(title, content);
  }
}
