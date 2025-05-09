import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: "light",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase("TOGGLE_THEME", (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    });
  },
});

export const { setTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
