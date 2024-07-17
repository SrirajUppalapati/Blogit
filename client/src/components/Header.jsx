import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { PiHamburgerThin } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/Dashboard/themeSlice";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  console.log(theme);
  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={"div"}>
        <Link
          to="/"
          className=" font-extrabold italic
        md:text-2xl text-3xl "
        >
          blogit
        </Link>
        <TextInput
          type="text"
          placeholder="Search"
          rightIcon={IoIosSearch}
          className="md:inline hidden ml-10"
        />
      </Navbar.Brand>
      <div className="flex md:order-2 gap-x-4">
        {!currentUser ? (
          <div className="flex gap-4">
            <Link to="/signin">
              <Button className="" color="dark">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button color="light" className="focus:ring-0">
                Sign Up
              </Button>
            </Link>
            <Button onClick={() => dispatch(toggleTheme(theme))}>Theme</Button>
          </div>
        ) : (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header className="flex flex-col text-center border-b-0">
              <span className="capitalize font-bold">{currentUser.name}</span>
              <span className="text-xs font-light italic">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to="/dashboard?tab=profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Link to="/signout">
              <Dropdown.Item>Sign Out</Dropdown.Item>
            </Link>
          </Dropdown>
        )}
        <Navbar.Toggle barIcon={PiHamburgerThin} />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={"div"} className="border-b-0 text-center">
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link as={"div"} className="border-b-0 text-center">
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link as={"div"} className="border-b-0 text-center">
          <Link to="/blogs">Blogs</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
