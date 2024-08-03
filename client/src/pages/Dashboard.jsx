import { Outlet } from "react-router-dom";
import DashSideBar from "../features/Dashboard/DashSideBar";

function Dashboard() {
  return (
    <div className="min-h-screen">
      <div>
        <DashSideBar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
