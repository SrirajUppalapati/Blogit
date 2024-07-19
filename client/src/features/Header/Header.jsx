import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { IoIosArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { SiLibreofficewriter } from "react-icons/si";
import { MdDashboard } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { IoNotifications } from "react-icons/io5";
import Signout from "../users/Signout";
import { toggleTheme } from "../Dashboard/themeSlice";

function Header() {
  const { currentUser } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  return (
    <Navbar fluid className={`${theme === "light" && "bg-slate-100"}`}>
      <Navbar.Brand as={"div"} className="max-w-fit text-dark dark:text-white">
        <Link
          to="/"
          className=" font-extrabold italic
        md:text-2xl text-3xl lg:text-4xl"
        >
          blogit
        </Link>
        <TextInput
          type="text"
          placeholder="Search"
          rightIcon={IoIosSearch}
          className={`ml-10 lg:w-[500px] md:w-[350px] w-[200px]`}
        />
      </Navbar.Brand>
      <Button onClick={() => dispatch(toggleTheme(theme))}>Light</Button>
      {currentUser ? (
        <div className="flex gap-5 justify-center items-center mr-2">
          <Link to="/notification">
            <IoNotifications className="text-xl" />
          </Link>
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img={currentUser.profilePicture}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-lg capitalize font-bold text-center pb-1">
                {currentUser.name}
              </span>
              <span className="block truncate text-xs font-medium italic text-center">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              <Link
                to="/write"
                className="flex justify-center items-center gap-x-1 text-sm"
              >
                <SiLibreofficewriter className="text-xs" />
                Write a Blog
              </Link>
            </Dropdown.Item>

            <Dropdown.Item>
              <Link
                to="/dashboard"
                className="flex justify-center items-center gap-x-1 text-sm"
              >
                <MdDashboard className="text-xs" />
                Dashboard
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link
                to="/profile"
                className="flex justify-center items-center gap-x-1 text-sm"
              >
                <FaUser className="text-xs" />
                Profile
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link
                to="/settings"
                className="flex justify-center items-center gap-x-1 text-sm"
              >
                <FiSettings className="text-xs" />
                Settings
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <Signout />
            </Dropdown.Item>
          </Dropdown>
        </div>
      ) : (
        <>
          <Navbar.Toggle
            barIcon={IoIosArrowDropdown}
            className="bg-inherit focus:ring-0"
          />
          <Navbar.Collapse>
            <Navbar.Link as={"div"} className="border-b-0">
              <Link
                to="/write"
                className="flex justify-center items-center gap-x-1 text-md pt-2 italic font-bold"
              >
                <SiLibreofficewriter className="text-[0.75rem]" />
                Write a Blog
              </Link>
            </Navbar.Link>
            <Navbar.Link as={"div"} className="border-b-0">
              <Link
                to="/signup"
                className="flex gap-x-2 justify-center items-center"
              >
                <Button color="light" className="focus:ring-0">
                  Sign Up
                </Button>
              </Link>
            </Navbar.Link>
            <Navbar.Link as={"div"} className="border-b-0">
              <Link
                to="/signin"
                className="flex gap-x-2 justify-center items-center"
              >
                <Button className="" color={theme === "dark" ? "cyan" : "dark"}>
                  Sign In
                </Button>
              </Link>
            </Navbar.Link>
          </Navbar.Collapse>
        </>
      )}
    </Navbar>
  );
}

export default Header;
