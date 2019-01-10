import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  omdbKey = 'd01a1bca';
  movies = [
    'Super 8',
    'Super Size Me',
    'My Super Ex-Girlfriend',
    'Super Man',
    'Blade Runner',
    'The Maze Runner',
    'Blade Runner 2049',
    'Avengers: Infinity War',
    'The Amazing Spider-Man'
  ];

  omdbUrl(key, title) {
    return `http://www.omdbapi.com/?t=${title}$&apikey=${key}`;
  }
  constructor(private http: HttpClient) {}

  getMovies() {
    this.movies.forEach(title => {
      return this.http.get(this.omdbUrl(this.omdbKey, title));
    });
  }
}
