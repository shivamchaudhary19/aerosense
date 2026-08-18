import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function AppLayout() {
  return (
    <div className="min-h-screen bg-[#071014] text-[#F5F7F8]">
      <Sidebar />

      <div className="ml-64 min-h-screen">
        <Topbar />

        <main className="min-h-[calc(100vh-5rem)] p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;