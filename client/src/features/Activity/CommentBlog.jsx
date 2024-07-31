import { useState } from "react";
import { LiaComments } from "react-icons/lia";
import CommentsSideBar from "./CommentsSideBar";
import { useSelector } from "react-redux";
import AnimaitonWrapper from "../../components/AnimationWrapper";
function CommentBlog() {
  const { blog } = useSelector((state) => state.home);
  const [show, setShow] = useState(false);

  function handleComments(e) {
    e.preventDefault();
    setShow(!show);
  }

  return (
    <div>
      <button onClick={handleComments}>
        <div className="text-[0.75rem] flex justify-center items-center gap-2">
          <LiaComments />
          <p id={`comment-${blog.blogId}`} className="text-[0.75rem]">
            {blog?.activity?.totalComments}
          </p>
        </div>
      </button>
      {show && (
        <AnimaitonWrapper>
          <CommentsSideBar show={show} setShow={setShow} />
        </AnimaitonWrapper>
      )}
    </div>
  );
}

export default CommentBlog;
