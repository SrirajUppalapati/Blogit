import { Button, Dropdown } from "flowbite-react";
import { FaPaperPlane } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AnimationWrapper from "../../components/AnimationWrapper";

function AnonNav() {
  const { theme } = useSelector((state) => state.theme);

  return (
    <AnimationWrapper>
      <div className="md:hidden">
        <Dropdown arrowIcon={true} inline>
          <div className="flex flex-col gap-y-2 mx-3 my-2 rounded">
            <Link to="/write">
              <p className="flex justify-center items-center italic gap-[0.3rem] text-sm border-2 p-2 rounded-2xl bg-slate-800 text-white   enabled:hover:bg-gray-900 dark:border-cyan-600 dark:bg-cyan-600 dark:text-white dark:enabled:hover:border-cyan-700 dark:enabled:hover:bg-cyan-700">
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
    </AnimationWrapper>
  );
}

export default AnonNav;
