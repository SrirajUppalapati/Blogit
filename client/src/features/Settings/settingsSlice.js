import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateUserPasswordAPI, updateUserProfileAPI } from "../../api/userAPI";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";
import { storage } from "../../firebase";

const initialState = {
  pictureLoading: false,
  passwordLoading: false,
  profileLoading: false,
  error: null,
  user: {},
};

export const updateUserProfile = createAsyncThunk(
  "/profile/updateprofile",
  ({ data, token }) => updateUserProfileAPI({ data, token })
);

export const updateUserPassword = createAsyncThunk(
  "/profile/updatepassword",
  ({ data, token }) => updateUserPasswordAPI({ data, token })
);

export const uploadProfilePicture = createAsyncThunk(
  "profile/uploadPhoto",
  async (file) => {
    try {
      const fileName = Date.now() + "-" + file.name;
      const imageRef = ref(storage, `Profile/${fileName}`);
      const img = await uploadBytes(imageRef, file);
      const url = await getDownloadURL(img.ref);
      return url;
    } catch (err) {
      // toast.error("Please upload image files.");
      console.error(err);
    }
  }
);

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadProfilePicture.pending, (state) => {
        state.pictureLoading = true;
        state.error = null;
      })
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.user.profilePicture = action.payload;
        state.pictureLoading = false;
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.pictureLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state, action) => {
        state.profileLoading = true;
        state.error = null;
        state.userProfile = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUserPassword.pending, (state, action) => {
        state.passwordLoading = true;
        state.error = null;
        state.userProfile = null;
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.passwordLoading = false;
        state.error = null;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.passwordLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser } = settingSlice.actions;

export default settingSlice.reducer;
