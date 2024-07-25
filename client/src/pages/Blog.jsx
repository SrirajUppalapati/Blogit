import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOneBlog } from "../features/Home/homeSlice";
import { Button, HR } from "flowbite-react";
import { dateTOString } from "../helpers/date";
import AnimationWrapper from "../components/AnimationWrapper";
import SocialLinks from "../features/Home/SocialLinks";
import UserDetails from "../features/Home/UserDetails";
import Content from "../features/Home/Content";
import UserActivity from "../features/Home/UserActivity";
import Spinner from "../components/Spinner";

function Blog() {
  const dispatch = useDispatch();
  const { blog, loading } = useSelector((state) => state.home);
  const { currentUser } = useSelector((state) => state.auth);
  const { blogId } = useParams();

  useEffect(
    function () {
      dispatch(getOneBlog({ blogId }));
    },
    [dispatch, blogId]
  );

  if (loading || !Object.keys(blog).length) {
    return <Spinner />;
  }

  const { title, banner, tags, author, updatedAt, activity, content } = blog;
  return (
    <AnimationWrapper>
      <div className="min-h-screen p-5 md:pt-20 font pt-28">
        <div className="flex items-center flex-col gap-y-4">
          <img
            src={banner}
            alt="banner"
            className="aspect-video md:max-w-[500px] md:max-h-[300px] max-w-[320px] max-h-[240px]"
          />
          <p className="capitalize md:max-w-[60%] text-center text-lg md:text-3xl md:leading-relaxed">
            {title}
          </p>
          <p className="text-xs font-light">{dateTOString(updatedAt)}</p>
          <div className="md:flex capitalize justify-center items-center gap-1 text-[0.75rem] hidden italic">
            Tags:
            <span className="text-[0.75rem]">{tags.join(", ")}</span>
          </div>
        </div>
        <HR className="text-slate-100 md:mx-[20%]" />

        <div className="md:px-[20%] flex flex-row justify-between items-center ">
          <div className="flex flex-row justify-center items-center gap-4 md:gap-10">
            <UserDetails author={author} />
            <UserActivity activity={activity} />
          </div>

          {currentUser?.username === author.username && (
            <Link to="/edit/:blogid">
              <Button color="dark">Edit</Button>
            </Link>
          )}

          <SocialLinks socialLinks={author.socialLinks} />
        </div>
        <HR className="text-slate-100 md:mx-[20%]" />
        <div>
          <div className="p-3 md:px-[10%]">
            {content.blocks.map((curr, index) => {
              return (
                <div key={index} className="my-4 md:my-6">
                  <Content block={curr} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
}
export default Blog;
