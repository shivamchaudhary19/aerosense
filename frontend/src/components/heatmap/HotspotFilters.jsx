import { Search, SlidersHorizontal } from "lucide-react";

function HotspotFilters({ search, onSearchChange }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64757d]"
        />

        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search location..."
          className="h-10 w-full rounded-lg border border-white/10 bg-[#101B20] pl-10 pr-4 text-sm text-[#F5F7F8] outline-none placeholder:text-[#64757d] focus:border-[#29C7F6]/40"
        />
      </div>

      <button className="flex h-10 items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#101B20] px-4 text-sm text-[#8A9AA3] transition-colors hover:bg-white/[0.04] hover:text-[#F5F7F8]">
        <SlidersHorizontal size={15} />
        Risk level
      </button>
    </div>
  );
}

export default HotspotFilters;