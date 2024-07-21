import { useDispatch, useSelector } from "react-redux";
import CreateBlog from "../features/blogs/CreateBlog";
import PublishBlog from "../features/blogs/PublishBlog";
import { useEffect, useState } from "react";
import { setError } from "../features/blogs/blogSlice";

function WriteBlog() {
  const [openPublish, setOpenPublish] = useState(false);
  const dispatch = useDispatch();
  const { error, blog } = useSelector((state) => state.blog);

  useEffect(
    function () {
      setError(null);
    },
    [dispatch]
  );

  function handleErrors() {
    if (error) {
      return;
    }
    if (!blog.title.length) {
      dispatch(setError("Please add a title"));
      return 0;
    }
    if (blog.banner === "") {
      dispatch(setError("Please add a banner"));
      return 0;
    }
    // if (contentText && contentText.isReady) {
    //   contentText
    //     .save()
    //     .then((data) => {
    //       if (data.blocks.length) {
    //         dispatch(writeBlog(""));
    //         publishBlog(true);
    //       } else {
    //         dispatch(setError("Please add some content."));
    //       }
    //     })
    //     .catch(({ error }) => {
    //       console.error(error);
    //     });
    // }

    if (blog.content[0] === "<p><br></p>" || !blog.content.length) {
      dispatch(setError("Please add some content"));
      return 0;
    }
    if (!blog.title.length) {
      dispatch(setError("Please add a title"));
      return 0;
    }
    if (openPublish) {
      if (!blog.description.length) {
        dispatch(setError("Please add a description"));
        return 0;
      }
      if (blog.tags.length < 3) {
        dispatch(setError("Please add tags between 3 to 10."));
        return 0;
      }
    }
    return 1;
  }
  return (
    <div className=" flex flex-col items-center mt-2 justify-center">
      {<CreateBlog publishBlog={setOpenPublish} handleErrors={handleErrors} />}
      <PublishBlog
        setOpenPublish={setOpenPublish}
        openPublish={openPublish}
        handleErrors={handleErrors}
      />
    </div>
  );
}

export default WriteBlog;
