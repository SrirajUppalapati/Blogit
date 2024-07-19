import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { clearBlog } from "../features/blogs/blogSlice";

function Applayout() {
  const location = useLocation().pathname;
  const previousLocation = useRef();
  const dispatch = useDispatch();

  if (location === "/write") {
    previousLocation.current = location;
  }
  if (previousLocation.current === "/write") {
    dispatch(clearBlog());
  }

  return (
    <div className="min-h-screen h-full">
      <Outlet />
    </div>
  );
}

export default Applayout;
