import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCommentsAPI } from "../../api/activityAPI";

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

export const getAllComments = createAsyncThunk(
  "/activity/allcomments",
  ({ blogId }) => getAllCommentsAPI({ blogId })
);

const activitySlice = new createSlice({
  name: "Activity",
  initialState,
  reducers: {
    addComments: (state, action) => {
      state.comments = [action.payload, ...state.comments];
    },
    deleteComments: (state, action) => {
      state.comments.splice(action.payload, 1);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAllComments.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllComments.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.comments = action.payload.data;
        state.loading = false;
      }),
});

export const { addComments, deleteComments } = activitySlice.actions;

export default activitySlice.reducer;
