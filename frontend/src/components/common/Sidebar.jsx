import {
  LayoutDashboard,
  BarChart3,
  Map,
  Bell,
  Building2,
  Database,
  BrainCircuit,
  Activity,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const mainNavigation = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Forecast",
    path: "/forecast",
    icon: BarChart3,
  },
  {
    name: "Heatmap",
    path: "/heatmap",
    icon: Map,
  },
  {
    name: "Smart Alerts",
    path: "/alerts",
    icon: Bell,
  },
  {
    name: "Government",
    path: "/government",
    icon: Building2,
  },
];

const intelligenceNavigation = [
  {
    name: "Data Sources",
    path: "/data-sources",
    icon: Database,
  },
  {
    name: "AI Model",
    path: "/ai-model",
    icon: BrainCircuit,
  },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-white/10 bg-[#0b1519]">
      {/* Brand */}
      <div className="border-b border-white/10 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#29C7F6]/10 text-[#29C7F6]">
            <Activity size={22} strokeWidth={2.2} />
          </div>

          <div>
            <h1 className="text-lg font-semibold tracking-tight text-[#F5F7F8]">
              AeroSense
            </h1>

            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#8A9AA3]">
              Predict before it happens
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        {/* Main */}
        <div>
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#64757d]">
            Overview
          </p>

          <div className="space-y-1">
            {mainNavigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-[#29C7F6]/10 text-[#29C7F6]"
                        : "text-[#8A9AA3] hover:bg-white/[0.04] hover:text-[#F5F7F8]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={18}
                        strokeWidth={isActive ? 2.2 : 1.8}
                      />

                      <span>{item.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Intelligence */}
        <div className="mt-8">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#64757d]">
            Intelligence
          </p>

          <div className="space-y-1">
            {intelligenceNavigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-[#29C7F6]/10 text-[#29C7F6]"
                        : "text-[#8A9AA3] hover:bg-white/[0.04] hover:text-[#F5F7F8]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={18}
                        strokeWidth={isActive ? 2.2 : 1.8}
                      />

                      <span>{item.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      {/* System Status */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-lg bg-white/[0.025] px-3 py-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#35D07F] opacity-40" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#35D07F]" />
          </span>

          <div>
            <p className="text-xs font-medium text-[#F5F7F8]">
              System Operational
            </p>

            <p className="mt-0.5 text-[10px] text-[#64757d]">
              AeroSense services online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;