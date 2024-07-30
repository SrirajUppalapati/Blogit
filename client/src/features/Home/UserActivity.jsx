import { BiLike } from "react-icons/bi";
import { LiaComments } from "react-icons/lia";
import { FaEye } from "react-icons/fa";

function UserActivity({ activity }) {
  return (
    <div className=" flex flex-row md:gap-5 items-center gap-2">
      <p className="text-[0.75rem] flex justify-center items-center gap-2">
        <BiLike />
        {activity?.totalLikes}
      </p>
      <p className="text-[0.75rem] flex justify-center items-center gap-2">
        <LiaComments />
        {activity?.totalComments}
      </p>
      <p className="flex flex-row justify-center items-center gap-2 text-xs font-light">
        <FaEye className="text-xs" />
        {activity?.totalReads}
      </p>
    </div>
  );
}

export default UserActivity;
