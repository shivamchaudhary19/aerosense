function ForecastTabs({ selectedHours, onChange }) {
  const options = [24, 48, 72];

  return (
    <div className="inline-flex rounded-xl border border-white/10 bg-[#101B20] p-1">
      {options.map((hours) => {
        const active = selectedHours === hours;

        return (
          <button
            key={hours}
            onClick={() => onChange(hours)}
            className={`rounded-lg px-5 py-2 text-sm font-medium transition-all ${
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