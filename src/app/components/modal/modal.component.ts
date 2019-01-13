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
  // private runtimeString = new ToRuntimeStringPipe();
  // private runtimeInt = new ToIntPipe();
  private removeSpecialChars = new TitleStringifyPipe();

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
        // Form Group And Controls
        title: new FormControl(info.movieTitle, [
          Validators.required,
          Validators.minLength(2)
        ]),
        year: new FormControl(info.movieYear, [
          Validators.required,
          Validators.min(1900),
          Validators.max(2025)
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
    if (this.form.invalid) {
      return;
    }

    if (this.modalInfo.isNewMovie) {
      // ADD NEW MOVIE
      const cleanTitle = this.removeSpecialChars.transform(this.title.value);
      const formData = this.form.value;
      formData.title = cleanTitle;
      this.titles.forEach(title => {
        // Check if title exits
        if (title.toLocaleLowerCase() === cleanTitle.toLocaleLowerCase()) {
          this.title.setErrors({ title: true }); // Set Title error
        }
      });
      if (!this.title.errors) {
        // If no title error, Dispatch new movie action
        formData.id = this.movieService.genRandomId();
        this.store.dispatch(new movieActions.AddMovie(formData));
        this.closeModal();
      }
    } else {
      // EDIT MOVIE
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
    console.log(this.form);
    this.formSubmited = false;
    document.getElementById('close-modal').click();
    this.modalService.resetModalInfo();
  }
}
