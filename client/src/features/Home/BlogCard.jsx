import { Link, useNavigate, useParams } from "react-router-dom";
import { dateTOString } from "../../helpers/date";
import { HR } from "flowbite-react";
import FilterTags from "./FilterTags";
import UserDetails from "./UserDetails";
import UserActivity from "./UserActivity";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";

function BlogCard({ blog }) {
  const {
    activity,
    author,
    blogId,
    description,
    title,
    banner,
    createdAt,
    tags,
  } = blog;

  const { currentUser, loading } = useSelector((state) => state.auth);
  const width = window.innerWidth;
  const navigate = useNavigate();

  const { username } = useParams();
  if (loading) {
    return <Spinner />;
  }

  function handleEdit(e) {
    e.preventDefault();
    navigate(`/write/${blogId}`, { replace: true });
  }

  return (
    <Link to={`/blog/${blogId}`} className="hover:cursor-pointer">
      <div className="w-full px-8 text-slate-500 dark:text-slate-300 grid grid-cols-[80%_20%]">
        <div className="max-w-[80%]">
          {author && <UserDetails author={author} />}
          <div className="dark:text-white text-black">
            <p className="font-bold text-lg md:text-2xl mt-4 leading-tight line-clamp-2 break-words lg:max-w-[90%]">
              {title}
            </p>
          </div>
          <div>
            <p className="mt-4 md:text-[1rem] text-[0.7rem] leading-tight line-clamp-2 break-words lg:max-w-[90%]">
              {description}
            </p>
          </div>
          <div className="mt-4 flex flex-row gap-10 items-center">
            <p className="text-xs font-light">{dateTOString(createdAt)}</p>

            <UserActivity activity={activity} blogid={blogId} />

            {width > 800 && (
              <div className="flex capitalize justify-center items-center gap-3 text-[0.75rem]">
                Tags:
                {tags?.map((curr, index) => (
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
        <div className="flex justify-center items-center pr-6">
          <img
            src={banner}
            alt="banner"
            className="w-[100px] h-[70px] md:w-[200px] md:h-[113px] border-2 rounded-lg dark:border-slate-800"
            loading="lazy"
          />
        </div>
      </div>
      {currentUser?.username === (author?.username || username) && (
        <div
          className={`flex justify-end items-center ${
            currentUser?.username === username && "pr-8"
          } pr-4`}
        >
          <button onClick={handleEdit}>
            <CiEdit className="text-xl hover:text-2xl" />
          </button>
        </div>
      )}
      <HR className="max-w-[90%] md:max-w-[100%]" />
    </Link>
  );
}

export default BlogCard;
