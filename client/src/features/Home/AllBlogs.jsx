import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, increasePage } from "./homeSlice";
import { Spinner } from "flowbite-react";
import BlogCard from "./BlogCard";
import toast from "react-hot-toast";

function AllBlogs() {
  const dispatch = useDispatch();
  const { blogs, loading, page, filter } = useSelector((state) => state.home);
  const [disable, setDisable] = useState(false);
  const lastBlogRef = useRef(null);

  useEffect(() => {
    dispatch(getBlogs({ page, filter: filter?.tag }))
      .then(({ payload }) => {
        if (payload?.length < 7 || filter?.count <= 7) {
          setDisable(true);
        }
      })
      .catch((err) => toast.error(err));
  }, [page, filter, dispatch]);

  useEffect(() => {
    if (lastBlogRef.current) {
      lastBlogRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [blogs]);

  const handlePage = (e) => {
    e.preventDefault();
    dispatch(increasePage());
  };

  return (
    <div className="pb-10 md:pt-20 pt-2">
      {blogs.map((blog, index) => {
        return (
          <div
            key={index}
            ref={index === blogs.length - 5 ? lastBlogRef : null}
          >
            <BlogCard blog={blog} className="border-0" />
          </div>
        );
      })}
      <button
        onClick={handlePage}
        className={`${disable && "hidden"} pl-10 hover:underline`}
        disabled={loading}
      >
        {loading ? <Spinner color="gray" /> : "Load more"}
      </button>
    </div>
  );
}

export default AllBlogs;
