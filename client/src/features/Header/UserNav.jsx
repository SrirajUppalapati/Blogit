import { Avatar, Dropdown } from "flowbite-react";
import { FaUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Signout from "../users/Signout";
import { FaPaperPlane } from "react-icons/fa";
import AnimationWrapper from "../../components/AnimationWrapper";
import { useEffect, useState } from "react";
import { checkSeenAPI } from "../../api/notificationAPI";
import { VscBellDot } from "react-icons/vsc";

function UserNav() {
  const { currentUser, token } = useSelector((state) => state.auth);
  const location = useLocation().pathname;

  const [check, setCheck] = useState(false);

  useEffect(function () {
    checkSeenAPI({ token }).then((data) => setCheck(data?.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimationWrapper>
      <div className="flex gap-5 justify-center items-center mr-2">
        <Link to="/dashboard/notifications">
          {check ? (
            <VscBellDot className="text-2xl" />
          ) : (
            <IoMdNotificationsOutline className="text-2xl" />
          )}
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
          {!location.startsWith("/write") && (
            <Link to="/write">
              <Dropdown.Item className="md:hidden">
                <p className="flex justify-center items-center italic gap-[0.3rem] text-sm ">
                  <FaPaperPlane className="text-[0.6rem] hover:text-xs" />
                  Write a blog
                </p>
              </Dropdown.Item>
            </Link>
          )}
          <Link to="/dashboard">
            <Dropdown.Item>
              <div className="flex justify-center items-center gap-x-1 text-sm">
                <MdDashboard className="text-xs" />
                Dashboard
              </div>
            </Dropdown.Item>
          </Link>
          <Link to={`/profile/${currentUser.username}`}>
            <Dropdown.Item>
              <div className="flex justify-center items-center gap-x-1 text-sm">
                <FaUser className="text-xs" />
                Profile
              </div>
            </Dropdown.Item>
          </Link>
          <Link to="/settings/updateprofile">
            <Dropdown.Item>
              <div className="flex justify-center items-center gap-x-1 text-sm">
                <FiSettings className="text-xs" />
                Settings
              </div>
            </Dropdown.Item>
          </Link>
          <Dropdown.Divider />
          <div className="flex flex-row">
            <Signout />
          </div>
        </Dropdown>
      </div>
    </AnimationWrapper>
  );
}

export default UserNav;
