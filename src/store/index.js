import { configureStore } from "@reduxjs/toolkit";
import { movieDetailReducer } from "@store/slice/movieDetailSlice";
import { moviesReducer } from "@store/slice/moviesSlice";
import { themeReducer } from "@store/slice/themeSlice";
import { userReducer } from "@store/slice/userSlice";

export const store = configureStore({
  reducer: {
    movieDetail: movieDetailReducer,
    movies: moviesReducer,
    theme: themeReducer,
    user: userReducer,
  },
});
