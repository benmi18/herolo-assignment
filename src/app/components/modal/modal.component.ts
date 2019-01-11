import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { MovieService } from './../../services/movie.service';
import { Movie } from './../../models/movie.model';
import { Modal } from '../../models/modal.model';
import { ToRuntimeStringPipe } from '../../pipes/to-runtime-string.pipe';
import * as fromRoot from '../../store/reducers';
import * as movieActions from '../../store/actions/movie.actions';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  modalInfo: Modal;

  constructor(
    private store: Store<fromRoot.State>,
    private movieService: MovieService
  ) // private toRuntimeString: ToRuntimeStringPipe
  {}

  ngOnInit() {
    this.store
      .select(fromRoot.getModalInfo)
      .subscribe(info => (this.modalInfo = info));
  }

  handleSave(title, year, runtime, genre, director) {
    // runtime = this.toRuntimeString.transform(runtime);
    const movie: Movie = {
      id: this.movieService.genRandomId(),
      title,
      year,
      runtime,
      genre,
      director
    };
    if (this.modalInfo.isNewMovie) {
      this.store.dispatch(new movieActions.AddMovie(movie));
    }
  }
}
