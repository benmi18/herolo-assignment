import { Component, OnInit } from '@angular/core';
import { Modal } from '../../models/modal.model';
import * as fromRoot from '../../store/reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  modalInfo: Modal;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store
      .select(fromRoot.getModalInfo)
      .subscribe(info => (this.modalInfo = info));
  }

  handleClick() {
    console.log(this.modalInfo);
  }
}
