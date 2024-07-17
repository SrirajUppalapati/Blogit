import { Button, Navbar, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { PiHamburgerThin } from "react-icons/pi";

function Header() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={"div"}>
        <Link
          to="/"
          className="italic dark:text-dark_text text-light_text font-extrabold 
        md:text-2xl text-3xl hover:text-light_hover"
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
        <Link to="/signin">
          <Button className="" color="dark">
            Sign In
          </Button>
        </Link>
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
