import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, getBlogs, increasePage } from "./homeSlice";
import { Spinner } from "flowbite-react";
import BlogCard from "./BlogCard";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import AnimationWrapper from "../../components/AnimationWrapper";

function AllBlogs() {
  const dispatch = useDispatch();
  const { blogs, loading, page, filter } = useSelector((state) => state.home);
  const [disable, setDisable] = useState(false);
  const lastBlogRef = useRef(null);

  useEffect(() => {
    dispatch(getBlogs({ page, filter: filter?.tag }))
      .then(({ payload }) => {
        if (payload?.length < 15 || filter?.count <= 15) {
          setDisable(true);
        }
      })
      .catch((err) => toast.error(err));
  }, [page, filter, dispatch]);

  useEffect(() => {
    if (lastBlogRef.current && blogs.length > 15) {
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
    <AnimationWrapper>
      <div className="pb-10 md:pt-20 pt-2">
        {filter && (
          <div className="text-lg pl-8 italic flex flex-row items-center gap-2 pb-2 border-b-[1px] mb-4 dark:border-slate-700">
            <span className=" ">Filter:</span>
            <button
              onClick={() => {
                dispatch(changeFilter());
              }}
            >
              <div className="flex flex-row justify-center items-center gap-1 dark:bg-slate-800 px-2 rounded-lg hover:underline hover:underline-offset-2 bg-slate-100 italic">
                <p className="text-xs py-1">{filter.tag}</p>
                <MdClose className="text-sm pt-1" />
              </div>
            </button>
          </div>
        )}
        {blogs.map((blog, index) => {
          return (
            <AnimationWrapper key={index}>
              <div ref={index === blogs.length - 13 ? lastBlogRef : null}>
                <BlogCard blog={blog} className="border-0" />
              </div>
            </AnimationWrapper>
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
    </AnimationWrapper>
  );
}

export default AllBlogs;
