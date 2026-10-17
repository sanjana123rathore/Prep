import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (

    
<div className="flex h-screen w-full overflow-hidden bg-[#0b111a] text-white">
  <Sidebar
    collapsed={collapsed}
    setCollapsed={setCollapsed}
    mobileOpen={mobileOpen}
    setMobileOpen={setMobileOpen}
  />

  <div
    className={`flex min-h-0 min-w-0 flex-1 flex-col transition-[margin] duration-300 ${
      collapsed ? "min-[780px]:ml-20" : "min-[780px]:ml-64"
    }`}
  >
    <Navbar
      onToggleSidebar={() => setMobileOpen((prev) => !prev)}
    />

    <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
      <div className="w-full min-w-0 p-4 sm:p-6">
        <Outlet />
      </div>
    </main>
  </div>
</div>


  );
};

export default DashboardLayout;
