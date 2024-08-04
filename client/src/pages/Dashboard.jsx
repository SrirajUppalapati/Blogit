import { Outlet } from "react-router-dom";
import DashSideBar from "../features/Dashboard/DashSideBar";

function Dashboard() {
  return (
    <div className="min-h-screen">
      <div>
        <DashSideBar />
      </div>
      <div className="lg:pl-64 mx-10 md:pt-[10%] pt-[15%] lg:pt-[3%]">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
