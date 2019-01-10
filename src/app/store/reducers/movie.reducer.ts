import { Action } from '@ngrx/store';

import * as MovieActions from '../actions/movie.actions';
import { Movie } from '../../models/movie.model';

// State Interface
export interface State {
  movieList: Movie[];
}

// Initial Movie State
export const initialState: State = {
  movieList: []
};

// Reducer
export function reducer(
  state: State = initialState,
  action: MovieActions.MovieActions
): State {
  switch (action.type) {
    default:
      return state;
  }
}
