import { FaTwitter, FaYoutube } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { IoIosLink } from "react-icons/io";

function SocialLinks({ socialLinks }) {
  return (
    <div className="flex gap-3">
      {socialLinks?.youtube && (
        <a href={socialLinks?.youtube} className="hidden md:block">
          {<FaYoutube className="md:text-xl text-lg" />}
        </a>
      )}
      {socialLinks?.twitter && (
        <a href={socialLinks?.twitter} className="hidden md:block">
          {<FaTwitter className="text-xl" />}
        </a>
      )}
      {socialLinks?.github && (
        <a href={socialLinks?.github}>{<FaGithub className="text-xl" />}</a>
      )}
      {socialLinks?.website && (
        <a href={socialLinks?.website}>{<IoIosLink className="text-xl" />}</a>
      )}
    </div>
  );
}

export default SocialLinks;
