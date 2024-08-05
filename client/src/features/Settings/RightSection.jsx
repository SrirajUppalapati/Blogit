import { TextInput } from "flowbite-react";
import {
  FaGithubSquare,
  FaTwitterSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
import { PiLinkSimpleBreakFill } from "react-icons/pi";
import { useSelector } from "react-redux";

function RightSection({ errors, register }) {
  const { user } = useSelector((state) => state.setting);

  return (
    <section className="grid grid-rows-[auto_auto_auto_auto] gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-x-3 min-w-[300px] flex-row">
          <FaTwitterSquare className="input-icon" />
          <TextInput
            name="twitter"
            type="text"
            defaultValue={user.socialLinks.twitter}
            className="w-full"
            placeholder="Please enter your twitter url"
            id="twitter"
            color="gray"
            {...register("socialLinks.twitter", {
              pattern: {
                value:
                  /\b(?:https?|ftp):\/\/(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?\b/,
                message: "Please use a url format.",
              },
            })}
          />
        </div>
        {errors?.socialLinks?.twitter && (
          <span className="ml-8 text-red-600 font-bold text-xs">
            {errors?.socialLinks?.twitter?.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-x-3 min-w-[300px]">
          <FaYoutubeSquare className="input-icon" />
          <TextInput
            name="youtube"
            type="text"
            defaultValue={user.socialLinks.youtube}
            className="w-full"
            placeholder="Please enter your youtube url"
            id="youtube"
            color="gray"
            {...register("socialLinks.youtube", {
              pattern: {
                value:
                  /\b(?:https?|ftp):\/\/(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?\b/,
                message: "Please use a url format.",
              },
            })}
          />
        </div>
        {errors?.socialLinks?.youtube && (
          <span className="ml-8 text-red-600 font-bold text-xs">
            {errors?.socialLinks?.youtube?.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-x-3 min-w-[300px]">
          <FaGithubSquare className="input-icon" />
          <TextInput
            name="github"
            type="text"
            defaultValue={user.socialLinks.github}
            className="w-full"
            placeholder="Please enter your github url"
            id="github"
            color="gray"
            {...register("socialLinks.github", {
              pattern: {
                value:
                  /\b(?:https?|ftp):\/\/(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?\b/,
                message: "Please use a url format.",
              },
            })}
          />
        </div>
        {errors?.socialLinks?.github && (
          <span className="ml-8 text-red-600 font-bold text-xs">
            {errors?.socialLinks?.github?.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-x-3 min-w-[300px]">
          <PiLinkSimpleBreakFill className="input-icon" />
          <TextInput
            name="website"
            type="text"
            defaultValue={user.socialLinks.website}
            className="w-full"
            placeholder="Please enter your website url"
            id="website"
            color="gray"
            {...register("socialLinks.website", {
              pattern: {
                value:
                  /\b(?:https?|ftp):\/\/(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?\b/,
                message: "Please use a url format.",
              },
            })}
          />
        </div>
        {errors?.socialLinks?.website && (
          <span className="ml-8 text-red-600 font-bold text-xs">
            {errors?.socialLinks?.website?.message}
          </span>
        )}
      </div>
    </section>
  );
}

export default RightSection;
