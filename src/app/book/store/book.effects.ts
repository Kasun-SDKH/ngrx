import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, switchMap, withLatestFrom } from 'rxjs';
import { setApiStatus } from 'src/app/shared/store/app.action';
import { AppState } from 'src/app/shared/store/app.state';
import { BookService } from '../book.service';
import {
  bookFetchAPISuccess,
  deleteBookAPISuccess,
  invokeBookSaveAPI,
  invokeDeleteBookApi,
  invokeUpdateBookApi,
  involeBookAPI,
  saveBookSuccessData,
  updateBookAPISuccess,
} from './book.action';
import { selectBooks } from './book.selector';

@Injectable()
export class BookEffects {
  constructor(
    private actions$: Actions,
    private bookService: BookService,
    private appStore: Store<AppState>,
    private store: Store
  ) {}

  // crate a effect
  loadAllBooks$ = createEffect(() =>
    this.actions$.pipe(
      // action name should match
      ofType(involeBookAPI),
      //check data stored in store or not
      withLatestFrom(this.store.pipe(select(selectBooks))),
      switchMap(([, booksFromStore]) => {
        //if we have records in store we are returning empty here
        if (booksFromStore.length > 0) {
          return EMPTY;
        }
        return this.bookService
          .get()
          .pipe(map((data) => bookFetchAPISuccess({ allBooks: data })));
      })
    )
  );

  saveBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeBookSaveAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setApiStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '' } })
        );
        return this.bookService.create(action.payload).pipe(
          map((data) => {
            this.appStore.dispatch(
              setApiStatus({
                apiStatus: { apiStatus: 'success', apiResponseMessage: '' },
              })
            );
            return saveBookSuccessData({ response: data });
          })
        );
      })
    )
  );

  updateBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeUpdateBookApi),
      switchMap((action) => {
        this.appStore.dispatch(
          setApiStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '' } })
        );
        return this.bookService.update(action.payload).pipe(
          map((data) => {
            this.appStore.dispatch(
              setApiStatus({
                apiStatus: { apiStatus: 'success', apiResponseMessage: '' },
              })
            );
            return updateBookAPISuccess({ response: data });
          })
        );
      })
    )
  );

  deleteBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeDeleteBookApi),
      switchMap((action) => {
        this.appStore.dispatch(
          setApiStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '' } })
        );
        return this.bookService.delete(action.id).pipe(
          map((data) => {
            this.appStore.dispatch(
              setApiStatus({
                apiStatus: { apiStatus: 'success', apiResponseMessage: '' },
              })
            );
            return deleteBookAPISuccess({ id: action.id });
          })
        );
      })
    )
  );
}
