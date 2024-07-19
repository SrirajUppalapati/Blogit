import CreateBlog from "../features/blogs/CreateBlog";
import PublishBlog from "../features/blogs/PublishBlog";
import { useState } from "react";

function WriteBlog() {
  const [openPublish, setOpenPublish] = useState(false);
  return (
    <div className=" flex flex-col items-center mt-2 justify-center h-full">
      {<CreateBlog publishBlog={setOpenPublish} />}
      <PublishBlog setOpenPublish={setOpenPublish} openPublish={openPublish} />
    </div>
  );
}

export default WriteBlog;
