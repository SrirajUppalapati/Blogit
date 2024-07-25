import { Link } from "react-router-dom";
import { dateTOString } from "../../helpers/date";
import { HR } from "flowbite-react";
import FilterTags from "./FilterTags";
import UserDetails from "./UserDetails";
import UserActivity from "./UserActivity";

function BlogCard({ blog }) {
  const {
    activity,
    author,
    blogId,
    description,
    title,
    updatedAt,
    banner,
    createdAt,
    tags,
  } = blog;

  const width = window.innerWidth;

  return (
    <Link to={`blog/${blogId}`} className="hover:cursor-pointer">
      <div className="w-full pl-8 text-slate-500 dark:text-slate-300 flex flex-row justify-between items-center pr-10 gap-10">
        <div>
          <UserDetails author={author} />
          <div className="dark:text-white text-black">
            <p className="font-bold text-2xl mt-4 leading-tight line-clamp-2 break-words lg:max-w-[90%]">
              {title}
            </p>
          </div>
          <div>
            <p className="mt-4 text-[1rem] line-clamp-2 break-words lg:max-w-[90%]">
              {description}
            </p>
          </div>
          <div className="mt-4 flex flex-row gap-10 items-center">
            <p className="text-xs font-light">
              {dateTOString(updatedAt) || dateTOString(createdAt)}
            </p>

            <UserActivity activity={activity} />

            {width > 450 && (
              <div className="flex capitalize justify-center items-center gap-3 text-[0.75rem]">
                Tags:
                {tags.map((curr, index) => (
                  <FilterTags
                    tag={curr}
                    key={index}
                    className="border-0 py-[0.1rem] max-w-fit px-[0.4rem] bg-slate-100 m-[0.1rem] rounded-xl hover:underline dark:bg-slate-800"
                    fontSize="text-[0.6rem]"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-start items-center">
          <img
            src={banner}
            alt="banner"
            className="aspect-video max-h-[100px] border-2 rounded-lg dark:border-slate-800"
          />
        </div>
      </div>
      <HR className="max-w-[90%] md:max-w-[70%] lg:max-w-[100%]" />
    </Link>
  );
}

export default BlogCard;
