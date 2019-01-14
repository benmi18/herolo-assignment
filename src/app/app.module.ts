import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/header/navbar/navbar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { ModalComponent } from './components/modal/modal.component';
import { reducers, metaReducers } from './store/reducers';
import { ToIntPipe } from './pipes/to-int.pipe';
import { ToRuntimeStringPipe } from './pipes/to-runtime-string.pipe';
import { TitlePipe } from './pipes/title.pipe';
import { TitleStringifyPipe } from './pipes/title-stringify.pipe';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    LayoutComponent,
    FooterComponent,
    MovieListComponent,
    AddMovieComponent,
    ModalComponent,
    ToIntPipe,
    ToRuntimeStringPipe,
    TitlePipe,
    TitleStringifyPipe,
    AlertModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
