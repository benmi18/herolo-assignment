import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Modal } from '../../models/modal.model';
import * as fromRoot from '../../store/reducers';
import * as ModalActions from '../../store/actions/modal.actions';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {
  modalInfo: Modal;

  constructor(private store: Store<fromRoot.State>) {
    this.modalInfo = {
      modalTitle: 'Add New Movie',
      isNewMovie: true,
      movieDirector: null,
      movieGenre: null,
      movieRuntime: null,
      movieTitle: null,
      movieYear: null
    };
  }

  setModalInfo() {
    this.store.dispatch(new ModalActions.SetModalInfo(this.modalInfo));
  }

  ngOnInit() {}
}
