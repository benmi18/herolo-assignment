import * as movieActions from '../actions/movie.actions';
import { Movie } from '../../models/movie.model';

// State Interface
export interface State {
  movieList: Movie[];
}

// Initial Movie State
export const initialState: State = {
  movieList: []
};

// Selectors
export const getMovies = (state: State) => state.movieList;

// Reducer
export function reducer(
  state: State = initialState,
  action: movieActions.MovieActions
): State {
  switch (action.type) {
    case movieActions.MovieActionTypes.AddMovie:
      return {
        ...state,
        movieList: [...state.movieList, action.payload]
      };
    case movieActions.MovieActionTypes.EditMovie:
      const newMovieList = [...state.movieList];
      for (let i = 0; i < newMovieList.length; i++) {
        if (newMovieList[i].id === action.payload.id) {
          newMovieList[i] = action.payload.movie;
          break;
        }
      }
      return {
        ...state,
        movieList: newMovieList
      };

    case movieActions.MovieActionTypes.RemoveMovie:
      const movieArr = [...state.movieList];
      movieArr.forEach((movie: Movie, index: number) => {
        if (movie.id === action.payload) {
          movieArr.splice(index, 1);
        }
      });
      return {
        ...state,
        movieList: movieArr
      };
    default:
      return state;
  }
}
