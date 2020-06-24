import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import Books_Info from 'src/app/models/Books_Info.model';
import Book from 'src/app/models/Book.model';

import { ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showLoad : boolean = true;
  booksInfo: Books_Info = {
    authors: 0,
    books: 0,
    pages: 0
  }

  constructor(private booksServices: BooksService) { }

  ngOnInit(): void {
    this.typeWriter(document.querySelector('mat-card-subtitle'));
    this.booksServices.booksCollection.subscribe((books: Book[]) => {
      this.getBooksInfo(books);
      this.getBarChartData(books);
      this.showLoad = false;
    })    
  }

  getBooksInfo(books: Book[]){              
    if (books.length > 0) {
      this.booksInfo.books = books.length;
      this.booksInfo.authors = Array.from(new Set(books.map(x => { return x.author }))).length;
      this.booksInfo.pages = books.map(x => { return x.pages }).reduce((accumulator, currentValue) => { return accumulator + currentValue });
    }
  }

  typeWriter(element : HTMLElement ){
    const textToArray = element.innerHTML.split('');
    element.innerHTML = '';

    textToArray.forEach((letter: string, index: number) =>{
      setTimeout(() =>{
        element.innerHTML += letter;
      }, 75 * index);      
    });
  }

  
  getBarChartData(books: Book[]){
    this.years = Array.from(new Set(books.map(x => x.year.toString())))

    let total_books = []
    this.years.forEach(year => {
      total_books.push(books.filter(x => x.year === Number(year)).length)
    });
    this.barChartData[0].data = total_books;
  }

  years: string[] = [];
  barChartData: ChartDataSets[] = [
    { 
      data: [], 
      label: 'Livros' }
  ];
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(192,192,192,1)',
    },
  ];
}
