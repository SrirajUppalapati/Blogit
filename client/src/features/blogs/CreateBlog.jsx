import { Button, HR } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AnimationWrapper from "../../components/AnimationWrapper";
import Error from "../../components/Error";

import { setError } from "./blogSlice";
import Banner from "./Banner";
import Editor from "./Editor";
import BlogTItle from "./BlogTItle";

function CreateBlog({ publishBlog, handleErrors }) {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.blog);
  const { theme } = useSelector((state) => state.theme);

  useEffect(
    function () {
      dispatch(setError(null));
    },
    [dispatch]
  );

  function handleFormSubmit(e) {
    e.preventDefault();
    if (!handleErrors()) {
      return;
    }
    publishBlog(true);
  }

  return (
    <AnimationWrapper>
      {error && <Error error={error} />}

      <form
        className="mx-auto w-screen px-10 max-w-[1000px] mt-7 min-h-screen pb-10"
        onSubmit={handleFormSubmit}
      >
        <div className="relative">
          <BlogTItle className="text-2xl md:text-3xl line-clamp-2 resize-none leading-10 bg-inherit border-0 dark:bg-inherit mb-4 focus:ring-0" />
          <Banner />
          <HR />

          <Editor />
          <div className="flex items-center justify-center md:absolute md:right-2 md:top-0">
            <Button
              className="focus:ring-0"
              color={theme === "dark" ? "cyan" : "light"}
              type="submit"
            >
              <div className="flex justify-center items-center">
                <span className="text-md text-center">Publish</span>
              </div>
            </Button>
          </div>
        </div>
      </form>
    </AnimationWrapper>
  );
}

export default CreateBlog;
