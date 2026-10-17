import { useContext } from "react";
import {
  LayoutDashboard,
  BookOpen,
  History,
  ChartNoAxesCombined,
  LogOut,
  Rocket,
  PanelLeftClose,
  X,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { AuthStore } from "../context/AuthContext";
import { toast } from "react-toastify";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/main" },
  { name: "Problems", icon: BookOpen, path: "/main/problems" },
  { name: "Profile", icon: History, path: "/main/profile" },
  {
    name: "Progress & Analytics",
    icon: ChartNoAxesCombined,
    path: "/main/progress",
  },
];

const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {

  console.log(collapsed,setCollapsed,mobileOpen,setMobileOpen)
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(AuthStore);

  const handleNavigate = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("currUser");
    setMobileOpen(false);
    toast.success("User Logged out Successfully");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 min-[780px]:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
 


       <aside
  className={`
    fixed inset-y-0 left-0 z-50 h-screen
    flex flex-col border-r border-slate-800 bg-[#0b1728]
    transition-all duration-300
    ${collapsed ? "w-20" : "w-64"}
    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
    min-[780px]:translate-x-0
  `}
>

      

        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800 px-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-600">
              <Rocket size={20} />
            </div>

            {!collapsed && (
              <div className="whitespace-nowrap">
                <h1 className="text-lg font-bold leading-tight">PrepTrack</h1>
                <p className="text-xs text-slate-400">Track • Prepare • Crack</p>
              </div>
            )}
          </div>

          {/* Collapse (Desktop) */}
         <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white min-[780px]:block"
              >
             <PanelLeftClose
              size={18}
               className={collapsed ? "rotate-180" : ""}
              />
          </button>

          {/* Close (Mobile) */}
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 min-[780px]:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {!collapsed && (
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Workspace
            </p>
          )}

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/main" &&
                location.pathname.startsWith(item.path));

            return (
              <button
                key={item.name}
                onClick={() => handleNavigate(item.path)}
                title={collapsed ? item.name : undefined}
                className={`
                  flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-950/30"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }
                  ${collapsed ? "justify-center" : ""}
                `}
              >
                <Icon size={20} className="shrink-0" />
                {!collapsed && <span className="truncate">{item.name}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-slate-800 p-3">
          <button
            onClick={handleLogout}
            title={collapsed ? "Logout" : undefined}
            className={`
              flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-400
              transition hover:bg-red-500/10
              ${collapsed ? "justify-center" : ""}
            `}
          >
            <LogOut size={20} className="shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>

          {!collapsed && (
            <p className="mt-3 px-3 text-xs text-slate-600">© 2026 PrepTrack</p>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;