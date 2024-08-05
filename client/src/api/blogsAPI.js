import axios from "axios";

export const createBlogAPI = async ({ blog, token }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/blog/createblog`,
      blog,
      { headers: { authorization: `Bearer ${token}` } }
    );
    if (!response || !response.data) {
      throw new Error("Couldn't upload data.");
    }
    return response.data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : error.message;
    throw new Error(message);
  }
};

export const getAllBlogsAPI = async ({ page, filter }) => {
  try {
    const url = filter
      ? `${
          import.meta.env.VITE_API_URL
        }/blog/allblogs/?page=${page}&tags=${filter}`
      : `${import.meta.env.VITE_API_URL}/blog/allblogs/?page=${page}`;

    const response = await axios.get(url);
    if (!response || !response.data) {
      throw new Error("Couldn't get all blogs");
    }
    return response.data.data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : error.message;
    throw new Error(message);
  }
};

export const getOneBlogAPI = async ({ blogId, mode }) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/blog/allblogs/${blogId}/?mode=${mode}`
    );
    if (!response || !response.data) {
      throw new Error(`Couldn't get the blog with id: ${blogId}`);
    }
    return response.data.data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : error.message;
    throw new Error(message);
  }
};

export const updateOneBlogAPI = async ({ blog, blogId, token }) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/blog/${blogId}`,
      blog,
      { headers: { authorization: `Bearer ${token}` } }
    );
    if (!response || !response.data) {
      throw new Error(`Couldn't update the blog with id: ${blogId}`);
    }
    return response.data.data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : error.message;
    throw new Error(message);
  }
};

export const deleteOneBlogAPI = async ({ blogId, token }) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/blog/${blogId}`,
      { headers: { authorization: `Bearer ${token}` } }
    );
    if (!response || !response.data) {
      throw new Error(`Couldn't delete the blog with id: ${blogId}`);
    }
    return response.data.data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : error.message;
    throw new Error(message);
  }
};

export const getTrendingBlogsAPI = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/blog/trendingblogs`
    );
    if (!response || !response.data) {
      throw new Error("Couldn't get trending blogs");
    }
    return response.data.data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : error.message;
    throw new Error(message);
  }
};

export const tagsWithMostPostsAPI = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/blog/toptentags`
    );
    if (!response || !response.data) {
      throw new Error("Couldn't get the tags");
    }
    return response.data.data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : error.message;
    throw new Error(message);
  }
};

export const likeBlogAPI = async ({ blogId, token, likedByUser }) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/blog/likeblog`,
      { blogId, likedByUser },
      { headers: { authorization: `Bearer ${token}` } }
    );
    if (!response || !response.data) {
      throw new Error("Couldn't like the blog");
    }
    return response.data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : error.message;
    throw new Error(message);
  }
};

export const checkLikeAPI = async ({ blogId, token }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/blog/checkliked`,
      { blogId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!response || !response.data) {
      throw new Error("Couldn't check the like status");
    }
    return response.data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : error.message;
    throw new Error(message);
  }
};
