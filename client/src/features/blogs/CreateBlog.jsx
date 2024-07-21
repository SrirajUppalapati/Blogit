import { Button, Textarea } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AnimationWrapper from "../../components/AnimationWrapper";
import Error from "../../components/Error";

// import EditorJS from "@editorjs/editorjs";
// import { tools } from "./blogTools";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { setError, writeBlog } from "./blogSlice";
import Banner from "./Banner";

function CreateBlog({ publishBlog, handleErrors }) {
  const dispatch = useDispatch();
  const { blog, error } = useSelector((state) => state.blog);
  const { theme } = useSelector((state) => state.theme);

  // const editorRef = useRef(null);

  useEffect(() => {
    dispatch(setError(null));
  }, [dispatch]);

  // useEffect(() => {
  //   if (!editorRef.current) {
  //     const editor = new EditorJS({
  //       holder: "content",
  //       placeholder: "Add your text!",
  //       data: blog.content,
  //       tools: tools,
  //     });
  //     editorRef.current = editor;
  //     dispatch(setContentText(editor));
  //   }
  // }, [dispatch, blog]);

  function handleFormSubmit(e) {
    e.preventDefault();
    if (!handleErrors()) {
      return;
    }
    dispatch(writeBlog(""));
    publishBlog(true);
  }

  return (
    <AnimationWrapper>
      {error && <Error error={error} />}

      <form
        className="mx-auto w-screen px-10 max-w-[1000px] mt-7 "
        onSubmit={handleFormSubmit}
      >
        <Textarea
          type="text"
          placeholder="Please enter your title here"
          id="title"
          className=" text-3xl line-clamp-2 resize-none leading-10 bg-inherit border-0 dark:bg-inherit mb-4 focus:ring-0"
          onChange={(e) => {
            if (e.target.value && !/^[a-zA-Z0-9 ]+$/.test(e.target.value)) {
              return dispatch(
                setError("Please use only alphanumeric charecters.")
              );
            }
            dispatch(writeBlog({ title: e.target.value }));
          }}
          maxLength="50"
          defaultValue={blog?.title}
        />
        <Banner />
        {/* <div id="content" className="editor-js"></div> */}
        <div className="mb-10">
          <ReactQuill
            theme="snow"
            value={blog?.content[0]}
            onChange={(e) => dispatch(writeBlog({ content: [e] }))}
            className="h-72 pb-10"
          />
        </div>
        <div className="pt-10 flex flex-col gap-4 pb-10 md:fixed md:-top-7 z-50 md:right-[20%]">
          <Button
            className="focus:ring-0 border-0"
            color={theme === "dark" ? "cyan" : "dark"}
            type="submit"
          >
            <div className="flex justify-center items-center">
              <span className="text-md text-center">Publish</span>
            </div>
          </Button>
        </div>
      </form>
    </AnimationWrapper>
  );
}

export default CreateBlog;
