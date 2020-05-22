import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';
import { TyperComponent } from './typer/typer.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogCardComponent,
    BlogComponent,
    HomeComponent,
    TyperComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
