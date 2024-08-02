import { Outlet } from "react-router-dom";

function Applayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
    </div>
  );
}

export default Applayout;
