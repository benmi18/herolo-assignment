import * as alertModalActions from '../actions/alert-modal.actions';

export interface State {
  movieIdToDelete: string;
}

export const initialState: State = {
  movieIdToDelete: null
};

// Selectors
export const getmovieIdToDelete = (state: State) => {
  return state.movieIdToDelete;
};
<<<<<<< HEAD
=======
// export const getmovieIdToDelete = (state: State) => state;
>>>>>>> 6eb0e25e0d122bc2cd8b8a70f5a76858e2375be3

export function reducer(
  state = initialState,
  action: alertModalActions.AlertModalActions
): State {
  switch (action.type) {
    case alertModalActions.AlertModalActionTypes.SetMovieIdToDelete:
      return {
        ...state,
        movieIdToDelete: action.payload
      };
    default:
      return state;
  }
}
