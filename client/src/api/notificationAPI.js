import axios from "axios";

export const allNotificationsAPI = async ({ token, query }) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/notification/allnotifications/?${query}`,
      { headers: { authorization: `Bearer ${token}` } }
    );
    return data;
  } catch (err) {
    throw err;
  }
};

export const checkSeenAPI = async ({ token }) => {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_API_URL}/notification/checkseen`,
      { headers: { authorization: `Bearer ${token}` } }
    );
    return data.data;
  } catch (err) {
    throw err;
  }
};

export const markReadAPI = async ({ token, id }) => {
  try {
    const data = await axios.patch(
      `${import.meta.env.VITE_API_URL}/notification/${id}`,
      {},
      { headers: { authorization: `Bearer ${token}` } }
    );
    return data.data;
  } catch (err) {
    throw err;
  }
};
