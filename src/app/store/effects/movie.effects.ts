import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { MovieService } from '../../services/movie.service';

@Injectable()
export class MovieEffects {
  constructor(private actions$: Actions) {}
}
