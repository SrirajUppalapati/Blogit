import { Textarea } from "flowbite-react";
import { writeBlog } from "./blogSlice";
import { useDispatch, useSelector } from "react-redux";

function BlogTItle({ className }) {
  const dispatch = useDispatch();
  const { blog } = useSelector((state) => state.blog);

  function handleTitle(e) {
    dispatch(writeBlog({ title: e.target.value }));
  }
  return (
    <Textarea
      type="text"
      placeholder="Please enter your title here"
      id="title"
      className={className}
      autoFocus={true}
      onChange={handleTitle}
      maxLength="50"
      value={blog?.title}
    />
  );
}

export default BlogTItle;
