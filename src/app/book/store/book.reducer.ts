import { createReducer, on } from '@ngrx/store';
import { Book } from './book';
import {
  bookFetchAPISuccess,
  deleteBookAPISuccess,
  invokeUpdateBookApi,
  saveBookSuccessData,
  updateBookAPISuccess,
} from './book.action';

// initial array is empty
export const initialState: ReadonlyArray<Book> = [];

//creating reducar
export const bookReducer = createReducer(
  initialState,
  on(bookFetchAPISuccess, (state, { allBooks }) => {
    return allBooks;
  }),
  on(saveBookSuccessData, (state, { response }) => {
    let newState = [...state];
    newState.unshift(response);
    return newState;
  }),
  on(updateBookAPISuccess, (state, { response }) => {
    //here we add a new state without the response
    let newState = state.filter((_) => _.id !== response.id);
    //here we put response to top of the array
    newState.unshift(response);
    return newState;
  }),
  on(deleteBookAPISuccess, (state, { id }) => {
    let newState = state.filter((_) => _.id !== id);
    return newState;
  })
);
