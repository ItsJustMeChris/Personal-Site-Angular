import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';
import { TyperComponent } from './typer/typer.component';
import {
  BlogPageComponent,
  SafeHtmlPipe,
} from './blog-page/blog-page.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { NewBlogPostComponent } from './new-blog-post/new-blog-post.component';
import { QuillModule } from 'ngx-quill';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    BlogCardComponent,
    BlogComponent,
    HomeComponent,
    TyperComponent,
    BlogPageComponent,
    FooterComponent,
    HeaderComponent,
    AuthComponent,
    NewBlogPostComponent,
    SafeHtmlPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    QuillModule.forRoot({
      modules: {},
    }),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
