import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toggleTheme } from "./themeSlice";
import { FaMoon, FaSun } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuBookMinus } from "react-icons/lu";
import { CiTrash } from "react-icons/ci";
import { TbPasswordUser } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { Sidebar } from "flowbite-react";

function SidebarHelp() {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  return (
    <Sidebar className="px-0">
      <Sidebar.Items className="pt-10">
        <Sidebar.ItemGroup>
          <p className="text-xl pt-3 pb-2 pl-2 font-bold">Dashboard</p>
          <NavLink to="/dashboard">
            <Sidebar.Item as={"div"}>
              <p className="flex justify-left items-center gap-x-3 text-lg pl-3 py-2 font-light hover:font-normal">
                <LuBookMinus className="text-sm" />
                Blogs
              </p>
            </Sidebar.Item>
          </NavLink>
          <NavLink to="/dashboard/notifications">
            <Sidebar.Item href="#" as={"div"}>
              <p className="flex justify-left items-center gap-x-2 text-lg pl-3 py-2 font-light hover:font-normal">
                <IoMdNotificationsOutline className="text-lg" />
                Notifications
              </p>
            </Sidebar.Item>
          </NavLink>
          <NavLink to="/dashboard">
            <Sidebar.Item as={"div"}>
              <p className="flex justify-left items-center gap-x-3 text-lg pl-3 py-2 font-light hover:font-normal">
                <CiTrash />
                Trash
              </p>
            </Sidebar.Item>
          </NavLink>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup className="pt-10">
          <p className="text-xl pt-3 pb-2 pl-2 font-bold">Settings</p>
          <NavLink to="/settings/updateprofile">
            <Sidebar.Item as={"div"}>
              <p className="flex justify-left items-center gap-x-2 text-lg pl-3 py-2 font-light hover:font-normal">
                <CgProfile />
                Update Profile
              </p>
            </Sidebar.Item>
          </NavLink>
          <NavLink to="/settings/updatepassword">
            <Sidebar.Item as={"div"}>
              <p className="flex justify-left items-center gap-x-2 text-lg pl-3 py-2 font-light hover:font-normal">
                <TbPasswordUser />
                Update Password
              </p>
            </Sidebar.Item>
          </NavLink>
          <button
            onClick={() => dispatch(toggleTheme(theme))}
            className="min-w-full text-left focus:ring-0 focus:border-0 border-0"
          >
            <Sidebar.Item as={"div"}>
              <p className="flex justify-left pl-3 items-center gap-x-2 text-[1rem] font-light hover:font-normal">
                {theme === "dark" ? (
                  <FaMoon className="text-sm" />
                ) : (
                  <FaSun className="text-sm" />
                )}
                {theme === "dark" ? "Theme - Dark" : "Theme - Light"}
              </p>
            </Sidebar.Item>
          </button>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SidebarHelp;
