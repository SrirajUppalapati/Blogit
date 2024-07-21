import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { writeBlog } from "./blogSlice";

function Tag({ tag }) {
  const dispatch = useDispatch();
  const { blog } = useSelector((state) => state.blog);

  function handleRemoveTag(e) {
    e.preventDefault();
    const tagText = e.currentTarget.parentElement.firstChild.innerText;
    const updatedTags = blog.tags.filter((tag) => tag !== tagText);
    dispatch(writeBlog({ tags: updatedTags }));
  }

  return (
    <div className=" mt-2 mx-2 bg-gray-200 inline-block px-2 py-1 rounded-xl hover:bg-opacity-50 hover:cursor-pointer">
      <div className="flex justify-center items-center">
        <p className="text-sm">{tag}</p>
        <button onClick={handleRemoveTag}>
          <IoIosClose className="text-lg" />
        </button>
      </div>
    </div>
  );
}

export default Tag;
