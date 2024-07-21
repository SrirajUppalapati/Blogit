/* eslint-disable no-useless-escape */
import { TextInput } from "flowbite-react";
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
        console.log(tag.length);
        dispatch(writeBlog({ ...blog, tags: [...blog.tags, tag] }));
      }
      e.target.value = "";
    }
  }
  return (
    <div>
      <div className="mt-3 p-2">
        <TextInput
          type="text"
          placeholder="Add your topics"
          className="relative"
          onKeyDown={handleTagsKeyDown}
          disabled={blog.tags.length === 10}
        />
        {blog.tags?.map((tag, index) => (
          <Tag tag={tag} key={index} />
        ))}
        <p className="text-xs text-right text-slate-300 mt-1 italic mr-1">
          {10 - blog.tags?.length || 10} Tags left
        </p>
      </div>
    </div>
  );
}

export default Tags;
