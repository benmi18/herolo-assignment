import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Movie } from './../../models/movie.model';
import { Modal } from 'src/app/models/modal.model';
import * as fromRoot from '../../store/reducers';
import * as movieActions from 'src/app/store/actions/movie.actions';
import * as ModalActions from '../../store/actions/modal.actions';
import { MovieService } from 'src/app/services/movie.service';
import { ToIntPipe } from '../../pipes/to-int.pipe';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies: Movie[];
  runtimeInt = new ToIntPipe();

  constructor(
    private store: Store<fromRoot.State>,
    private movieService: MovieService
  ) {}

  setModalInfo(title, year, runtime, genre, director, id) {
    runtime = this.runtimeInt.transform(runtime);
    const modalInfo: Modal = {
      modalTitle: 'Edit Movie',
      isNewMovie: false,
      movieId: id,
      movieTitle: title,
      movieYear: year,
      movieRuntime: runtime,
      movieGenre: genre,
      movieDirector: director
    };
    this.store.dispatch(new ModalActions.SetModalInfo(modalInfo));
  }

  deleteMovie(id) {
    this.store.dispatch(new movieActions.RemoveMovie(id));
  }

  ngOnInit() {
    this.movieService.getMovies();
    this.store
      .select(fromRoot.getMovies)
      .subscribe((movies: Movie[]) => (this.movies = movies));
  }
}
