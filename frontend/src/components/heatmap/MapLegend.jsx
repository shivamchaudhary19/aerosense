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
    range: "101–200",
    color: "#FFB547",
  },
  {
    label: "Poor",
    range: "201–300",
    color: "#FF7A59",
  },
  {
    label: "Very Poor",
    range: "301–400",
    color: "#FF5A5F",
  },
  {
    label: "Severe",
    range: "401–500",
    color: "#B91C1C",
  },
];

function MapLegend() {
  return (
    <div className="absolute bottom-3 left-3 z-[1000] max-w-[calc(100%-1.5rem)] rounded-xl border border-white/10 bg-[#101B20]/95 p-3 shadow-2xl backdrop-blur-md sm:bottom-5 sm:left-5 sm:p-4">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8A9AA3]">
        AQI Risk
      </p>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-1 sm:gap-2">
        {legendItems.map((item) => (
          <div
            key={item.label}
            className="flex min-w-0 items-center gap-2"
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{
                backgroundColor: item.color,
              }}
            />

            <span className="text-[10px] text-[#F5F7F8] sm:text-xs">
              {item.label}
            </span>

            <span className="text-[9px] text-[#64757d] sm:text-[10px]">
              {item.range}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MapLegend;