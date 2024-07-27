import { Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Dashboard/themeSlice";
import UserNav from "./UserNav";
import AnonNav from "./AnonNav";
import { FaMoon, FaSun } from "react-icons/fa";
import Search from "./Search";

function Header() {
  const { currentUser } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const location = useLocation().pathname;

  return (
    <>
      <div className={`fixed top-0 left-0 w-full z-50`}>
        <Navbar
          fluid
          className={`${
            theme === "light"
              ? "bg-slate-100 border-b-2"
              : "bg-gray-800 border-b-2"
          } pb-4`}
        >
          <Navbar.Brand as={"div"} className="flex items-center flex-grow">
            <Link
              to="/"
              className="font-extrabold italic md:text-2xl text-3xl lg:text-3xl text-dark dark:text-white"
            >
              blogit
            </Link>
          </Navbar.Brand>

          <Search />
          <div className="flex gap-5 justify-center items-center ml-5">
            <button
              onClick={() => dispatch(toggleTheme(theme))}
              className="text-xl"
            >
              {theme === "dark" ? <FaMoon /> : <FaSun />}
            </button>
            {!location.startsWith("/write") && (
              <Link to="/write" className="hidden md:block">
                <p className="flex justify-center items-center italic gap-[0.3rem] text-sm border-2 px-3 py-2 rounded-2xl bg-slate-800 text-white   enabled:hover:bg-gray-900 dark:border-cyan-600 dark:bg-cyan-600 dark:text-white dark:enabled:hover:border-cyan-700 dark:enabled:hover:bg-cyan-700">
                  {" "}
                  <FaPaperPlane className="text-[0.6rem] hover:text-xs" />
                  Write a blog
                </p>
              </Link>
            )}
            {currentUser ? <UserNav /> : <AnonNav />}
          </div>
        </Navbar>
      </div>
    </>
  );
}

export default Header;
