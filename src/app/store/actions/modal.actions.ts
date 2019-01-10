import { Action } from '@ngrx/store';
import { Modal } from '../../models/modal.model';

export enum ModalActionTypes {
  LoadModalInfo = '[Modal] Load Modal Info',
  SetModalInfo = '[Modal] Set Modal Info'
}

export class LoadModalInfo implements Action {
  readonly type = ModalActionTypes.LoadModalInfo;
}

export class SetModalInfo implements Action {
  readonly type = ModalActionTypes.SetModalInfo;
  constructor(public payload: Modal) {}
}

export type ModalActions = LoadModalInfo | SetModalInfo;
