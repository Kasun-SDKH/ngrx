import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './store/book';
@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  public get() {
    return this.http.get<Book[]>('http://localhost:3000/books');
  }

  public create(payload: Book) {
    return this.http.post<Book>('http://localhost:3000/books', payload);
  }
  public update(payload: Book) {
    return this.http.put<Book>(
      `http://localhost:3000/books/${payload.id}`,
      payload
    );
  }

  public delete(id: number) {
    return this.http.delete(`http://localhost:3000/books/${id}`);
  }
}
