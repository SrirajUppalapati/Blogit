import { Card } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserDetails from "../Home/UserDetails";
import AnimationWrapper from "../../components/AnimationWrapper";

function SearchPosts() {
  const { postsResult } = useSelector((state) => state.search);

  return (
    <AnimationWrapper>
      <div className="grid grid-cols-2 gap-y-8 gap-x-8 px-4 md:grid-cols-4">
        {postsResult?.data?.map((curr, index) => (
          <AnimationWrapper key={index}>
            <div className="flex">
              <Card className="max-w-sm w-full">
                <UserDetails
                  author={curr.author}
                  text="text-[0.55rem] line-clamp-1 md:text-xs"
                />
                <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white line-clamp-4 md:text-xl">
                  {curr.title}
                </h5>
                <p className="font-normal text-xs text-gray-400 dark:text-gray-400 line-clamp-2 md:text-sm">
                  {curr.description}
                </p>
                <div>
                  <Link
                    to={`/blog/${curr.blogId}`}
                    className="bg-gray-800 text-white p-0.5 flex items-center justify-center rounded-lg hover:underline hover:underline-offset-4 dark:bg-cyan-600"
                  >
                    <p className="text-xs py-1 md:text-sm">Read more</p>
                  </Link>
                </div>
              </Card>
            </div>
          </AnimationWrapper>
        ))}
      </div>
    </AnimationWrapper>
  );
}

export default SearchPosts;
