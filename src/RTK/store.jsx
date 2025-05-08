import { configureStore } from "@reduxjs/toolkit";
import { detailMovieSlice, movieSlice, searchMovieSlice } from "./slice";

export const store = configureStore({
  reducer: {
    movie: movieSlice.reducer,
    searchMovie: searchMovieSlice.reducer,
    detailMovie: detailMovieSlice.reducer,
  },
});
