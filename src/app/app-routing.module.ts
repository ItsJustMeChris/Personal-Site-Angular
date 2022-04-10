import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { BlogResolver } from './blog.resolver';
import { AuthComponent } from './auth/auth.component';
import { NewBlogPostComponent } from './new-blog-post/new-blog-post.component';

const routes: Routes = [
  { path: 'blog/new', component: NewBlogPostComponent },
  { path: 'blog/:slug', component: BlogPageComponent, resolve: [BlogResolver] },
  { path: '', component: HomeComponent, resolve: [BlogResolver] },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
