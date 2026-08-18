import { Search, X } from "lucide-react";

function HotspotFilters({ search, onSearchChange }) {
  const handleClear = () => {
    onSearchChange("");
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-[#101B20] p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="w-full sm:max-w-md">
          <label
            htmlFor="hotspot-search"
            className="mb-2 block text-xs font-medium text-[#8A9AA3]"
          >
            Search monitoring station
          </label>

          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#64757d]"
            />

            <input
              id="hotspot-search"
              type="text"
              value={search}
              onChange={(event) =>
                onSearchChange(event.target.value)
              }
              placeholder="Search by station name..."
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-9 pr-10 text-sm text-[#F5F7F8] outline-none placeholder:text-[#64757d] transition-colors focus:border-[#29C7F6]/40 focus:bg-white/[0.05]"
            />

            {search && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear station search"
                className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-[#64757d] transition-colors hover:bg-white/[0.06] hover:text-[#F5F7F8]"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Search status */}
        <div className="text-xs text-[#64757d] sm:text-right">
          {search ? (
            <span>
              Searching for{" "}
              <span className="font-medium text-[#F5F7F8]">
                "{search}"
              </span>
            </span>
          ) : (
            <span>
              Search across CPCB monitoring stations
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

export default HotspotFilters;