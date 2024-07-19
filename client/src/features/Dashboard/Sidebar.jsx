import { Sidebar } from "flowbite-react";
import { HiArrowSmRight } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(
    function () {
      const urlSrarchParams = new URLSearchParams(location.search);
      const tabFromUrl = urlSrarchParams.get("tab");
      if (tabFromUrl) {
        setTab(tabFromUrl);
      }
    },
    [location.search]
  );

  return (
    <Sidebar className="w-full md:w-52">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item active={tab === "profile"}>
              <div className="flex items-center gap-x-2">
                <CgProfile className="hover:font-bold" />
                <span className="hover:font-bold">Profile</span>
              </div>
            </Sidebar.Item>
          </Link>
          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashSidebar;
