import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as Movie from '../reducers/movie.reducer';
import * as Modal from '../reducers/modal.reducer';

export interface State {
  movie: Movie.State;
  modal: Modal.State;
}

export const reducers: ActionReducerMap<State> = {
  movie: Movie.reducer,
  modal: Modal.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

// Movie Selectors
export const selectMovieState = createFeatureSelector<Movie.State>('movie');

// Modal Selectors
export const selectModalState = createFeatureSelector<Modal.State>('modal');
export const getModalInfo = createSelector(
  selectModalState,
  Modal.getModalInfo
);
