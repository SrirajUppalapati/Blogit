import axios from "axios";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

export const signInAPI = async (data) => {
  try {
    const user = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/login`,
      data
    );
    return user.data;
  } catch (err) {
    throw err;
  }
};

export const signInWithGoogleAPI = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  provider.setCustomParameters({ prompt: "select_account" });

  try {
    const resFromGoogle = await signInWithPopup(auth, provider);
    const googleData = {
      name: resFromGoogle.user.displayName,
      email: resFromGoogle.user.email,
      profilePicture: resFromGoogle.user.photoURL,
    };
    try {
      const user = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/google`,
        googleData
      );
      return user.data;
    } catch (err) {
      throw err;
    }
  } catch (err) {
    if (err.code === "auth/popup-blocked") {
      alert(
        "Popup was blocked by the browser. Please allow popups and try again."
      );
    }
    throw err;
  }
};

export const signUpAPI = async (data) => {
  try {
    const user = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/signup`,
      data
    );
    return user.data;
  } catch ({ response }) {
    throw response.data.message;
  }
};

export const signOutAPI = async () => {
  try {
    const data = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/signout`
    );

    return data;
  } catch (err) {
    throw err;
  }
};
