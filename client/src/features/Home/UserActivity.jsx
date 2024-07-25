import { useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { LiaComments } from "react-icons/lia";
import { FaEye } from "react-icons/fa";

function UserActivity({ activity }) {
  const [like, setLike] = useState(false);
  function handleLike(e) {
    e.preventDefault();
    setLike(!like);
  }
  function handleComments(e) {
    e.preventDefault();
  }

  return (
    <div className=" flex flex-row gap-5 items-center">
      <button onClick={handleLike} className="border-0 focus:ring-0">
        <div className="text-[0.75rem] flex justify-center items-center gap-2">
          {like ? <BiSolidLike /> : <BiLike />}
          {activity?.total_likes}
        </div>
      </button>
      <button onClick={handleComments}>
        <div className="text-[0.75rem] flex justify-center items-center gap-2">
          <LiaComments />
          {activity?.total_comments}
        </div>
      </button>
      <p className="flex flex-row justify-center items-center gap-2 text-xs font-light">
        <FaEye className="text-xs" />
        {activity.total_reads}
      </p>
    </div>
  );
}

export default UserActivity;
