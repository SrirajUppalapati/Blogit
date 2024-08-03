import axios from "axios";

export const getUserProfileAPI = async ({ username }) => {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_API_URL}/users/${username}`
    );

    if (!data) {
      throw new Error(`Couldnt get the user with id: ${username}`);
    }
    return data.data.data;
  } catch ({ response }) {
    throw response.data.message;
  }
};

export const updateUserProfileAPI = async ({ data, token }) => {
  try {
    const user = await axios.patch(
      `${import.meta.env.VITE_API_URL}/profile/updateprofile`,
      data,
      { headers: { authorization: `Bearer ${token}` } }
    );

    if (!user) {
      throw new Error(`Couldnt update the profile!`);
    }
    return user.data.data;
  } catch ({ response }) {
    throw response.data.message;
  }
};

export const updateUserPasswordAPI = async ({ data, token }) => {
  try {
    const user = await axios.patch(
      `${import.meta.env.VITE_API_URL}/profile/updatepassword`,
      data,
      { headers: { authorization: `Bearer ${token}` } }
    );

    if (!user) {
      throw new Error(`Couldnt update the password!`);
    }
    return user.data.data;
  } catch ({ response }) {
    throw response.data.message;
  }
};

export const getUserBlogsAPI = async ({ token }) => {
  try {
    const blogs = await axios.get(
      `${import.meta.env.VITE_API_URL}/profile/blogs`,
      { headers: { authorization: `Bearer ${token}` } }
    );

    return blogs.data;
  } catch ({ response }) {
    throw response.data.message;
  }
};
