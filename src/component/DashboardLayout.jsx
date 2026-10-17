


// import { useState } from "react";
// import { Outlet } from "react-router";
// import Navbar from "./navbar";
// import Sidebar from "./sidebar";

// // const DashboardLayout = () => {
// //   const [collapsed, setCollapsed] = useState(false);
// //   const [mobileOpen, setMobileOpen] = useState(false);

// //   return (
// //     <div className="flex min-h-screen w-full bg-[#0b111a] text-white">
// //       {/* Sidebar */}
// //       <Sidebar
// //         collapsed={collapsed}
// //         setCollapsed={setCollapsed}
// //         mobileOpen={mobileOpen}
// //         setMobileOpen={setMobileOpen}
// //       />

// //       {/* Main Content Area */}
// //       <div
// //         className={`flex flex-1 flex-col min-w-0 transition-all duration-300 ${
// //           collapsed ? "min-[780px]:ml-20" : "min-[780px]:ml-64"
// //         }`}
// //       >
// //         <Navbar onToggleSidebar={() => setMobileOpen((prev) => !prev)} />

// //         <main className="flex-1 w-full min-w-0 overflow-y-auto overflow-x-hidden">
// //           <div className="w-full min-w-0 p-4 sm:p-6">
// //             <Outlet />
// //           </div>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DashboardLayout;


// const DashboardLayout = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   return (
//     <div className="min-h-screen w-full min-w-0 overflow-x-clip bg-[#0b111a] text-white">
//       <Sidebar
//         collapsed={collapsed}
//         setCollapsed={setCollapsed}
//         mobileOpen={mobileOpen}
//         setMobileOpen={setMobileOpen}
//       />

//       <div
//         className={`min-h-screen min-w-0 w-full transition-[margin] duration-300 ${
//           collapsed
//             ? "min-[780px]:ml-20 min-[780px]:w-[calc(100%-5rem)]"
//             : "min-[780px]:ml-64 min-[780px]:w-[calc(100%-16rem)]"
//         }`}
//       >
//         <Navbar onToggleSidebar={() => setMobileOpen((prev) => !prev)} />

//         <main className="w-full min-w-0 flex-1">
//           <div className="w-full min-w-0">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };



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
