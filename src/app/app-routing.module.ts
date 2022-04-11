import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { BlogResolver } from './blog.resolver';
import { AuthComponent } from './auth/auth.component';
import { NewBlogPostComponent } from './new-blog-post/new-blog-post.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'blog/new',
    component: NewBlogPostComponent,
    canActivate: [AuthGuard],
  },
  { path: 'blog/:slug', component: BlogPageComponent, resolve: [BlogResolver] },
  {
    path: 'blog/:slug/edit',
    component: NewBlogPostComponent,
    resolve: [BlogResolver],
    canActivate: [AuthGuard],
  },
  { path: '', component: HomeComponent, resolve: [BlogResolver] },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
