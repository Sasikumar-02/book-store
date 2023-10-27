import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  Books: any = [];
  searchText: string = '';

  constructor(private crudApi: CrudService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.crudApi.getBooks().subscribe((res) => {
      console.log(res);
      this.Books = res;
    });
  }

  delete(id: any, i: any) {
    console.log(id);
    if (window.confirm("Are you sure you want to delete")) {
      this.crudApi.deleteBook(id).subscribe(() => {
        this.Books.splice(i, 1);
      });
    }
  }

  searchBooks() {
    if (this.searchText) {
      this.crudApi.searchBooks(this.searchText).subscribe((res) => {
        console.log(res);
        this.Books = res;
      });
    } else {
      // If search input is empty, load all books
      this.loadBooks();
    }
  }
}
