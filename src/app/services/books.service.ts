import { Injectable } from '@angular/core';
import Book from '../models/Book.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import Book_Detail from '../models/Book_Detail.model';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private _booksCollection = new BehaviorSubject<Book[]>([]);

  get booksCollection() {
    return this._booksCollection.asObservable();
  }

  constructor(private http: HttpClient, private utilService: UtilService ) { }

  loadBooksFromFirebase(){
    this.http.get<{ [key: string]: any }>('https://app-livros.firebaseio.com/livros.json')
    .subscribe((resData) => {
      let books: Book[] = [];
      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
          books.push(
            {
              //key,
              year:  resData[key].ano,
              title: resData[key].titulo,
              author: resData[key].autor,
              pages:  resData[key].paginas,
              isbn: resData[key].isbn
            }
          );
        }
      }
      
      this._booksCollection.next(books);
    }, error => {
      this.utilService.showMessage(error.message, false)
    })
  }

  getBooks(){
    return this.booksCollection;
  }

  getBooksByAuthor(authorName: string){
    return this.booksCollection
      .pipe(take(1),
        map((books: Book[]) => {          
          return books.filter(x => x.author === authorName);
        })
      );
  }

  getBooksByYear(year: number){
    return this.booksCollection
      .pipe(take(1),
        map((books: Book[]) => {          
          return books.filter(x => x.year === year);
        })
      );
  }

  booksDetail(isbn: string) {
    let bookDetail : Book_Detail = {
      title: '',
      publishedDate: new Date(),
      publisher: '',
      description: '',
      imageLinks: ''
    };

    return this.http.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
      .pipe(take(1),
        map((respData: any) => {
          if (respData.totalItems > 0) {
            const book = respData.items[0].volumeInfo;
            
              bookDetail.title = book.title,
              bookDetail.publishedDate= book.publishedDate,
              bookDetail.publisher = book.publisher,
              bookDetail.description= book.description,
              bookDetail.imageLinks = book.imageLinks ? book.imageLinks.thumbnail : ""
          }
          
          return bookDetail;
        })
      );
  }
}