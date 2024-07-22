import { Avatar, Dropdown } from "flowbite-react";
import { FaUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Signout from "../users/Signout";

function UserNav() {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <div className="flex gap-5 justify-center items-center mr-2">
      <Link to="/notification">
        <IoMdNotificationsOutline className="text-2xl" />
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
  );
}

export default UserNav;
