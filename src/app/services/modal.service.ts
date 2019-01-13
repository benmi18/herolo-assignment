import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Modal } from '../models/modal.model';
import * as fromRoot from '../store/reducers';
import * as ModalActions from '../store/actions/modal.actions';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private store: Store<fromRoot.State>) {}

  resetModalInfo(modalTitle?: string, isNewMovie?: boolean) {
    const modalInfo: Modal = {
      modalTitle,
      isNewMovie,
      movieDirector: null,
      movieGenre: null,
      movieRuntime: null,
      movieTitle: null,
      movieYear: null
    };
    this.store.dispatch(new ModalActions.SetModalInfo(modalInfo));
  }
}
