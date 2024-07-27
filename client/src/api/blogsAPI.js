import axios from "axios";

export const createBlogAPI = async ({ blog }) => {
  try {
    const data = await axios.post(
      `${import.meta.env.VITE_API_URL}/blog/createblog`,
      blog
    );
    if (!data) {
      throw new Error("Couldnt upload data.");
    }
    return data;
  } catch ({ response }) {
    throw response.data.message;
  }
};

export const getAllBlogsAPI = async ({ page, filter }) => {
  try {
    let data;
    if (filter) {
      data = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/blog/allblogs/?page=${page}&tags=${filter}`
      );
    } else {
      data = await axios.get(
        `${import.meta.env.VITE_API_URL}/blog/allblogs/?page=${page}`
      );
    }
    if (!data) {
      throw new Error("Couldnt get all blogs");
    }
    return data.data.data;
  } catch ({ response }) {
    throw response.data.message;
  }
};

export const getOneBlogAPI = async ({ blogId, mode }) => {
  try {
    const data = await axios.patch(
      `${import.meta.env.VITE_API_URL}/blog/allblogs/${blogId}/?mode=${mode}`
    );
    if (!data) {
      throw new Error(`Couldnt get the blog with id: ${blogId}`);
    }
    return data.data.data;
  } catch ({ response }) {
    throw response.data.message;
  }
};

export const updateOneBlogAPI = async ({ blog, blogId }) => {
  try {
    const data = await axios.patch(
      `${import.meta.env.VITE_API_URL}/blog/${blogId}`,
      blog
    );
    if (!data) {
      throw new Error(`Couldnt update the blog with id: ${blogId}`);
    }
    return data.data.data;
  } catch ({ response }) {
    throw response.data.message;
  }
};

export const getTrendingBlogsAPI = async () => {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_API_URL}/blog/trendingblogs`
    );
    if (!data) {
      throw new Error("Couldnt get all blogs");
    }
    return data.data.data;
  } catch ({ response }) {
    throw response.data.message;
  }
};

export const tagsWithMostPostsAPI = async () => {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_API_URL}/blog/toptentags`
    );
    if (!data) {
      throw new Error("Couldnt get the tags");
    }
    return data.data.data;
  } catch ({ response }) {
    throw response.data.message;
  }
};
