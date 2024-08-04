import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { GoRead } from "react-icons/go";
import { MdOutlineMarkunread } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { markReadAPI } from "../../api/notificationAPI";
import { updateNotification } from "./dashSlice";

function NotificationCard({ notification, index }) {
  const { token } = useSelector((state) => state.auth);
  const {
    comment,
    userId: { username },
    type,
    seen,
    blogId: { title, blogId },
    _id,
  } = notification;
  const dispatch = useDispatch();

  function handleRead() {
    markReadAPI({ token, id: _id });
    dispatch(updateNotification(index));
  }

  return (
    <Card className="my-5">
      <div className="flex flex-row gap-3 justify-start items-center">
        <button
          className="px-2 disabled:cursor-not-allowed"
          onClick={handleRead}
          disabled={seen}
        >
          {!seen ? <GoRead /> : <MdOutlineMarkunread />}
        </button>
        <div className="border-l pl-4 dark:border-slate-600 border-slate-100 flex flex-col gap-4">
          <div>
            {type === "comment" ? (
              <>
                <p>
                  <span>
                    <Link
                      to={`/profile/${username}`}
                      className="hover:underline hover:underline-offset-2 text-sm dark:bg-slate-600 bg-slate-200 p-1 px-2 rounded-full"
                    >
                      @{username}
                    </Link>
                  </span>
                  {"  "}
                  <span className="italic text-sm">commented on: </span>
                </p>{" "}
                <Link
                  to={`/blog/${blogId}`}
                  className="text-sm capitalize line-clamp-1 mt-4 italic dark:bg-blue-400 bg-blue-300 rounded-full hover:underline hover:underline-offset-2 w-fit px-2"
                >
                  {title}
                </Link>
                <div className="line-clamp-3 text-xs pt-4">{comment}</div>
              </>
            ) : (
              <>
                <p>
                  <span>
                    <Link
                      to={`/profile/${username}`}
                      className="hover:underline hover:underline-offset-2 text-sm dark:bg-slate-600 bg-slate-200 p-1 px-2 rounded-full"
                    >
                      @{username}
                    </Link>
                  </span>
                  {"  "}
                  <span className="italic text-sm pl-4">Liked your blog. </span>
                </p>{" "}
                <Link
                  to={`/blog/${blogId}`}
                  className="text-sm capitalize line-clamp-1 mt-4 italic dark:bg-blue-400 bg-blue-300 rounded-full hover:underline hover:underline-offset-2 w-fit px-2"
                >
                  {title}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
export default NotificationCard;
