import { Sidebar } from "flowbite-react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { getAllComments } from "./activitySlice";
import CreateComment from "./CreateComment";
import CommentCard from "./CommentCard";
import AnimationWrapper from "../../components/AnimationWrapper";

function CommentsSideBar({ show, setShow }) {
  const { currentUser } = useSelector((state) => state.auth);
  const { loading, comments } = useSelector((state) => state.activity);
  const { blog } = useSelector((state) => state.home);

  const dispatch = useDispatch();
  const sidebarRef = useRef();

  useEffect(() => {
    function handler(e) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setShow(!show);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setShow, show]);

  useEffect(() => {
    dispatch(getAllComments({ blogId: blog._id }));
  }, [dispatch, blog._id]);

  if (loading) {
    return;
  }

  return (
    <div ref={sidebarRef}>
      <Sidebar className="fixed top-0 duration-700 right-0 pt-[4.2rem] min-h-screen w-[100%] md:w-[30%] overflow-y-auto">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <div className="flex justify-end">
              <button onClick={() => setShow(!show)}>
                <IoMdClose className="text-2xl" />
              </button>
            </div>
            <Sidebar.Item
              className="mt-5 border-b dark:border-slate-700 px-3 border-slate-200 hover:bg-inherit dark:hover:bg-inherit"
              label={`Results: ${comments.length}`}
              labelColor="gray"
            >
              <p className="text-xl ">Comments</p>
            </Sidebar.Item>
            <div className="pt-2">
              {currentUser && <CreateComment blog={blog} action="comment" />}
            </div>
            <div className="px-3 pt-8">
              {comments?.map((curr, index) => (
                <AnimationWrapper key={index}>
                  <CommentCard commentData={curr} index={index} />
                </AnimationWrapper>
              ))}
            </div>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}

export default CommentsSideBar;
