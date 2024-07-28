import { Tabs } from "flowbite-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SearchPosts from "../features/Header/SearchPosts";
import SearchUsers from "../features/Header/SearchUsers";
import SearchTags from "../features/Header/SearchTags";
import { useEffect } from "react";
import {
  searchTag,
  searchTitle,
  searchUser,
} from "../features/Header/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { LuUsers } from "react-icons/lu";
import { AiOutlineTags } from "react-icons/ai";
import { SiPostman } from "react-icons/si";
import DatNotFound from "../api/DatNotFound";
import AnimationWrapper from "../components/AnimationWrapper";

function SearchPage() {
  const { query } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    tagsLoading,
    postsLoading,
    usersLoading,
    postsResult,
    usersResult,
    tagsResult,
  } = useSelector((state) => state.search);

  useEffect(
    function () {
      if (query.length >= 3) {
        dispatch(searchTag({ query }));
      }
    },
    [dispatch, query]
  );

  useEffect(
    function () {
      if (query.length >= 3) {
        dispatch(searchTitle({ query }));
      }
    },
    [dispatch, query]
  );

  useEffect(
    function () {
      if (query.length >= 3) {
        dispatch(searchUser({ query }));
      }
    },
    [dispatch, query]
  );

  useEffect(
    function () {
      document.addEventListener(
        "keydown",
        (e) => {
          if (e.code === "Escape") {
            navigate("/");
          }
        },
        false
      );
      return document.removeEventListener(
        "keydown",
        (e) => {
          if (e.code === "Escape") {
            navigate("/");
          }
        },
        false
      );
    },
    [navigate]
  );

  if (tagsLoading || postsLoading || usersLoading) {
    return <Spinner />;
  }

  console.log(postsResult, tagsResult, usersResult);
  if (
    postsResult.results === 0 &&
    tagsResult.length === 0 &&
    usersResult.data?.length === 0
  ) {
    const type = "Posts, Users or Tags";
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-20">
        <DatNotFound query={query} type={type} />
        <Link
          to="/"
          className="text-lg hover:underline underline-offset-8 dark:hover:text-slate-400 hover:text-slate-500"
        >
          Go back to all blogs
        </Link>
      </div>
    );
  }

  return (
    <AnimationWrapper>
      <div className="md:pt-16 pt-28 min-h-screen">
        <div className="flex flex-row justify-start items-end md:py-8 mb-2 py-3 pl-[10%] gap-4">
          <p className="text-lg md:text-xl text-slate-500 italic">
            Results for:
          </p>
          <p className="text-3xl md:text-4xl capitalize font-bold">{query}</p>
        </div>
        <Tabs aria-label="Default tabs" variant="default">
          {postsResult.results !== 0 && (
            <Tabs.Item active title="Posts" icon={SiPostman}>
              {" "}
              <SearchPosts />
            </Tabs.Item>
          )}
          {tagsResult.length !== 0 && (
            <Tabs.Item title="Tags" icon={AiOutlineTags}>
              <SearchTags />
            </Tabs.Item>
          )}
          {usersResult.data?.length !== 0 && (
            <Tabs.Item title="Users" icon={LuUsers}>
              <SearchUsers />
            </Tabs.Item>
          )}
        </Tabs>
      </div>
    </AnimationWrapper>
  );
}

export default SearchPage;
