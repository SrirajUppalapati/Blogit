import { Outlet } from "react-router-dom";
import DashSideBar from "../features/Dashboard/DashSideBar";

function Dashboard() {
  return (
    <div>
      <DashSideBar />
      <Outlet />
    </div>
  );
}

export default Dashboard;
