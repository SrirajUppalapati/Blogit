import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
};
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      state.theme === "light"
        ? (state.theme = "dark")
        : (state.theme = "light");
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
