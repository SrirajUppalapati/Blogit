import { useDispatch, useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";
import { createCommentAPI } from "../../api/activityAPI";
import { useState } from "react";
import { addComments } from "./activitySlice";
import toast from "react-hot-toast";

function CreateComment() {
  const { token } = useSelector((state) => state.auth);
  const { blog } = useSelector((state) => state.home);
  const { comments } = useSelector((state) => state.activity);

  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  function handlePublishComment(e) {
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
      dispatch(addComments([...comments, data]));
    });
  }

  return (
    <div className="bg-inherit dark:bg-gray-700 rounded-lg bg-gray-50 mt-2">
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
