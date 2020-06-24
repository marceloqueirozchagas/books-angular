import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import Book from 'src/app/models/Book.model';
import { MatDialog } from '@angular/material/dialog';
import { BookDialogComponent } from 'src/app/components/book-dialog/book-dialog.component';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books : Book[] = [];
  showLoad : boolean = true;

  constructor(
    private booksService: BooksService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.booksService.getBooks().subscribe(books =>{
      this.books = books;
      setTimeout(() => {
        this.showLoad = false
      }, 1000); 
    });    
  }

  handleBookClick(book:Book) {
    if(book.isbn){
      this.booksService.booksDetail(book.isbn).subscribe(bookDetail =>{
        if(bookDetail.title !== ''){
          const dialogRef = this.dialog.open(BookDialogComponent, {
            data: bookDetail
          });
        } 
        else{
          alert('não foi encontrado os detalhes')
        }
      })
    }
    else{
      alert('não foi encontrado os detalhes')
    }
  }
}