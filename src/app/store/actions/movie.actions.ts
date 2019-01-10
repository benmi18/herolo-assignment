import { Action } from '@ngrx/store';

import { Movie } from '../../models/movie.model';

export enum MovieActionTypes {
  LoadMovies = '[Movie] Load Movies',
  AddMovie = '[Movie] Add Movie'
}

export class LoadMovies implements Action {
  readonly type = MovieActionTypes.LoadMovies;
}

export class AddMovie implements Action {
  readonly type = MovieActionTypes.AddMovie;
  constructor(public payload: Movie) {}
}

export type MovieActions = LoadMovies | AddMovie;
