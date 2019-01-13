export interface Modal {
  isNewMovie?: boolean;
  modalTitle?: string;
  movieId?: string;
  movieTitle: string;
  movieYear: string;
  movieRuntime: number;
  movieGenre: string;
  movieDirector: string;
  minYear?: number;
  minYearErr?: boolean;
  minRunTime?: number;
  minRuntimeErr?: boolean;
}
