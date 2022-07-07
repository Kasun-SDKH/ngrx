import { createReducer, on } from '@ngrx/store';
import { setApiStatus } from './app.action';
import { AppState } from './app.state';

export const initialState: AppState = {
  apiResponseMessage: '',
  apiStatus: '',
};

export const appReducer = createReducer(
  initialState,
  on(setApiStatus, (state, { apiStatus }) => {
    return apiStatus;
  })
);
