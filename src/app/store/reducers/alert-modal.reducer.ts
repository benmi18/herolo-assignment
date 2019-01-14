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
