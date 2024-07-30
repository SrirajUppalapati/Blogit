import axios from "axios";

export const getAllCommentsAPI = async ({ blogId }) => {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_API_URL}/comment/${blogId}`
    );
    if (!data) {
      throw new Error("Couldnt get all blogs");
    }
    return data.data;
  } catch ({ response }) {
    throw response.data.message;
  }
};

export const createCommentAPI = async ({ data, token }) => {
  try {
    data = await axios.post(
      `${import.meta.env.VITE_API_URL}/comment/addcomment`,
      data,
      { headers: { authorization: `Bearer ${token}` } }
    );
    if (!data) {
      throw new Error("Couldnt get all blogs");
    }
    return data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
