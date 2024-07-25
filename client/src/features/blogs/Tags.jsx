/* eslint-disable no-useless-escape */
import { useDispatch, useSelector } from "react-redux";
import { writeBlog } from "./blogSlice";
import Tag from "./Tag";

function Tags() {
  const dispatch = useDispatch();
  const { blog } = useSelector((state) => state.blog);

  function handleTagsKeyDown(e) {
    let tag = e.target.value;
    tag = tag.replace(/[^a-zA-Z \-]/g, "");
    tag = tag.replace(/[^a-zA-Z \-]/g, "");
    tag = tag.replace(/\s+/g, " ");
    tag = tag.replace(/-+$/, "").trim();

    if (e.code === "Enter" || e.code === "Comma") {
      e.preventDefault();
      if (!blog?.tags?.includes(tag) && tag.length !== 0) {
        dispatch(writeBlog({ ...blog, tags: [...blog.tags, tag] }));
      }
      e.target.value = "";
    }
  }
  return (
    <div>
      <div className="mt-3">
        <label className="ml-2 capitalize text-slate-300">Tags</label>

        <input
          type="text"
          className="relative focus:ring-0 border-0 bg-slate-50 dark:bg-gray-700 rounded-md dark:text-slate-50 w-full text-sm p-3"
          color="gray"
          onKeyDown={handleTagsKeyDown}
          disabled={blog.tags.length === 5}
        />
        {blog.tags?.map((tag, index) => (
          <Tag tag={tag} key={index} />
        ))}
        <p className="text-xs text-right text-slate-300 mt-1 italic mr-1">
          {5 - blog.tags?.length || 5} Tags left
        </p>
      </div>
    </div>
  );
}

export default Tags;
