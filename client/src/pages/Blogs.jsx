import AnimationWrapper from "../components/AnimationWrapper";
import { HR, TabItem, Tabs } from "flowbite-react";
import { IoMdHome, IoMdTrendingUp } from "react-icons/io";
import TrendingBlogs from "../features/Home/TrendingBLogs";
import BlogFilters from "../features/Home/BlogFilters";
import React from "react";
import Spinner from "../components/Spinner";
const LazyAllBlogs = React.lazy(() => import("../features/Home/AllBlogs"));

function Blogs() {
  const width = window.innerWidth;

  if (width < 640) {
    return (
      <AnimationWrapper>
        <div className="pt-28">
          <Tabs
            aria-label="Tabs with icons"
            variant="underline"
            className="focus:ring-0"
          >
            <TabItem
              active
              title="Home"
              icon={IoMdHome}
              className="focus:ring-0"
            >
              <React.Suspense fallback={<Spinner />}>
                <LazyAllBlogs />
              </React.Suspense>
            </TabItem>
            <TabItem title="Trending" icon={IoMdTrendingUp} color="gray">
              <div className="overflow-y-auto h-[calc(100vh-10rem)] mini-scrollbar">
                <TrendingBlogs />
              </div>
            </TabItem>
          </Tabs>
        </div>
      </AnimationWrapper>
    );
  }
  return (
    <AnimationWrapper>
      <div className="min-h-screen pt-20">
        <div className="grid grid-cols-[60%_40%] ">
          <div className="pr-4">
            <React.Suspense fallback={<Spinner />}>
              <LazyAllBlogs />
            </React.Suspense>
          </div>
          <div className="relative">
            <div className="fixed right-0 w-[40%] h-[calc(100vh-7rem)] flex flex-col dark:border-slate-600">
              <BlogFilters />
              <HR />
              <div className="md:flex md:flex-row md:justify-start md:items-center md:gap-2 pl-8 hidden pb-5">
                <IoMdTrendingUp />
                <p className="text-2xl italic">Trending Blogs</p>
              </div>
              <div className="overflow-y-auto flex-grow">
                <TrendingBlogs />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
}

export default Blogs;
