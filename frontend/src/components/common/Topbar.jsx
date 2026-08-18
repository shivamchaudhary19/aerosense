import { MapPin, ChevronDown, RefreshCw } from "lucide-react";

function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-[#071014]/90 px-8 backdrop-blur-xl">
      {/* Page context */}
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#64757d]">
          Environmental Intelligence
        </p>

        <h2 className="mt-1 text-lg font-semibold text-[#F5F7F8]">
          Air Quality Overview
        </h2>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Location */}
        <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-[#F5F7F8] transition-colors hover:border-white/20 hover:bg-white/[0.05]">
          <MapPin size={16} className="text-[#29C7F6]" />

          <span>Noida, India</span>

          <ChevronDown size={14} className="text-[#64757d]" />
        </button>

        {/* Data status */}
        <div className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 sm:flex">
          <span className="h-2 w-2 rounded-full bg-[#35D07F]" />

          <span className="text-xs font-medium text-[#8A9AA3]">
            Live Data
          </span>
        </div>

        {/* Refresh */}
        <button
          aria-label="Refresh data"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[#8A9AA3] transition-all hover:border-white/20 hover:bg-white/[0.05] hover:text-[#F5F7F8]"
        >
          <RefreshCw size={16} />
        </button>
      </div>
    </header>
  );
}

export default Topbar;