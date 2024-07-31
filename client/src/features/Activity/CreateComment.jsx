import { useDispatch, useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";
import { createCommentAPI } from "../../api/activityAPI";
import { useState } from "react";
import { addComments } from "./activitySlice";
import toast from "react-hot-toast";
import { editBlog } from "../Home/homeSlice";

function CreateComment() {
  const { currentUser, token } = useSelector((state) => state.auth);
  const { blog } = useSelector((state) => state.home);

  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  function handlePublishComment() {
    if (!comment) {
      return toast.error("Please write something to add a comment!");
    }
    const data = {
      blogId: blog._id,
      comment,
      authorId: blog.author._id,
    };
    createCommentAPI({ data, token }).then(({ data }) => {
      setComment("");
      data.userId = {
        name: currentUser.name,
        profilePicture: currentUser.profilePicture,
        username: currentUser.username,
        _id: currentUser._id,
      };
      dispatch(addComments(data));
    });
    let count = blog.activity.totalComments;
    count = count + 1;
    dispatch(
      editBlog({
        ...blog,
        activity: { ...blog.activity, totalComments: count },
      })
    );
  }

  return (
    <div className="bg-inherit dark:bg-gray-700 rounded-lg bg-gray-50 mt-2 shadow-lg">
      <Textarea
        type="text"
        placeholder="Thoughts on this blog?"
        value={comment}
        className="h-20 resize-none leading-7 pl-4 border-0 focus:ring-0 overflow-auto scroll-m-2"
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="flex justify-end p-3">
        <Button onClick={handlePublishComment}>Publish</Button>
      </div>
    </div>
  );
}

export default CreateComment;
