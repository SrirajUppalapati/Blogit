import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingBlogs } from "./homeSlice";
import AnimationWrapper from "../../components/AnimationWrapper";
import TrendingBlogCard from "./TrendingBlogCard";

function TrendingBlogs() {
  const dispatch = useDispatch();
  const { trendingBlogs } = useSelector((state) => state.home);
  useEffect(
    function () {
      dispatch(getTrendingBlogs());
    },
    [dispatch]
  );

  return (
    <div className="flex flex-col gap-4 pt-5">
      {trendingBlogs.map((curr, index) => (
        <AnimationWrapper key={index}>
          <TrendingBlogCard blog={curr} id={index + 1} />
        </AnimationWrapper>
      ))}
    </div>
  );
}

export default TrendingBlogs;
