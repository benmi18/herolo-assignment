import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { ModalService } from './../../services/modal.service';
import { MovieService } from './../../services/movie.service';
import { ToRuntimeStringPipe } from '../../pipes/to-runtime-string.pipe';
import { ToIntPipe } from '../../pipes/to-int.pipe';
import { TitleStringifyPipe } from '../../pipes/title-stringify.pipe';
import { Movie } from './../../models/movie.model';
import { Modal } from '../../models/modal.model';
import * as fromRoot from '../../store/reducers';
import * as movieActions from '../../store/actions/movie.actions';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  modalInfo: Modal;
  form: FormGroup;
  formSubmited: boolean;
  titles: string[];
  runtimeString = new ToRuntimeStringPipe();
  runtimeInt = new ToIntPipe();
  removeSpecialCharacters = new TitleStringifyPipe();

  constructor(
    private store: Store<fromRoot.State>,
    private modalService: ModalService,
    private movieService: MovieService
  ) {
    this.formSubmited = false;
    this.titles = [];
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
        runtime: new FormControl(info.movieRuntime, [
          Validators.required,
          Validators.min(0)
        ]),
        genre: new FormControl(info.movieGenre, Validators.required),
        director: new FormControl(info.movieDirector, Validators.required)
      });
    });

    this.store.select(fromRoot.getMovies).subscribe((movies: Movie[]) => {
      movies.forEach(movie => {
        this.titles.push(movie.title);
      });
    });
  }

  // Form Getters
  get formControls() {
    return this.form.controls;
  }
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

    if (this.modalInfo.isNewMovie) {
      // const cleanTitle = this.removeSpecialCharacters.transform(
      //   this.title.value
      // );
      const cleanTitle = this.title.value;
      const formData = this.form.value;
      formData.title = cleanTitle;
      this.titles.forEach(title => {
        if (title.toLocaleLowerCase() === cleanTitle.toLocaleLowerCase()) {
          console.log('title error');
          this.title.setErrors({ title: true });
        }
      });
      if (!this.title.errors) {
        formData.id = this.movieService.genRandomId();
        this.store.dispatch(new movieActions.AddMovie(formData));
        this.closeModal();
      }
    } else {
      const updatedMovie: Movie = {
        id: this.modalInfo.movieId,
        title: this.title.value,
        year: this.year.value,
        runtime: this.runtime.value,
        genre: this.genre.value,
        director: this.director.value
      };
      this.store.dispatch(
        new movieActions.EditMovie({
          id: this.modalInfo.movieId,
          movie: updatedMovie
        })
      );
      this.closeModal();
    }
  }

  closeModal() {
    this.formSubmited = false;
    document.getElementById('close-modal').click();
    this.modalService.resetModalInfo();
  }
}
