import { Outlet } from "react-router-dom";
import DashSideBar from "../features/Dashboard/DashSideBar";

function Dashboard() {
  return (
    <div className="min-h-screen grid grid-cols-[auto_1fr]">
      <div className="sticky top-0 h-screen">
        <DashSideBar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
