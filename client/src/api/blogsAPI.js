import axios from "axios";

export const createBlogAPI = async ({ blog, token }) => {
  try {
    const data = await axios.post(
      `${import.meta.env.VITE_API_URL}/blog/createblog`,
      blog,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (!data) {
      throw new Error("Couldnt upload data.");
    }
    return data;
  } catch ({ response }) {
    throw response.data.message;
  }
};
