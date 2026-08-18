const legendItems = [
  {
    label: "Good",
    range: "0–50",
    color: "#35D07F",
  },
  {
    label: "Satisfactory",
    range: "51–100",
    color: "#9BC53D",
  },
  {
    label: "Moderate",
    range: "101–150",
    color: "#FFB547",
  },
  {
    label: "Unhealthy",
    range: "151–200",
    color: "#FF7A59",
  },
  {
    label: "Severe",
    range: "201+",
    color: "#FF5A5F",
  },
];

function MapLegend() {
  return (
    <div className="absolute bottom-5 left-5 z-[1000] rounded-xl border border-white/10 bg-[#101B20]/95 p-4 shadow-2xl backdrop-blur-md">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8A9AA3]">
        AQI Risk
      </p>

      <div className="space-y-2">
        {legendItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2.5"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />

            <span className="text-xs text-[#F5F7F8]">
              {item.label}
            </span>

            <span className="text-[10px] text-[#64757d]">
              {item.range}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MapLegend;