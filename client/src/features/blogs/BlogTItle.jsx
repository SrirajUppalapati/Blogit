import { Textarea } from "flowbite-react";
import { setError, writeBlog } from "./blogSlice";
import { useDispatch, useSelector } from "react-redux";

function BlogTItle({ className }) {
  const dispatch = useDispatch();
  const { blog } = useSelector((state) => state.blog);

  function handleTitle(e) {
    if (e.target.value && !/^[a-zA-Z0-9 ,\-]+$/.test(e.target.value)) {
      return dispatch(setError("Please use only alphanumeric characters."));
    }
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
