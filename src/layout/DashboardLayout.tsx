import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

const DashboardLayout = () => {
  return (
    <main>
      <div className="flex overflow-hidden h-screen">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-100 text-neutral-900 overflow-auto">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
