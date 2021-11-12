import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  books: Book[] = [];

  constructor(
    private httpClient: HttpClient
  ) {
    this.load();
  }

  load(): void {
    this.httpClient.get<Book[]>('books')
      .subscribe(response => {
        this.books.splice(0);
        this.books.push(...response)
      })
  }

  getOne(id: number | null): Book | undefined {
    if(id === null) {
      return undefined;
    }

    return this.books.find(book => book.id === id)
  }

  create(book: Book): void {
    this.httpClient.post<Book>('books', book)
      .subscribe(_ => this.load())
  }

  update(book: Book): void {
    this.httpClient.put<Book>(`books/${book.id}`, book)
      .subscribe(_ => this.load())
  }

  delete(bookId: string): void {
    this.httpClient.delete(`books/${bookId}`)
      .subscribe(_ => this.load())
  }
}
