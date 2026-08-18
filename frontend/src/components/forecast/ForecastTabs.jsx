function ForecastTabs({
  selectedHours,
  onChange,
}) {
  const options = [24, 48, 72];

  return (
    <div className="inline-flex max-w-full shrink-0 overflow-x-auto rounded-xl border border-white/10 bg-[#101B20] p-1">
      {options.map((hours) => {
        const active =
          selectedHours === hours;

        return (
          <button
            key={hours}
            type="button"
            onClick={() => onChange(hours)}
            className={`min-h-9 min-w-[72px] shrink-0 rounded-lg px-4 py-2 text-xs font-medium transition-all duration-200 sm:min-w-[80px] sm:px-5 sm:text-sm ${
              active
                ? "bg-[#29C7F6] text-[#071014]"
                : "text-[#8A9AA3] hover:bg-white/[0.05] hover:text-[#F5F7F8]"
            }`}
          >
            {hours}H
          </button>
        );
      })}
    </div>
  );
}

export default ForecastTabs;