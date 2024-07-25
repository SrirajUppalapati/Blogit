import { Button, Dropdown } from "flowbite-react";
import { FaPaperPlane } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function AnonNav() {
  const { theme } = useSelector((state) => state.theme);

  return (
    <>
      <div className="md:hidden">
        <Dropdown arrowIcon={true} inline>
          <div className="flex flex-col gap-y-2 mx-3 my-2 rounded">
            <Link to="/write">
              <p className="flex justify-center items-center italic gap-[0.3rem] text-sm border-2 p-2 rounded-2xl dark:border-slate-500 dark:text-slate-300 hover:dark:bg-slate-500 text-slate-600 border-slate-100 hover:border-slate-200 hover:bg-slate-200">
                <FaPaperPlane className="text-[0.6rem] hover:text-xs" />
                Write a blog
              </p>
            </Link>
            <Link
              to="/signup"
              className="flex gap-x-2 justify-center items-center"
            >
              <Button color="light" className="focus:ring-0">
                Sign Up
              </Button>
            </Link>
            <Link
              to="/signin"
              className="flex gap-x-2 justify-center items-center"
            >
              <Button className="" color={theme === "dark" ? "cyan" : "dark"}>
                Sign In
              </Button>
            </Link>
          </div>
        </Dropdown>
      </div>
      <div className="hidden md:flex md:gap-4 md:justify-items-center">
        <Link to="/signup" className="flex gap-x-2 justify-center items-center">
          <Button color="light" className="focus:ring-0">
            Sign Up
          </Button>
        </Link>
        <Link to="/signin" className="flex gap-x-2 justify-center items-center">
          <Button className="" color={theme === "dark" ? "cyan" : "dark"}>
            Sign In
          </Button>
        </Link>
      </div>
    </>
  );
}

export default AnonNav;
