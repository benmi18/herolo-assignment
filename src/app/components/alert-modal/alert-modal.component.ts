import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../store/reducers';
import * as movieActions from 'src/app/store/actions/movie.actions';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {
  movieIdToDelete: string;
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.select(fromRoot.getmovieIdToDelete).subscribe(id => {
      this.movieIdToDelete = id;
    });
  }

  deleteMovie() {
    this.store.dispatch(new movieActions.RemoveMovie(this.movieIdToDelete));
    this.closeAlert();
  }

  closeAlert() {
    document.getElementById('close-alert').click();
  }
}
