import { MapPin, Clock3 } from "lucide-react";

function ForecastHeader() {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <div className="flex items-center gap-2 text-sm text-[#8A9AA3]">
          <MapPin size={15} className="text-[#29C7F6]" />
          Noida, India
        </div>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#F5F7F8]">
          AQI Forecast
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64757d]">
          Predictive air-quality intelligence for the next 24, 48 and 72
          hours.
        </p>
      </div>

      <div className="flex items-center gap-2 text-xs text-[#64757d]">
        <Clock3 size={14} />
        Forecast updated recently
      </div>
    </div>
  );
}

export default ForecastHeader;