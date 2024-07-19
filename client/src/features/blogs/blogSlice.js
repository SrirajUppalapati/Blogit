import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blog: {
    title: "",
    banner: "",
    description: "",
    content: [],
    tags: [],
  },
  contentText: { isReady: false },
  error: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    writeBlog: (state, action) => {
      state.blog = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearBlog: (state) => {
      state.blog = {
        title: "",
        banner: "",
        description: "",
        content: [],
        tags: [],
      };
      state.error = null;
    },
    setContentText: (state, action) => {
      state.contentText = action.payload;
    },
  },
});

export const { writeBlog, setError, clearBlog, setContentText } =
  blogSlice.actions;

export default blogSlice.reducer;
