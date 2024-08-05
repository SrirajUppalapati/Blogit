import { BiLike, BiSolidLike } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { checkLikeAPI, likeBlogAPI } from "../../api/blogsAPI";
import { useEffect, useState } from "react";
import { editBlog } from "../Home/homeSlice";

function LikeBlog() {
  const { token, currentUser } = useSelector((state) => state.auth);
  const [like, setLike] = useState(false);
  const { blog } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      checkLikeAPI({
        blogId: blog._id,
        token,
        userId: currentUser.username,
      }).then((data) => {
        setLike(data.result);
      });
    }
  }, [token, blog._id, currentUser]);

  async function handleLike(e) {
    e.preventDefault();
    if (token) {
      const newLikeState = !like;
      setLike(newLikeState);
      await likeBlogAPI({
        blogId: blog._id,
        token,
        likedByUser: newLikeState,
      });

      let count = blog.activity.totalLikes;
      count = newLikeState ? count + 1 : count - 1;
      dispatch(
        editBlog({ ...blog, activity: { ...blog.activity, totalLikes: count } })
      );
    } else {
      toast.error("Please login!");
    }
  }

  return (
    <button onClick={handleLike} className="border-0 focus:ring-0">
      <div className="text-[0.75rem] flex justify-center items-center gap-2">
        {like ? <BiSolidLike /> : <BiLike />}
        <p id={`${blog.blogId}-likes`} className="text-[0.75rem]">
          {blog.activity.totalLikes}
        </p>
      </div>
    </button>
  );
}

export default LikeBlog;
