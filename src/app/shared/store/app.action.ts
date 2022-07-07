import { createAction, props } from '@ngrx/store';
import { AppState } from './app.state';

export const setApiStatus = createAction(
  '[API Status] get API success Status',
  props<{ apiStatus: AppState }>()
);
