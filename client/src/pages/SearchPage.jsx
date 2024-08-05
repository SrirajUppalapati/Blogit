import { Tabs } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
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
import AnimationWrapper from "../components/AnimationWrapper";
import toast from "react-hot-toast";

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

  useEffect(() => {
    if (query.length >= 3) {
      dispatch(searchTag({ query }));
      dispatch(searchTitle({ query }));
      dispatch(searchUser({ query }));
    }
  }, [dispatch, query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        navigate(-1);
      }
    };

    document.addEventListener("keydown", handleKeyDown, false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [navigate]);

  useEffect(() => {
    if (
      postsResult.results === 0 &&
      tagsResult.length === 0 &&
      usersResult.data?.length === 0
    ) {
      // toast.error(`No search results for ${query}`);
      navigate(-1);
    }
  }, [postsResult, tagsResult, usersResult, query, navigate]);

  if (tagsLoading || postsLoading || usersLoading) {
    return <Spinner />;
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
