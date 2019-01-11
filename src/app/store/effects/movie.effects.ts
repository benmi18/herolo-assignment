import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { MovieService } from '../../services/movie.service';
import * as movieActions from '../actions/movie.actions';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MovieEffects {
  constructor(
    private actions$: Actions,
    private movieService: MovieService,
    private http: HttpClient
  ) {}
}
