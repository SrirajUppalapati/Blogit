import axios from "axios";

export const getSearchTag = async ({ query }) => {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_API_URL}/search/tags/?q=${query}`
    );
    return data.data;
  } catch (err) {
    console.error(err);
  }
};

export const getSearchTitle = async ({ query }) => {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_API_URL}/search/title/?q=${query}`
    );
    return data.data;
  } catch (err) {
    console.error(err);
  }
};

export const getSearchUser = async ({ query }) => {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_API_URL}/search/user/?q=${query}`
    );
    return data.data;
  } catch (err) {
    console.error(err);
  }
};
