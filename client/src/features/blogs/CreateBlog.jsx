import { Alert, Button, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "./Banner";
import { clearBlog, setContentText, setError, writeBlog } from "./blogSlice";
import { useEffect, useRef } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import AnimationWrapper from "../../components/AnimationWrapper";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./blogTools";

function CreateBlog({ publishBlog }) {
  const dispatch = useDispatch();
  const { blog, error, contentText } = useSelector((state) => state.blog);
  const { theme } = useSelector((state) => state.theme);
  const editorRef = useRef(null);

  useEffect(
    function () {
      dispatch(setError(null));
    },
    [dispatch]
  );

  useEffect(
    function () {
      if (!editorRef.current) {
        dispatch(
          setContentText(
            new EditorJS({
              holder: "content",
              placeholder: "Add your text!",
              data: "",
              tools: tools,
              onReady: () => {
                console.log("Editor.js is ready to work!");
              },
            })
          )
        );
      }
      editorRef.current = true;
    },
    [dispatch]
  );
  function handleFormSubmit(e) {
    e.preventDefault();
    if (!blog.title.length) {
      dispatch(setError("Please add a title"));
      return;
    }
    if (blog.banner === "") {
      dispatch(setError("Please add a banner"));
      return;
    }
    if (contentText.isReady) {
      contentText
        .save()
        .then((data) => {
          if (data.blocks.length) {
            dispatch(writeBlog({ ...blog, content: [data] }));
          }
        })
        .catch((err) => {
          console.error(err);
        });

      if (!blog.content.length) {
        dispatch(setError("Please add some content."));
        return;
      }
    }
    publishBlog(true);
  }

  return (
    <AnimationWrapper>
      <h1 className="text-4xl font-bold mt-4 text-center uppercase mx-10">
        {"Write Your Blog"}
      </h1>
      <form
        className="mx-auto w-screen px-10 mb-0 max-w-[1000px] mt-7"
        onSubmit={handleFormSubmit}
      >
        <div className="flex flex-col gap-4 pb-10">
          <Banner />
          <TextInput
            type="text"
            placeholder="Title"
            id="title"
            className="flex-1 focus:ring-0 border-0"
            onChange={(e) => {
              dispatch(writeBlog({ ...blog, title: e.target.value }));
            }}
            maxLength="50"
            defaultValue={blog?.title}
          />
          <div
            id="content"
            className="bg-white w-full rounded-md h-full text-black"
          ></div>
          {error && (
            <div className="flex justify-center items-center">
              <Alert
                color="failure"
                className="p-1 px-3 w-fit"
                icon={IoAlertCircleOutline}
              >
                <span className="text-sm text-center">{error}</span>
              </Alert>
            </div>
          )}
          <div className="flex justify-between items-center md:justify-center md:gap-x-10 lg:gap-x-20">
            <Button
              className="focus:ring-0 border-0"
              color="light"
              onClick={() => {
                dispatch(clearBlog());
              }}
            >
              Clear
            </Button>
            <Button
              className="focus:ring-0 border-0"
              color={theme === "dark" ? "cyan" : "dark"}
              type="submit"
            >
              Publish
            </Button>
          </div>
        </div>
      </form>
    </AnimationWrapper>
  );
}

export default CreateBlog;
