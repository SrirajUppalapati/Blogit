import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
};

const homeSlice = new createSlice({
  name: "home",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setError } = homeSlice.actions;

export default homeSlice.reducer;
