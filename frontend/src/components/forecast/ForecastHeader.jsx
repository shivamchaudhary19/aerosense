import { MapPin, Clock3 } from "lucide-react";

function ForecastHeader({ location, forecast }) {
  const forecastLocation =
    forecast?.location?.name ||
    location ||
    "Unknown location";

  const country =
    forecast?.location?.country ||
    "IN";

  const horizon =
    forecast?.forecastHorizon ||
    "Live forecast";

  return (
    <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <div className="flex min-w-0 items-center gap-2 text-xs text-[#8A9AA3] sm:text-sm">
          <MapPin
            size={15}
            className="shrink-0 text-[#29C7F6]"
          />

          <span className="truncate">
            {forecastLocation}, {country}
          </span>
        </div>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#F5F7F8] sm:text-3xl lg:text-4xl">
          AQI Forecast
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64757d]">
          Predictive air-quality intelligence for
          the next 24, 48 and 72 hours.
        </p>
      </div>

      <div className="flex w-fit shrink-0 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2 text-xs text-[#64757d]">
        <Clock3
          size={14}
          className="shrink-0"
        />

        <span>{horizon}</span>
      </div>
    </section>
  );
}

export default ForecastHeader;