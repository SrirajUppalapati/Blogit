import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import UserDetails from "../Home/UserDetails";
import { dateTOString } from "../../helpers/date";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentAPI } from "../../api/activityAPI";
import { deleteComments } from "./activitySlice";
import { editBlog } from "../Home/homeSlice";

function CommentCard({ commentData, index }) {
  const { userId, comment, createdAt, authorId } = commentData;
  const { currentUser, token } = useSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { blog } = useSelector((state) => state.home);

  const [limitText, setLimitText] = useState(true);

  function handleDelete() {
    deleteCommentAPI({ id: commentData._id, token }).then(({ data }) => {
      dispatch(deleteComments(index));
      setOpenModal(false);
    });
    let count = blog.activity.totalComments;
    count = count - 1;
    dispatch(
      editBlog({
        ...blog,
        activity: { ...blog.activity, totalComments: count },
      })
    );
  }

  return (
    <div className="flex flex-col gap-y-2 p-4 shadow-lg mb-6">
      <div className="flex justify-between items-center border-b pb-3">
        <div>
          <UserDetails author={userId} />
        </div>
        <p className="text-xs">{dateTOString(createdAt)}</p>
      </div>
      <div>
        {comment.split(" ").length >= 20 ? (
          <p className="text-[0.9rem] leading-tight text-left">
            {limitText
              ? `${comment.split(" ").splice(0, 20).join(" ")}...`
              : comment}
            <button
              onClick={() => setLimitText(!limitText)}
              className="hover:underline hover:underline-offset-2 pl-2 dark:text-cyan-500 text-cyan-600"
            >
              {limitText ? "Show more" : "Show less"}
            </button>
          </p>
        ) : (
          <p className="text-[0.9rem] leading-tight text-left">{comment}</p>
        )}
      </div>
      <div className="text-right">
        {(currentUser?._id === userId._id || currentUser?._id === authorId) && (
          <button onClick={() => setOpenModal(true)}>
            <RiDeleteBin6Fill className="hover:text-red-600" />
          </button>
        )}
      </div>
      <>
        <Modal
          show={openModal}
          size="sm"
          onClose={() => setOpenModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <div className="flex justify-center flex-col items-center gap-4">
                <p className="mb-5 text-[1rem] font-normal text-gray-900 italic">
                  Are you sure you want to delete this comment?
                </p>
              </div>
              <div className="flex justify-between px-6">
                <Button
                  color="gray"
                  onClick={() => setOpenModal(false)}
                  className="p-0"
                >
                  <p className="text-xs">Cancel</p>
                </Button>
                <Button color="failure" onClick={handleDelete} className="p-0">
                  <p className="text-xs">Delete</p>
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
}

export default CommentCard;
