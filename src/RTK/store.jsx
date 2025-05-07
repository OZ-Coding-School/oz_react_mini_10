import { configureStore } from "@reduxjs/toolkit";
import { movieSlice, searchMovieSlice } from "./slice";

export const store = configureStore({
  reducer: {
    movie: movieSlice.reducer,
    searchMovie: searchMovieSlice.reducer,
  },
});
