import { Bell, ChevronDown, Menu } from "lucide-react";
import { useContext } from "react";
import { AuthStore } from "../context/AuthContext";

const Navbar = ({ onToggleSidebar }) => {
  const { user } = useContext(AuthStore);

  const initials =
    user?.name
      ?.trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((name) => name[0].toUpperCase())
      .slice(0, 2)
      .join("") || "U";

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full min-w-0 items-center justify-between border-b border-slate-800 bg-[#0b1728]/95 px-4 backdrop-blur-md sm:px-6">
      {/* Mobile Navbar */}
      <div className="flex w-full items-center justify-between min-[780px]:hidden">
        <h1 className="text-lg font-bold text-white">
        <span className="text-violet-400"></span>
        </h1>

        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition hover:bg-slate-800"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden w-full min-w-0 items-center justify-between min-[780px]:flex">
        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold text-white">
            Dashboard
          </h2>
          <p className="text-xs text-slate-400">
            Welcome back! Ready to prepare today?
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <Bell size={19} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-violet-500 ring-2 ring-[#0b1728]" />
          </button>

          <button
            type="button"
            aria-label="User profile"
            className="flex min-w-0 items-center gap-3 rounded-xl p-1.5 transition hover:bg-slate-800"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-violet-400/30 bg-violet-500/20 text-sm font-bold text-violet-300">
              {initials}
            </div>

            <div className="min-w-0 text-left">
              <p className="max-w-36 truncate text-sm font-semibold text-white">
                {user?.name || "User"}
              </p>
              <p className="max-w-36 truncate text-xs text-slate-400">
                {user?.email || "Welcome back"}
              </p>
            </div>

            <ChevronDown size={16} className="shrink-0 text-slate-400" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
