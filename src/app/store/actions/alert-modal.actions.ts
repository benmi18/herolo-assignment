import { Action } from '@ngrx/store';

export enum AlertModalActionTypes {
  LoadMovieIdToDelete = '[AlertModal] Load Movie Id To Delete',
  SetMovieIdToDelete = '[AlertModal] Set Movie Id To Delete'
}

export class LoadMovieIdToDelete implements Action {
  readonly type = AlertModalActionTypes.LoadMovieIdToDelete;
}

export class SetMovieIdToDelete implements Action {
  readonly type = AlertModalActionTypes.SetMovieIdToDelete;
  constructor(public payload: string) {}
}

export type AlertModalActions = LoadMovieIdToDelete | SetMovieIdToDelete;
