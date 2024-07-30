import { Sidebar } from "flowbite-react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllComments } from "./activitySlice";
import CreateComment from "./CreateComment";
import CommentCard from "./CommentCard";

function CommentsSideBar({ show, setShow }) {
  const { currentUser } = useSelector((state) => state.auth);
  const { loading, comments } = useSelector((state) => state.activity);
  const { blog } = useSelector((state) => state.home);

  const dispatch = useDispatch();

  useEffect(
    function () {
      dispatch(getAllComments({ blogId: blog._id }));
    },
    [dispatch, blog]
  );

  if (loading) {
    return;
  }

  return (
    <div>
      <Sidebar className="fixed top-0 duration-700 right-0 pt-[4.2rem] min-h-screen w-[100%] md:w-[30%] overflow-y-auto">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <div className="flex justify-end">
              <button onClick={() => setShow(!show)}>
                <IoMdClose className="text-2xl" />
              </button>
            </div>
            <Sidebar.Item
              className="mt-5 border-b dark:border-slate-700 px-3 border-slate-200"
              label={`Results: ${comments.length}`}
              labelColor="gray"
            >
              <p className="text-xl ">Comments</p>
            </Sidebar.Item>
            <div className="pt-2">
              {currentUser && <CreateComment blog={blog} action="comment" />}
            </div>
            <div className="px-3 pt-8">
              {comments.data?.map((curr, index) => (
                <CommentCard commentData={curr} key={index} index={index} />
              ))}
            </div>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}

export default CommentsSideBar;
