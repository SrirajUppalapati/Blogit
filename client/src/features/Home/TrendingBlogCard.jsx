import { Link } from "react-router-dom";
import { dateTOString } from "../../helpers/date";
import { HR } from "flowbite-react";

function TrendingBlogCard({ blog, id }) {
  const { author, blogId, description, title, updatedAt, createdAt } = blog;
  function handleProfile(e) {
    e.preventDefault();
  }
  return (
    <Link to={`/${blogId}`} className="hover:cursor-pointer">
      <div className="flex flex-row justify-start items-center md:gap-3 lg:gap-10">
        <div className="ml-10 text-4xl sm:text-3xl font-bold md:text-5xl dark:text-slate-700 text-slate-100 leading-none">
          {id < 10 ? `0${id}` : id}
        </div>
        <div className="flex flex-col pl-10">
          <button
            className="w-fit flex justify-start items-center gap-x-2"
            onClick={(e) => handleProfile(e)}
          >
            <img
              src={author.profilePicture}
              alt="author_profile"
              className="w-5 h-5 rounded-full border-2 dark:border-slate-800"
            />
            <p className="capitalize text-[0.65rem] font-medium hover:underline">
              {author.name}
            </p>
            <p className="text-[0.65rem] font-light ml-8">
              {dateTOString(updatedAt) || dateTOString(createdAt)}
            </p>
          </button>
          <div className="dark:text-white text-black">
            <p className="font-bold text-xl mt-4 leading-tight text-pretty break-words line-clamp-2 md:text-lg">
              {title}
            </p>
          </div>
          <div>
            <p className="mt-4 text-[1rem] font-extralight text-pretty md:text-sm break-words line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </div>
      <HR className="mx-10" />
    </Link>
  );
}

export default TrendingBlogCard;
