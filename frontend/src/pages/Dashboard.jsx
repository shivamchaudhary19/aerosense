import AQIOverview from "../components/dashboard/AQIOverview";
import WeatherMetrics from "../components/dashboard/WeatherMetrics";
import ForecastPreview from "../components/dashboard/ForecastPreview";
import UpcomingRisk from "../components/dashboard/UpcomingRisk";
import HotspotSummary from "../components/dashboard/HotspotSummary";

function Dashboard() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-8">
      {/* Page heading */}
      <section>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm text-[#8A9AA3]">
              Tuesday, August 18, 2026
            </p>

            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#F5F7F8]">
              Noida Air Intelligence
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64757d]">
              Monitor current conditions and understand where air quality is
              heading before pollution peaks.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#64757d]">
            <span className="h-2 w-2 rounded-full bg-[#35D07F]" />
            Updated just now
          </div>
        </div>
      </section>

      {/* Top section */}
      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <AQIOverview />
        <UpcomingRisk />
      </div>

      {/* Environmental metrics */}
      <WeatherMetrics />

      {/* Forecast + hotspots */}
      <div className="grid gap-5 xl:grid-cols-[1.5fr_0.8fr]">
        <ForecastPreview />
        <HotspotSummary />
      </div>
    </div>
  );
}

export default Dashboard;