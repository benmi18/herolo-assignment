import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { ModalService } from './../../services/modal.service';
import { MovieService } from './../../services/movie.service';
import { Movie } from './../../models/movie.model';
import { Modal } from '../../models/modal.model';
import { ToRuntimeStringPipe } from '../../pipes/to-runtime-string.pipe';
import * as fromRoot from '../../store/reducers';
import * as movieActions from '../../store/actions/movie.actions';
// import * as $ from 'jquery';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  modalInfo: Modal;
  form: FormGroup;
  formSubmited: boolean;

  constructor(
    private store: Store<fromRoot.State>,
    private modalService: ModalService,
    private movieService: MovieService
  ) {
    this.formSubmited = false;
  }

  ngOnInit() {
    // Get modal info from store
    this.store.select(fromRoot.getModalInfo).subscribe(info => {
      this.modalInfo = info;
      this.form = new FormGroup({
        title: new FormControl(info.movieTitle, [
          Validators.required,
          Validators.minLength(2)
        ]),
        year: new FormControl(info.movieYear, [
          Validators.required,
          Validators.min(1900)
        ]),
        runtime: new FormControl(
          this.modalService.runtimeStringToInt(info.movieRuntime),
          [Validators.required, Validators.min(0)]
        ),
        genre: new FormControl(info.movieGenre, Validators.required),
        director: new FormControl(info.movieDirector, Validators.required)
      });
    });
  }

  // Form Getters
  get title() {
    return this.form.get('title');
  }
  get year() {
    return this.form.get('year');
  }
  get runtime() {
    return this.form.get('runtime');
  }
  get genre() {
    return this.form.get('genre');
  }
  get director() {
    return this.form.get('director');
  }

  onSubmit() {
    this.formSubmited = true;
    console.log('Form Submited');
    if (this.form.invalid) {
      return;
    }

    // $('#movieModal').modal('hide');
    if (this.modalInfo.isNewMovie) {
      const formData = this.form.value;
      formData.id = this.movieService.genRandomId();
      this.store.dispatch(new movieActions.AddMovie(formData));
    } else {
      // Dispatch Edit Movie Action
    }
  }

  log(x) {
    console.log(x);
  }
}
