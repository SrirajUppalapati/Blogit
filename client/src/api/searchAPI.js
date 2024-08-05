import axios from "axios";

export const getSearchTag = async ({ query }) => {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_API_URL}/search/tags/?q=${query}`
    );
    return data.data.data;
  } catch (err) {
    throw new Error("Unable to search tags.");
  }
};

export const getSearchTitle = async ({ query }) => {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_API_URL}/search/title/?q=${query}`
    );
    return data.data;
  } catch (err) {
    throw new Error("Unable to search titles.");
  }
};

export const getSearchUser = async ({ query }) => {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_API_URL}/search/user/?q=${query}`
    );
    return data.data;
  } catch (err) {
    throw new Error("Unable to search users.");
  }
};
