export interface Modal {
  isNewMovie: boolean;
  modalTitle: string;
  movieTitle: string;
  movieYear: string;
  movieRuntime: any;
  movieGenre: string;
  movieDirector: string;
  minYear?: number;
  minYearErr?: boolean;
  minRunTime?: number;
  minRuntimeErr?: boolean;
}
