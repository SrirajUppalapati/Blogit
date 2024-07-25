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
          className={`${theme === "light" ? "bg-gray-50" : "bg-gray-800"} pb-4`}
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
            {location !== "/write" && (
              <Link to="/write" className="hidden md:block">
                <p className="flex justify-center items-center italic gap-[0.3rem] text-sm border-2 p-2 rounded-2xl dark:border-slate-500  hover:dark:bg-slate-500 text-slate-100 hover:bg-slate-700 hover:border-slate-500 bg-slate-900 dark:bg-slate-400 dark:text-slate-800 border-slate-700">
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
