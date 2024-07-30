import UserDetails from "../Home/UserDetails";
import { dateTOString } from "../../helpers/date";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";

function CommentCard({ commentData }) {
  const { userId, comment, createdAt } = commentData;
  const { currentUser } = useSelector((state) => state.auth);

  function handleDelete() {}

  return (
    <div className="flex flex-col gap-y-2 p-4 shadow-lg mb-6">
      <div className="flex justify-between items-center border-b pb-3">
        <div>
          <UserDetails author={userId} />
        </div>
        <p className="text-xs">{dateTOString(createdAt)}</p>
      </div>
      <div>
        <p>{comment}</p>
      </div>
      <div className="flex justify-between items-center">
        {currentUser?._id === userId._id && (
          <button onClick={handleDelete}>
            <MdDeleteOutline />
          </button>
        )}
      </div>
    </div>
  );
}

export default CommentCard;
