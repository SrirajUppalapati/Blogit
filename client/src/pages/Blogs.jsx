import AnimationWrapper from "../components/AnimationWrapper";
import AllBlogs from "../features/Home/AllBlogs";
import Filters from "../features/Home/Filters";
import TrendingBlogs from "../features/Home/TrendingBlogs";
import { Tabs } from "flowbite-react";

function Blogs() {
  return (
    <AnimationWrapper>
      <div className="min-h-screen pt-28 md:pt-24 flex flex-row">
        <Tabs
          className="border-b-0 focus:ring-0 focus:border-0 dark:focus:ring-0 dark:focus:border-0"
          variant="underline"
        >
          <Tabs.Item
            active
            title="Home"
            className="flex items-center justify-center p-4 text-sm font-medium first:ml-0 focus:outline-none focus:ring-0   active rounded-t-lg border-b-2 "
          >
            <AllBlogs />
          </Tabs.Item>
          <Tabs.Item title="Trending">
            <Filters />
            <TrendingBlogs />
          </Tabs.Item>
        </Tabs>
      </div>
    </AnimationWrapper>
  );
}

export default Blogs;
