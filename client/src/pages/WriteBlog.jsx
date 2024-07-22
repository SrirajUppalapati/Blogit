import { useSelector } from "react-redux";
import CreateBlog from "../features/blogs/CreateBlog";
import PublishBlog from "../features/blogs/PublishBlog";
import { useState } from "react";
import toast from "react-hot-toast";

function WriteBlog() {
  const [openPublish, setOpenPublish] = useState(false);
  const { blog } = useSelector((state) => state.blog);

  function handleErrors() {
    if (!blog.title.length) {
      toast.error("Please add a title.");
      return 0;
    }
    // eslint-disable-next-line no-useless-escape
    if (!/^[a-zA-Z0-9 ,\-]+$/.test(blog.title)) {
      toast.error("Please use only alphanumerics for title");
      return 0;
    }
    if (!blog.banner.length) {
      toast.error("Please upload a banner.");
      return 0;
    }
    if (!blog.content?.blocks.length) {
      toast.error("Please write some content.");
      return 0;
    }

    if (openPublish) {
      if (!blog.description.length) {
        toast.error("Please write some description.");
        return 0;
      }
      if (blog.tags.length < 3) {
        toast.error("Please add atleast 3 tags.");
        return 0;
      }
    }
    return 1;
  }

  return (
    <div className="flex flex-col items-center mt-2">
      <CreateBlog publishBlog={setOpenPublish} handleErrors={handleErrors} />
      <PublishBlog
        setOpenPublish={setOpenPublish}
        openPublish={openPublish}
        handleErrors={handleErrors}
      />
    </div>
  );
}

export default WriteBlog;
