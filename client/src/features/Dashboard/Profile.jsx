import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserProfile } from "./dashSlice";
import Spinner from "../../components/Spinner";
import BlogCard from "../Home/BlogCard";
import SocialLinks from "../Home/SocialLinks";
import AnimationWrapper from "../../components/AnimationWrapper";
import toast from "react-hot-toast";

function Profile() {
  const dispatch = useDispatch();
  const { userProfile, loading } = useSelector((state) => state.dash);
  const { username } = useParams();

  const navigate = useNavigate();
  useEffect(
    function () {
      dispatch(getUserProfile({ username })).then((data) => {
        if (data.error) {
          toast.error(data.error.message);
          navigate(-1);
        }
      });
    },
    [dispatch, username, navigate]
  );

  if (loading || !userProfile?.length) {
    return <Spinner />;
  }

  const { accountInfo, bio, blogs, email, name, profilePicture, socialLinks } =
    userProfile[0];

  return (
    <AnimationWrapper>
      <div className="min-h-screen pt-28 md:pt-16 md:grid md:grid-cols-[1fr_auto] flex flex-col-reverse">
        <div>
          <div className="sticky md:top-[5%] rounded-lg border-b-2 border-slate- pl-8 py-7 text-center font-bold bg-slate-100 pt-10 mb-10 dark:bg-slate-800 border-slate-300 italic md:block hidden">
            <p className="text-4xl uppercase">{name}</p>
            <p className="text-xs">@{username}</p>
          </div>
          {blogs?.map((curr, index) => (
            <AnimationWrapper key={index}>
              <div className="mb-4">
                <BlogCard blog={curr} />
              </div>
            </AnimationWrapper>
          ))}
        </div>
        <div className="md:sticky md:top-[5%] md:w-80 md:max-h-screen md:border-l md:border-slate-200 md:dark:border-slate-700 md:bg-slate-100 md:dark:bg-slate-800 p-6 space-y-6 md:pt-20 pb-10">
          <div className="flex flex-col items-center">
            <img
              src={profilePicture}
              alt="profile"
              className="aspect-square w-32 h-32 rounded-full border-4 border-slate-200 dark:border-slate-700"
            />
            <p className="mt-8 text-xl font-semibold text-slate-900 dark:text-slate-100 capitalize">
              {name}
            </p>
            <a
              href={`mailto:${email}`}
              className="text-blue-500 hover:underline dark:text-blue-400 text-sm mb-7"
            >
              {email}
            </a>
            <p className="mt-2 text-slate-600 dark:text-slate-400 italic text-center">
              {bio}
            </p>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
            <div className="flex justify-between mb-2">
              <p className="font-medium text-slate-700 dark:text-slate-300">
                Blogs:
              </p>
              <p className="font-semibold text-slate-900 dark:text-slate-100">
                {accountInfo.totalPosts}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium text-slate-700 dark:text-slate-300">
                Reads:
              </p>
              <p className="font-semibold text-slate-900 dark:text-gray-100">
                {accountInfo.totalReads}
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center pt-10">
            <SocialLinks socialLinks={socialLinks} gap="gap-x-8" />
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
}

export default Profile;
