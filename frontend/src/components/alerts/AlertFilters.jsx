import { Filter } from "lucide-react";

const filters = [
  { id: "all", label: "All" },
  { id: "citizen", label: "Citizen" },
  { id: "school", label: "School" },
  { id: "sensitive-group", label: "Sensitive Groups" },
  { id: "government", label: "Government" },
];

function AlertFilters({ activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#64757d]">
          Alert Center
        </p>

        <h2 className="mt-1 text-lg font-semibold text-[#F5F7F8]">
          Active predictions
        </h2>
      </div>

      <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-white/10 bg-[#101B20] p-1">
        <div className="hidden items-center px-2 text-[#64757d] sm:flex">
          <Filter size={14} />
        </div>

        {filters.map((filter) => {
          const active = activeFilter === filter.id;

          return (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
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
  );
}

export default AlertFilters;