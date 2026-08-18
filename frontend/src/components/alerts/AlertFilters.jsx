import { Filter } from "lucide-react";

const filters = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "citizen",
    label: "Citizen",
  },
  {
    id: "school",
    label: "School",
  },
  {
    id: "sensitive-group",
    label: "Sensitive Groups",
  },
  {
    id: "government",
    label: "Government",
  },
];

function AlertFilters({
  activeFilter,
  onFilterChange,
}) {
  return (
    <section className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#64757d] sm:text-xs">
          Alert Center
        </p>

        <h2 className="mt-1 text-base font-semibold text-[#F5F7F8] sm:text-lg">
          Active predictions
        </h2>
      </div>

      <div className="flex min-w-0 max-w-full items-center overflow-hidden rounded-xl border border-white/10 bg-[#101B20] p-1">
        <div className="hidden shrink-0 items-center px-2 text-[#64757d] sm:flex">
          <Filter size={14} />
        </div>

        <div className="flex min-w-0 max-w-full gap-1 overflow-x-auto scrollbar-none">
          {filters.map((filter) => {
            const active =
              activeFilter === filter.id;

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() =>
                  onFilterChange(filter.id)
                }
                className={`min-h-9 shrink-0 rounded-lg px-3 py-2 text-[10px] font-medium transition-all sm:text-xs ${
                  active
                    ? "bg-[#29C7F6] text-[#071014]"
                    : "text-[#8A9AA3] hover:bg-white/[0.05] hover:text-[#F5F7F8]"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AlertFilters;