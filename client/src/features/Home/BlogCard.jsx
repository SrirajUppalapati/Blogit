import { Link } from "react-router-dom";
import { dateTOString } from "../../helpers/date";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { LiaComments } from "react-icons/lia";
import { HR } from "flowbite-react";
import { useState } from "react";
import FilterTags from "./FilterTags";

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

  const [like, setLike] = useState(false);

  function handleLike(e) {
    e.preventDefault();
    setLike(!like);
  }

  function handleProfile(e) {
    e.preventDefault();
  }

  function handleComments(e) {
    e.preventDefault();
  }
  return (
    <Link to={`/${blogId}`} className="hover:cursor-pointer">
      <div className="w-full pl-8 text-slate-500 dark:text-slate-300 flex flex-row justify-between items-center pr-10 gap-10">
        <div>
          <button
            className="w-fit flex justify-between items-center gap-2"
            onClick={handleProfile}
          >
            <img
              src={author.profilePicture}
              alt="author_profile"
              className="w-5 h-5 rounded-full border-2 dark:border-slate-800"
            />
            <p className="capitalize text-[0.85rem] font-medium hover:underline">
              {author.name}
            </p>
          </button>
          <div className="dark:text-white text-black">
            <p className="font-bold text-2xl mt-4 leading-tight line-clamp-2 break-words">
              {title}
            </p>
          </div>
          <div>
            <p className="mt-4 text-[1rem] line-clamp-2 break-words">
              {description}
            </p>
          </div>
          <div className="mt-4 flex flex-row gap-10 items-center">
            <p className="text-xs font-light">
              {dateTOString(updatedAt) || dateTOString(createdAt)}
            </p>
            <button onClick={handleLike}>
              <div className="text-[0.75rem] flex justify-center items-center gap-2">
                {like ? <BiSolidLike /> : <BiLike />}
                {activity.total_likes}
              </div>
            </button>
            <button onClick={(e) => handleComments(e)}>
              <div className="text-[0.75rem] flex justify-center items-center gap-2">
                <LiaComments />
                {activity.total_comments}
              </div>
            </button>
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
