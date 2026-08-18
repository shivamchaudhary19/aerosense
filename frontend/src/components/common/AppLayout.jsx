import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function AppLayout() {
  const [location, setLocation] = useState("Noida");

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#071014] text-[#F5F7F8]">
      <Sidebar />

      <div className="min-h-screen min-w-0 lg:ml-64">
        <Topbar
          location={location}
          onLocationChange={setLocation}
        />

        <main className="min-w-0 p-4 sm:p-6 lg:p-8">
          <Outlet context={{ location }} />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;