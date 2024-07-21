import { Button, Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
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
            theme === "light" ? "bg-slate-100" : "bg-gray-800"
          } pb-4 border-b-slate-300 border-b-2`}
        >
          <Navbar.Brand as={"div"} className="flex items-center flex-grow">
            <Link
              to="/"
              className="font-extrabold italic md:text-2xl text-3xl lg:text-2xl text-dark dark:text-white"
            >
              blogit
            </Link>
          </Navbar.Brand>

          <Search />
          <div className="flex gap-5 items-center ml-5">
            <button
              onClick={() => dispatch(toggleTheme(theme))}
              className="text-xl"
            >
              {theme === "dark" ? <FaMoon /> : <FaSun />}
            </button>
            {location !== "/write" && (
              <Link
                to="/write"
                className="flex justify-center items-center gap-x-1 text-sm p-0"
              >
                <Button
                  className="focus:ring-0"
                  color={theme === "light" ? "dark" : "cyan"}
                  size="sm"
                >
                  <div className="flex justify-center items-center gap-2 text-sm">
                    <FaPlus className="text-sm" />
                    Write a blog
                  </div>
                </Button>
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
