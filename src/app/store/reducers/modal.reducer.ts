import * as ModalActions from '../actions/modal.actions';

import { Modal } from 'src/app/models/modal.model';

// Modal Interface
export interface State {
  modalInfo: Modal;
}

// Initial Modal State
export const initialState: State = {
  modalInfo: {
    modalTitle: null,
    movieDirector: null,
    movieGenre: null,
    movieRuntime: null,
    movieTitle: null,
    movieYear: null
  }
};

// Selectors
export const getModalInfo = (state: State) => state.modalInfo;

export function reducer(
  state = initialState,
  action: ModalActions.ModalActions
): State {
  switch (action.type) {
    case ModalActions.ModalActionTypes.SetModalInfo:
      return {
        ...state,
        modalInfo: action.payload
      };
    default:
      return state;
  }
}
