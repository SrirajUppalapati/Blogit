import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingBlogs } from "./homeSlice";
import AnimationWrapper from "../../components/AnimationWrapper";
import TrendingBlogCard from "./TrendingBlogCard";
import Spinner from "../../components/Spinner";

function TrendingBlogs() {
  const dispatch = useDispatch();
  const { trendingBlogs, trendingLoading } = useSelector((state) => state.home);
  useEffect(
    function () {
      dispatch(getTrendingBlogs());
    },
    [dispatch]
  );

  if (trendingLoading) {
    return <Spinner />;
  }

  return (
    <AnimationWrapper>
      <div className="flex flex-col gap-4 pt-5 pr-5">
        {trendingBlogs.map((curr, index) => (
          <AnimationWrapper key={index}>
            <TrendingBlogCard blog={curr} id={index + 1} />
          </AnimationWrapper>
        ))}
      </div>
    </AnimationWrapper>
  );
}

export default TrendingBlogs;
