import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Book_Detail from 'src/app/models/Book_Detail.model';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.css']
})
export class BookDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Book_Detail) {}

  ngOnInit(): void {
  }

}
