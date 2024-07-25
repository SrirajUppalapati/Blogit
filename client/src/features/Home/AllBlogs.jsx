import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, increasePage } from "./homeSlice";
import { Spinner } from "flowbite-react";
import BlogCard from "./BlogCard";
import toast from "react-hot-toast";

function AllBlogs() {
  const dispatch = useDispatch();
  const { blogs, loading, page, filter } = useSelector((state) => state.home);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    dispatch(getBlogs({ page, filter: filter?.tag }))
      .then(({ payload }) => {
        if (payload?.length < 7 || filter?.count <= 7) {
          setDisable(true);
        }
      })
      .catch((err) => toast.error(err));
  }, [page, dispatch, filter]);

  function handlePage(e) {
    e.preventDefault();
    dispatch(increasePage());
  }
  if (loading) {
    return (
      <div className="flex justify-center items-center pt-[40%]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="pb-10 md:pt-20 pt-2">
      {blogs.map((blog, index) => (
        <BlogCard blog={blog} key={index} className="border-0" />
      ))}
      {disable && (
        <button
          onClick={(e) => handlePage(e)}
          className={`${!disable && "hidden"} pl-10 hover:underline `}
          disabled={disable}
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default AllBlogs;
