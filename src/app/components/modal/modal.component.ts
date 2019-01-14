import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { ModalService } from './../../services/modal.service';
import { MovieService } from './../../services/movie.service';
import { ToRuntimeStringPipe } from '../../pipes/to-runtime-string.pipe';
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
  moviesTitleAndId: { id: string; title: string }[];
  private runtimeString = new ToRuntimeStringPipe();
<<<<<<< HEAD
=======
  private runtimeInt = new ToIntPipe();
>>>>>>> 6eb0e25e0d122bc2cd8b8a70f5a76858e2375be3
  private removeSpecialChars = new TitleStringifyPipe();

  constructor(
    private store: Store<fromRoot.State>,
    private modalService: ModalService,
    private movieService: MovieService
  ) {
    this.formSubmited = false;
    this.moviesTitleAndId = [];
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
        this.moviesTitleAndId.push({ id: movie.id, title: movie.title });
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
      const runtimeString = this.runtimeString.transform(this.runtime.value);
      const formData = this.form.value;
      formData.title = cleanTitle;
      formData.runtime = runtimeString;
<<<<<<< HEAD
      this.checkTitleExists(cleanTitle, this.modalInfo.isNewMovie);
=======
      this.checkTitleExists(cleanTitle, true);
>>>>>>> 6eb0e25e0d122bc2cd8b8a70f5a76858e2375be3
      if (!this.title.errors) {
        // If no title error, Dispatch new movie action
        formData.id = this.movieService.genRandomId();
        this.store.dispatch(new movieActions.AddMovie(formData));
        this.closeModal();
      }
    } else {
      // EDIT MOVIE
      // Check if title exits
<<<<<<< HEAD
      this.checkTitleExists(
        this.title.value,
        this.modalInfo.isNewMovie,
        this.modalInfo.movieId
      );
=======
      this.checkTitleExists(this.title.value, false, this.modalInfo.movieId);
>>>>>>> 6eb0e25e0d122bc2cd8b8a70f5a76858e2375be3
      if (!this.title.errors) {
        const runtimeString = this.runtimeString.transform(this.runtime.value);
        const updatedMovie: Movie = {
          id: this.modalInfo.movieId,
          title: this.title.value,
          year: this.year.value,
          runtime: runtimeString,
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
  }

  checkTitleExists(title: string, isNewMovie: boolean, id?: string) {
    for (let i = 0; i < this.moviesTitleAndId.length; i++) {
      if (
        this.moviesTitleAndId[i].title.toLocaleLowerCase() ===
        title.toLocaleLowerCase()
      ) {
        if (isNewMovie) {
          this.title.setErrors({ title: true });
<<<<<<< HEAD
          break;
        }

        if (this.moviesTitleAndId[i].id !== id) {
          this.title.setErrors({ title: true });
=======
          return;
        }

        if (this.moviesTitleAndId[i].id !== id) {
          console.log(this.moviesTitleAndId[i].id, id);
          this.title.setErrors({ title: true });
          console.log(this.title);
>>>>>>> 6eb0e25e0d122bc2cd8b8a70f5a76858e2375be3
          break;
        }
      }
    }
  }

  closeModal() {
    this.formSubmited = false;
    document.getElementById('close-modal').click();
    this.modalService.resetModalInfo();
  }
}
