/* eslint-disable no-useless-escape */
import { Button, Modal, Textarea, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { writeBlog } from "./blogSlice";
import AnimationWrapper from "../../components/AnimationWrapper";
import Tags from "./Tags";

function PublishBlog({ openPublish, setOpenPublish }) {
  const dispatch = useDispatch();
  const { blog } = useSelector((state) => state.blog);
  const { theme } = useSelector((state) => state.theme);

  function handleTagsKeyDown(e) {
    let tag = e.target.value;
    tag = tag.replace(/[^a-zA-Z \-]/g, "");
    tag = tag.replace(/[^a-zA-Z \-]/g, "");
    tag = tag.replace(/\s+/g, " ");
    tag = tag.replace(/-+$/, "").trim();

    if (e.code === "Enter" || e.code === "Comma") {
      e.preventDefault();
      if (!blog?.tags?.includes(tag)) {
        dispatch(writeBlog({ ...blog, tags: [...blog.tags, tag] }));
      }
      e.target.value = "";
    }
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
        <Modal.Header className="border-b-0 uppercase text-center flex flex-col-reverse justify-center items-center dark:bg-slate-900">
          <span className="text-2xl font-serif">Preview</span>
        </Modal.Header>
        <Modal.Body className="dark:bg-slate-900">
          <div className="grid lg:grid-cols-2">
            <div className="space-y-6 flex justify-center items-center flex-col">
              <img
                src={blog.banner}
                alt="banner"
                className="border-2 rounded-lg dark:border-slate-800 border-slate-200 max-w-full h-auto max-h-[450px]"
              />
              <h1 className="text-center capitalize text-2xl pb-2 dark:text-slate-100 text-slate-950">
                {blog.title}
              </h1>
            </div>
            <div className="ml-4">
              <div>
                <label className="ml-2 capitalize text-slate-300">Title</label>
                <TextInput
                  type="text"
                  placeholder="Title"
                  id="title"
                  className="flex-1 focus:ring-0 border-0"
                  onChange={(e) => {
                    dispatch(writeBlog({ ...blog, title: e.target.value }));
                  }}
                  color="gray"
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
                    dispatch(
                      writeBlog({ ...blog, descreption: e.target.value })
                    );
                  }}
                  maxLength="200"
                  defaultValue={blog?.title}
                  onKeyDown={(e) => e.code === "Enter" && e.preventDefault()}
                />
                <p className="text-xs text-right text-slate-300 mt-1 italic mr-1">
                  {200 - blog.descreption?.length || 200} charecters left
                </p>
              </div>
              <div className="mt-3 p-2">
                <TextInput
                  type="text"
                  placeholder="Add your topics"
                  className="relative"
                  onKeyDown={handleTagsKeyDown}
                  disabled={blog.tags.length === 10}
                />
                {blog.tags?.map((tag, index) => (
                  <Tags tag={tag} key={index} />
                ))}
                <p className="text-xs text-right text-slate-300 mt-1 italic mr-1">
                  {10 - blog.tags?.length || 10} Tags left
                </p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <div className="flex flex-row gap-4 justify-center pb-3 dark:bg-slate-900">
          <Button
            onClick={() => setOpenPublish(false)}
            className="focus:ring-0"
            color="dark"
          >
            Publish
          </Button>
          <Button
            color="gray"
            className="focus:ring-0"
            onClick={() => setOpenPublish(false)}
          >
            Draft
          </Button>
        </div>
      </Modal>
    </AnimationWrapper>
  );
}

export default PublishBlog;
