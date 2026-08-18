import { useState } from "react";
import {
  LayoutDashboard,
  BarChart3,
  Map,
  Bell,
  Building2,
  Database,
  BrainCircuit,
  Activity,
  X,
  Menu,
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        aria-label={
          mobileOpen
            ? "Close navigation"
            : "Open navigation"
        }
        aria-expanded={mobileOpen}
        onClick={() =>
          setMobileOpen((current) => !current)
        }
        className="fixed left-4 top-5 z-[60] flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0b1519]/95 text-[#F5F7F8] shadow-lg backdrop-blur-xl transition-colors hover:bg-white/[0.06] lg:hidden"
      >
        {mobileOpen ? (
          <X size={19} />
        ) : (
          <Menu size={20} />
        )}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={closeMobileSidebar}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-[280px]
          flex-col border-r border-white/10 bg-[#0b1519]
          shadow-2xl transition-transform duration-300
          lg:z-40 lg:w-24 lg:shadow-none
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Brand */}
        <div className="flex h-20 shrink-0 items-center border-b border-white/10 px-4 lg:justify-center lg:px-0">
          <div className="flex items-center gap-3 lg:block">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#29C7F6]/10 text-[#29C7F6]">
              <Activity
                size={22}
                strokeWidth={2.2}
              />
            </div>

            {/* Full brand only on mobile */}
            <div className="lg:hidden">
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
        <nav className="flex-1 overflow-y-auto px-3 py-5 lg:px-2">
          {/* Overview */}
          <div>
            <p className="mb-3 hidden px-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#64757d] lg:block">
              Overview
            </p>

            <div className="space-y-1.5">
              {mainNavigation.map((item) => (
                <SidebarLink
                  key={item.path}
                  item={item}
                  onNavigate={closeMobileSidebar}
                />
              ))}
            </div>
          </div>

          {/* Intelligence */}
          <div className="mt-7">
            <p className="mb-3 hidden px-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#64757d] lg:block">
              Intelligence
            </p>

            <div className="mb-3 flex items-center lg:hidden">
              <div className="h-px flex-1 bg-white/[0.07]" />

              <span className="px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#64757d]">
                Intelligence
              </span>

              <div className="h-px flex-1 bg-white/[0.07]" />
            </div>

            <div className="space-y-1.5">
              {intelligenceNavigation.map((item) => (
                <SidebarLink
                  key={item.path}
                  item={item}
                  onNavigate={closeMobileSidebar}
                />
              ))}
            </div>
          </div>
        </nav>

        {/* System status */}
        <div className="shrink-0 border-t border-white/10 p-3 lg:p-2">
          <div className="flex items-center gap-3 rounded-xl bg-white/[0.025] px-3 py-3 lg:justify-center lg:px-0">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#35D07F] opacity-40" />

              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#35D07F]" />
            </span>

            <div className="lg:hidden">
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
    </>
  );
}

function SidebarLink({
  item,
  onNavigate,
}) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      end={item.path === "/"}
      onClick={onNavigate}
      title={item.name}
      className={({ isActive }) =>
        `
          group relative flex items-center gap-3
          rounded-xl px-3 py-2.5
          text-sm font-medium
          transition-all duration-200
          lg:h-11 lg:justify-center lg:px-0
          ${
            isActive
              ? "bg-[#29C7F6]/10 text-[#29C7F6]"
              : "text-[#8A9AA3] hover:bg-white/[0.04] hover:text-[#F5F7F8]"
          }
        `
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            size={19}
            strokeWidth={
              isActive ? 2.2 : 1.8
            }
            className="shrink-0"
          />

          {/* Mobile labels */}
          <span className="lg:hidden">
            {item.name}
          </span>

          {/* Desktop tooltip */}
          <span
            className="
              pointer-events-none absolute left-[calc(100%+10px)]
              hidden whitespace-nowrap rounded-lg
              border border-white/10 bg-[#101B20]
              px-3 py-2 text-xs font-medium
              text-[#F5F7F8] shadow-xl
              opacity-0 translate-x-1
              transition-all duration-150
              group-hover:translate-x-0
              group-hover:opacity-100
              lg:block
            "
          >
            {item.name}
          </span>
        </>
      )}
    </NavLink>
  );
}

export default Sidebar;