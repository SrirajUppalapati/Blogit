import { Button, Dropdown } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function AnonNav() {
  const { theme } = useSelector((state) => state.theme);

  return (
    <>
      <div className="md:hidden">
        <Dropdown arrowIcon={true} inline>
          <div className="flex flex-col gap-y-2 mx-3 my-2 rounded">
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
