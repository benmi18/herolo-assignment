import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFormModalComponent } from './movie-form-modal.component';

describe('MovieFormModalComponent', () => {
  let component: MovieFormModalComponent;
  let fixture: ComponentFixture<MovieFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
