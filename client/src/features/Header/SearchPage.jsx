import { Link, useLocation, useParams } from "react-router-dom";
import SearchPosts from "./SearchPosts";
import SearchUsers from "./SearchUsers";
import SearchTags from "./SearchTags";

function SearchPage() {
  const { query } = useParams();
  const location = useLocation().pathname;

  return (
    <div className="md:pt-16 pt-28 min-h-screen md:grid md:grid-cols-[75%_auto]">
      <div className="flex flex-col">
        <div className="flex flex-row justify-start items-end md:py-8 mb-2 py-3 pl-[10%] gap-4">
          <p className="text-lg md:text-xl text-slate-500 italic">
            Results for:
          </p>
          <p className="text-3xl md:text-4xl capitalize font-bold">{query}</p>
        </div>
        <div className="pl-6">
          <div className="flex-wrap border-gray-200 dark:border-gray-700 space-x-6 text-sm font-medium text-slate-950 dark:text-gray-400 ">
            <Link
              to={`/search/posts/${query}`}
              className={`${
                location.includes("posts") &&
                "border border-transparent rounded-lg bg-gray-800 text-white  dark:border-slate-500 dark:bg-cyan-600  items-stretch justify-center p-3 text-center font-bold transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none"
              } px-4 `}
            >
              Posts
            </Link>
            <Link
              to={`/search/users/${query}`}
              className={`${
                location.includes("users") &&
                "border border-transparent rounded-lg bg-gray-800 text-white  dark:border-slate-500 dark:bg-cyan-600  items-stretch justify-center p-3 text-center font-bold transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none"
              } px-4`}
            >
              Users
            </Link>
            <Link
              to={`/search/tags/${query}`}
              className={`${
                location.includes("tags") &&
                "border border-transparent rounded-lg bg-gray-800 text-white  dark:border-slate-500 dark:bg-cyan-600  items-stretch justify-center p-3 text-center font-bold transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none"
              } px-4`}
            >
              Tags
            </Link>
          </div>
          <div className="pt-10">
            {location.includes("posts") && <SearchPosts />}
            {location.includes("users") && <SearchUsers />}
            {location.includes("tags") && <SearchTags />}
          </div>
        </div>
      </div>
      <div className="hidden md:block md:border-l md:pl-4 md:dark:border-slate-700 md:border-b-2">
        {!location.includes("posts") && (
          <div>
            <SearchPosts />
          </div>
        )}
        {!location.includes("users") && (
          <div>
            <SearchUsers />
          </div>
        )}
        {!location.includes("tags") && (
          <div>
            <SearchTags />
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
