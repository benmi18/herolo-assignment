import { Movie } from './../models/movie.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as fromRoot from '../store/reducers';
import * as movieActions from '../store/actions/movie.actions';
import * as alertModalActions from '../store/actions/alert-modal.actions';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  omdbKey = 'd01a1bca';

  constructor(private http: HttpClient, private store: Store<fromRoot.State>) {}

  omdbUrl(key, type, query) {
    return `https://www.omdbapi.com/?${type}=${query}&type=movie&apikey=${key}`;
  }

  getMovies() {
    return this.http
      .get(this.omdbUrl(this.omdbKey, 's', 'boy'))
      .subscribe((res: { Search: object[] }) => {
        res.Search.forEach((movie: { Title: string }) => {
          this.getMovie(movie.Title).subscribe(
            (movie: {
              imdbID: string;
              Director: string;
              Genre: string;
              Runtime: string;
              Title: string;
              Year: string;
            }) => {
              const newMovie: Movie = {
                id: movie.imdbID,
                director: movie.Director,
                genre: movie.Genre,
                runtime: movie.Runtime,
                title: movie.Title,
                year: movie.Year
              };
              this.store.dispatch(new movieActions.AddMovie(newMovie));
            }
          );
        });
      });
  }

  private getMovie(query) {
    return this.http.get(this.omdbUrl(this.omdbKey, 't', query));
  }

  deleteMovie(id) {
    this.store.dispatch(new alertModalActions.SetMovieIdToDelete(id));
  }

  genRandomId() {
    return (Math.random() * (1 - 9999) + 1).toString();
  }
}
