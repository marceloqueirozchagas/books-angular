import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { BooksComponent } from './views/books/books.component';
import { AuthorsComponent } from './views/authors/authors.component';
import { YearsComponent } from './views/years/years.component';


const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "books",
    component: BooksComponent
  },
  {
    path: "authors",
    component: AuthorsComponent
  },
  {
    path: "years",
    component: YearsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
