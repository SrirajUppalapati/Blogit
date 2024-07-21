/* eslint-disable no-useless-escape */
import { Button, Modal, Spinner, Textarea } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { clearBlog, setError, uploadBlog, writeBlog } from "./blogSlice";
import AnimationWrapper from "../../components/AnimationWrapper";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tags from "./Tags";
import Error from "../../components/Error";

function PublishBlog({ openPublish, setOpenPublish, handleErrors }) {
  const dispatch = useDispatch();
  const { blog, error, loading } = useSelector((state) => state.blog);
  const { theme } = useSelector((state) => state.theme);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setError(null));
  }, [dispatch]);

  function handlePublish(e) {
    e.preventDefault();
    if (!handleErrors()) {
      return;
    }
    dispatch(writeBlog({ draft: false }));
    dispatch(uploadBlog({ data: blog, token })).then((response) => {
      if (response.type === "blog/upload/rejected") {
        return;
      } else {
        dispatch(clearBlog());
        navigate("/");
      }
    });
  }

  function handleDraft(e) {
    e.preventDefault();
    if (!handleErrors()) {
      return;
    }
    dispatch(writeBlog({ draft: true }));
    dispatch(uploadBlog({ data: blog, token })).then((response) => {
      if (response.type === "blog/upload/rejected") {
        return;
      } else {
        dispatch(clearBlog());
        navigate("/");
      }
    });
  }

  return (
    <AnimationWrapper>
      <Modal
        dismissible
        show={openPublish}
        onClose={() => setOpenPublish(false)}
        size="7xl"
        className={`${theme} p-4`}
      >
        <Modal.Header className="border-b-0 uppercase text-center flex flex-col-reverse justify-center items-center dark:bg-slate-700">
          <span className="text-2xl font-serif">Preview</span>
        </Modal.Header>
        <Modal.Body className="dark:bg-slate-800">
          <div className="grid lg:grid-cols-2">
            <div className="space-y-6 flex justify-center items-center flex-col-reverse mb-4 gap-3 md:flex-col">
              <img
                src={blog.banner}
                alt="banner"
                className="border-2 rounded-lg dark:border-slate-500 border-slate-200 h-full w-full max-h-[360px] max-w-[640px]"
              />
              <h1 className="text-center capitalize text-2xl pb-2 dark:text-slate-100 text-slate-950">
                {blog.title}
              </h1>
            </div>
            <div className="ml-4">
              <div>
                <label className="ml-2 capitalize text-slate-300">Title</label>
                <Textarea
                  type="text"
                  placeholder="Title"
                  id="title"
                  onChange={(e) => {
                    if (
                      e.target.value &&
                      !/^[a-zA-Z0-9 ]+$/.test(e.target.value)
                    ) {
                      return dispatch(
                        setError("Please use only alphanumeric charecters.")
                      );
                    }
                    dispatch(writeBlog({ title: e.target.value }));
                  }}
                  className=" line-clamp-1 resize-none border-0 mb-4 focus:ring-0"
                  maxLength="50"
                  defaultValue={blog?.title}
                />
              </div>
              <div className="mt-3">
                <label className="ml-2 capitalize text-slate-300">
                  Description
                </label>
                <Textarea
                  className="h-40 resize-none leading-7 pl-4"
                  onChange={(e) => {
                    dispatch(writeBlog({ description: e.target.value }));
                  }}
                  maxLength="200"
                  defaultValue={blog?.description}
                  onKeyDown={(e) => e.code === "Enter" && e.preventDefault()}
                />
                <p className="text-xs text-right text-slate-300 mt-1 italic mr-1">
                  {200 - blog.description?.length || 200} charecters left
                </p>
              </div>
              <Tags />
            </div>
          </div>
        </Modal.Body>

        <div className="flex flex-col gap-4 justify-center pb-3 dark:bg-slate-800 px-10">
          {error && <Error error={error} />}

          <Button
            onClick={handlePublish}
            className="focus:ring-0"
            color={theme === "dark" ? "cyan" : "dark"}
            disabled={loading}
          >
            {loading ? <Spinner /> : "Publish"}
          </Button>
          <Button
            color="gray"
            className="focus:ring-0"
            onClick={handleDraft}
            disabled={loading}
          >
            {loading ? <Spinner /> : "Draft"}
          </Button>
        </div>
      </Modal>
    </AnimationWrapper>
  );
}

export default PublishBlog;
