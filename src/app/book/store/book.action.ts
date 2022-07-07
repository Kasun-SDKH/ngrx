import { createAction, props } from '@ngrx/store';
import { Book } from './book';

// "[Source] type of the event"
//create what is the action
export const involeBookAPI = createAction(
  // "[Source] type of the event" here we can use any name
  '[Books API] invoke books Fetch API'
);

export const bookFetchAPISuccess = createAction(
  '[Books API] invoke books fetch success',
  props<{ allBooks: Book[] }>()
);

export const invokeBookSaveAPI = createAction(
  '[Books API] invoke books save',
  props<{ payload: Book }>()
);
export const saveBookSuccessData = createAction(
  '[Books API] sucess books save data',
  props<{ response: Book }>()
);

export const invokeUpdateBookApi = createAction(
  '[Books API] invoke update API',
  props<{ payload: Book }>()
);

export const updateBookAPISuccess = createAction(
  '[Book API] invoke update book API success',
  props<{ response: Book }>()
);

export const invokeDeleteBookApi = createAction(
  '[Books API] invoke delete API',
  props<{ id: number }>()
);

export const deleteBookAPISuccess = createAction(
  '[Book API] invoke delete book API success',
  props<{ id: number }>()
);
