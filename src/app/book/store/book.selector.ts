import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Book } from './book';

export const selectBooks = createFeatureSelector<Book[]>('mybooks');

// here we are creating another selector for get data from id
// in this selector we will create using arrow function because this create selector wont accept any input parameters but need to filter data
// here we will pass the bookId
export const selectBookById = (bookId: number) => {
  // this create selector has 2 parameters
  //one is selectBooks : above function
  return createSelector(selectBooks, (books: Book[]) => {
    //here we are filtering the book from current store
    var bookById = books.filter((_) => _.id == bookId);
    if (bookById.length == 0) {
      return null;
    }
    return bookById[0];
  });
};

//use this selector by id in edit component
