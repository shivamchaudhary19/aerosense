import { MapPin, Search, RefreshCw } from "lucide-react";
import { useState } from "react";

function Topbar({ location, onLocationChange }) {
  const [search, setSearch] = useState(location);

  function handleSubmit(event) {
    event.preventDefault();

    const value = search.trim();

    if (!value) {
      return;
    }

    onLocationChange(value);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#071014]/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 w-full max-w-[1800px] items-center gap-3 pl-16 pr-4 sm:px-6 lg:px-8">
        {/* Page identity */}
        <div className="min-w-0 flex-1">
          <div className="hidden items-center gap-2 sm:flex">
            <MapPin
              size={14}
              className="shrink-0 text-[#29C7F6]"
            />

            <p className="truncate text-xs font-medium uppercase tracking-[0.16em] text-[#64757d]">
              Environmental Intelligence
            </p>
          </div>

          <h2 className="mt-1 truncate text-sm font-semibold text-[#F5F7F8] sm:text-base lg:text-lg">
            Air Quality Overview
          </h2>
        </div>

        {/* Actions */}
        <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
          {/* Search */}
          <form
            onSubmit={handleSubmit}
            className="flex h-10 min-w-0 w-[135px] items-center rounded-lg border border-white/10 bg-white/[0.03] px-2.5 transition-colors focus-within:border-[#29C7F6]/50 sm:w-[220px] sm:px-3 md:w-[280px] lg:w-[320px]"
          >
            <Search
              size={16}
              className="mr-2 shrink-0 text-[#29C7F6]"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search city..."
              aria-label="Search city"
              className="min-w-0 flex-1 bg-transparent text-xs text-[#F5F7F8] outline-none placeholder:text-[#64757d] sm:text-sm"
            />

            <button
              type="submit"
              aria-label="Search city"
              className="hidden shrink-0 rounded-md px-2 py-1 text-xs text-[#8A9AA3] transition-colors hover:bg-white/[0.05] hover:text-[#F5F7F8] sm:block"
            >
              Enter
            </button>
          </form>

          {/* Live status */}
          <div className="hidden h-10 shrink-0 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 md:flex">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#35D07F]" />

            <span className="whitespace-nowrap text-xs font-medium text-[#8A9AA3]">
              Live Data
            </span>
          </div>

          {/* Refresh */}
          <button
            type="button"
            aria-label="Refresh data"
            title="Refresh data"
            onClick={() => window.location.reload()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[#8A9AA3] transition-all hover:border-white/20 hover:bg-white/[0.05] hover:text-[#F5F7F8]"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Topbar;