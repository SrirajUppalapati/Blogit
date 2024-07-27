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
