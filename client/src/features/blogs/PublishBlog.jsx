import { Button, Modal, Spinner, Textarea } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateBlog, uploadBlog, writeBlog } from "./blogSlice";
import AnimationWrapper from "../../components/AnimationWrapper";
import Tags from "./Tags";
import { RiCloseLargeLine } from "react-icons/ri";
import BlogTItle from "./BlogTItle";
import toast from "react-hot-toast";

function PublishBlog({ openPublish, setOpenPublish, handleErrors }) {
  const dispatch = useDispatch();
  const { blog, loading } = useSelector((state) => state.blog);
  const { theme } = useSelector((state) => state.theme);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { blogId } = useParams();

  function handlePublish(e) {
    if (handleErrors()) {
      if (blogId) {
        dispatch(updateBlog({ blog, token, blogId })).then((res) => {
          if (res.payload) {
            toast.success(`Updated blog successfully!`);
            navigate("/");
          } else {
            toast.error(res.error.message);
          }
        });
      } else {
        dispatch(uploadBlog({ blog, token })).then((res) => {
          if (res.payload) {
            toast.success(`Published blog successfully!`);
            navigate("/");
          } else {
            toast.error(res.error.message);
          }
        });
      }
    }
  }

  if (loading || !Object.keys(blog).length) {
    return <Spinner />;
  }

  return (
    <AnimationWrapper>
      <Modal
        dismissible
        show={openPublish}
        onClose={() => setOpenPublish(false)}
        size="7xl"
        className={`${theme}`}
      >
        <Modal.Body className="flex justify-between dark:bg-slate-800 dark:text-slate-100">
          <span className="text-4xl italic text-center">Your Blog</span>
          <button
            className="text-white focus:ring-0"
            onClick={() => setOpenPublish(false)}
          >
            <RiCloseLargeLine className="hover:text-xl" />
          </button>
        </Modal.Body>
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
                <BlogTItle className=" line-clamp-1 resize-none border-0 mb-4 focus:ring-0" />
              </div>
              <div className="mt-3">
                <label className="ml-2 capitalize text-slate-300">
                  Description
                </label>
                <Textarea
                  className="h-40 resize-none leading-7 pl-4 border-0 focus:ring-0"
                  autoFocus
                  onChange={(e) => {
                    dispatch(writeBlog({ description: e.target.value }));
                  }}
                  maxLength="200"
                  value={blog.description}
                  onKeyDown={(e) => e.code === "Enter" && e.preventDefault()}
                />
                <p className="text-xs text-right text-slate-300 mt-1 italic mr-1">
                  {200 - blog.description.length || 200} charecters left
                </p>
              </div>
              <Tags />
            </div>
          </div>
        </Modal.Body>

        <div className="flex flex-col gap-4 justify-center pb-3 dark:bg-slate-800 px-10">
          <Button
            onClick={handlePublish}
            className="focus:ring-0"
            color={theme === "dark" ? "cyan" : "dark"}
            disabled={loading}
          >
            {loading ? <Spinner /> : "Publish"}
          </Button>
        </div>
      </Modal>
    </AnimationWrapper>
  );
}

export default PublishBlog;
