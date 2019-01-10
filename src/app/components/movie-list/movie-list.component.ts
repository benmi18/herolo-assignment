import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Movie } from './../../models/movie.model';
import { Modal } from 'src/app/models/modal.model';
import * as fromRoot from '../../store/reducers';
import * as MovieActions from 'src/app/store/actions/movie.actions';
import * as ModalActions from '../../store/actions/modal.actions';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies = [
    {
      id: '1',
      title: 'movie title',
      year: '2008',
      runtime: '120 min',
      jenre: 'Crime, Drama',
      director: 'movie director'
    },
    {
      id: '2',
      title: 'another movie title',
      year: '2018',
      runtime: '140 min',
      jenre: 'Crime, Drama',
      director: 'movie director'
    },
    {
      id: '2',
      title: 'another movie title',
      year: '2018',
      runtime: '144 min',
      jenre: 'Crime, Drama',
      director: 'movie director'
    },
    {
      id: '1',
      title: 'movie title',
      year: '2008',
      runtime: '120 min',
      jenre: 'Biography, Crime, Drama',
      director: 'movie director'
    },
    {
      id: '2',
      title: 'another movie title',
      year: '2018',
      runtime: '141 min',
      jenre: 'Crime, Drama',
      director: 'movie director'
    },
    {
      id: '2',
      title: 'another movie title',
      year: '2018',
      runtime: '142 min',
      jenre: 'Crime, Drama',
      director: 'movie director'
    }
  ];

  constructor(private store: Store<fromRoot.State>) {}

  setModalInfo(title, year, runtime, genre, director) {
    const modalInfo: Modal = {
      modalTitle: 'Edit Movie',
      movieTitle: title,
      movieYear: year,
      movieRuntime: runtime,
      movieGenre: genre,
      movieDirector: director
    };
    this.store.dispatch(new ModalActions.SetModalInfo(modalInfo));
  }

  ngOnInit() {}
}
