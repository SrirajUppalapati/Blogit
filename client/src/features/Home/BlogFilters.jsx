import { useEffect, useState } from "react";
import { tagsWithMostPostsAPI } from "../../api/blogsAPI";
import { GiLaurelsTrophy } from "react-icons/gi";

import toast from "react-hot-toast";
import FilterTags from "./FilterTags";
import AnimationWrapper from "../../components/AnimationWrapper";

function BlogFilters() {
  const [tags, setTags] = useState([]);

  useEffect(function () {
    tagsWithMostPostsAPI()
      .then((data) => setTags(data))
      .catch((err) => toast.error(err));
  }, []);

  return (
    <AnimationWrapper>
      <div className="flex flex-col pl-3 pt-10">
        <div className="flex justify-start items-center pl-5 pb-4 gap-2">
          <GiLaurelsTrophy />
          <p className="font-bold text-lg italic  capitalize">
            Most written topics
          </p>
        </div>

        <div className="flex flex-wrap max-w-full gap-y-4">
          {tags?.map((curr, index) => (
            <AnimationWrapper key={index}>
              <FilterTags
                tag={curr._id}
                count={curr.count}
                className={
                  "mt-2 mx-2 bg-slate-100  rounded-xl hover:bg-opacity-50 text-slate-500 hover:underline dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-600 hover:bg-slate-50 cursor-pointer border-0 flex justify-center items-center gap-4"
                }
                fontSize="text-xs"
              />
            </AnimationWrapper>
          ))}
        </div>
      </div>
    </AnimationWrapper>
  );
}

export default BlogFilters;
