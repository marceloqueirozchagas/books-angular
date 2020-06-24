import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import Year from 'src/app/models/Year.model';
import Book from 'src/app/models/Book.model';

@Component({
  selector: 'app-years',
  templateUrl: './years.component.html',
  styleUrls: ['./years.component.css']
})
export class YearsComponent implements OnInit {

  showLoad : boolean = true;
  years: Year[] = [];

  constructor(private booksService: BooksService) { }

  ngOnInit(): void {
    this.booksService.getBooks().subscribe((books: Book[]) =>{
      this.getYearsDataFromBooks(books);
      this.showLoad = false;
    })
  }

  getYearsDataFromBooks(books: Book[]){
    if (books.length > 0) {
      let distinctYears = Array.from(new Set(books.map(x => x.year)));
      distinctYears.forEach(year => {
        this.years.push(
          {
            year: year,
            show_books: false,
            total_authors: Array.from(new Set(books.filter(x => x.year === year).map(x => { return x.author }))).length,
            total_books: books.filter(x => x.year === year).length,
            total_pages: books.filter(x => x.year === year).map(x => { return x.pages }).reduce((a, c) => { return a + c }),
            books: []
          })
      });
    }
  }

  handleYearClick(year: Year){
    year.show_books = !year.show_books;

    if(year.show_books && year.books.length === 0){
      this.booksService.getBooksByYear(year.year).subscribe(books =>{
        year.books = books;
      })
    }
  }

  handleBookClick(book){
    console.log(book);
  }

}
