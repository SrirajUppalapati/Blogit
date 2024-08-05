import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOneBlog } from "../features/Home/homeSlice";
import { Button, HR } from "flowbite-react";
import { dateTOString } from "../helpers/date";
import AnimationWrapper from "../components/AnimationWrapper";
import SocialLinks from "../features/Home/SocialLinks";
import UserDetails from "../features/Home/UserDetails";
import Content from "../features/Home/Content";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import LikeBlog from "../features/Activity/LikeBlog";
import CommentBlog from "../features/Activity/CommentBlog";

function Blog() {
  const dispatch = useDispatch();
  const { blog, oneBlogLoading } = useSelector((state) => state.home);
  const { currentUser } = useSelector((state) => state.auth);
  const { blogId } = useParams();

  const navigate = useNavigate();
  useEffect(
    function () {
      dispatch(getOneBlog({ blogId })).then((data) => {
        if (!data.payload) {
          // toast.error(data.error.message);
          navigate(-1);
        }
      });
    },
    [dispatch, blogId, navigate]
  );

  if (oneBlogLoading || !Object.keys(blog).length) {
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
            <div className=" flex flex-row md:gap-5 items-center gap-2">
              <div>
                <LikeBlog />
              </div>
              <div>
                <CommentBlog />
              </div>
              <p className="flex flex-row justify-center items-center gap-2 text-xs font-light">
                <FaEye className="text-xs" />
                {activity?.totalReads}
              </p>
            </div>{" "}
          </div>

          {author?.socialLinks && (
            <SocialLinks socialLinks={author.socialLinks} gap="gap-x-2" />
          )}
        </div>
        <HR className="text-slate-100 md:mx-[20%]" />
        {currentUser?.username === author?.username && (
          <div className="flex items-center justify-center">
            <Link to={`/write/${blogId}`}>
              <Button color="dark" className="px-1 py-1">
                Edit
              </Button>
            </Link>
          </div>
        )}
        <div>
          <div className="p-3 md:px-[10%]">
            {content[0].blocks.map((curr, index) => {
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
