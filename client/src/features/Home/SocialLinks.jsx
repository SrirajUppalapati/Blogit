import { FaTwitter, FaYoutube } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { IoIosLink } from "react-icons/io";

function SocialLinks({ socialLinks, gap }) {
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  console.log(!gap);
  return (
    <div className={`flex ${gap} pl-4 md:pl-0`}>
      {socialLinks?.youtube && (
        <button onClick={() => openInNewTab(socialLinks?.youtube)}>
          {
            <FaYoutube
              className={`${!gap ? "text-sm md:text-xl" : "text-xl"}`}
            />
          }
        </button>
      )}
      {socialLinks?.twitter && (
        <button onClick={() => openInNewTab(socialLinks?.twitter)}>
          {
            <FaTwitter
              className={`${!gap ? "text-sm md:text-xl" : "text-xl"}`}
            />
          }
        </button>
      )}
      {socialLinks?.github && (
        <button onClick={() => openInNewTab(socialLinks?.github)}>
          {
            <FaGithub
              className={`${!gap ? "text-sm md:text-xl" : "text-xl"}`}
            />
          }
        </button>
      )}
      {socialLinks?.website && (
        <button onClick={() => openInNewTab(socialLinks?.website)}>
          {
            <IoIosLink
              className={`${!gap ? "text-sm md:text-xl" : "text-xl"}`}
            />
          }
        </button>
      )}{" "}
    </div>
  );
}

export default SocialLinks;
