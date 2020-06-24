import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import Author from 'src/app/models/Author.model';
import Book from 'src/app/models/Book.model';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  showLoad : boolean = true;
  authors: Author[] = [];

  constructor(private booksService: BooksService) { }

  ngOnInit(): void {
    this.booksService.getBooks().subscribe((books: Book[]) =>{
      this.getAuthorsDataFromBooks(books);
      this.showLoad = false;
    })
  }

  getAuthorsDataFromBooks(books: Book[]){
    if (books.length > 0) {
      let distinctAuthors = Array.from(new Set(books.map(x => x.author)));
      distinctAuthors.forEach(author => {
        this.authors.push(
          {
            name: author,
            show_books: false,
            total_books: books.filter(x => x.author === author).length,
            total_pages: books.filter(x => x.author === author).map(x => { return x.pages }).reduce((a, c) => { return a + c }),
            books: []
          })
      });
    }
  }
  
  handleAuthorClick(author: Author){
    author.show_books = !author.show_books;

    if(author.show_books && author.books.length === 0){
      this.booksService.getBooksByAuthor(author.name).subscribe(books =>{
        author.books = books;
      })
    }
  }

  handleBookClick(book){
    console.log(book);
  }

}
