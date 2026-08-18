import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

import AQIOverview from "../components/dashboard/AQIOverview";
import WeatherMetrics from "../components/dashboard/WeatherMetrics";
import ForecastPreview from "../components/dashboard/ForecastPreview";
import UpcomingRisk from "../components/dashboard/UpcomingRisk";
import HotspotSummary from "../components/dashboard/HotspotSummary";

import {
  getEnvironment,
  getForecast,
  getHotspots,
  getPrediction,
  getLiveAlerts,
} from "../services/api";

function Dashboard() {
  const { location } = useOutletContext();

  const [environment, setEnvironment] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hotspots, setHotspots] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [alerts, setAlerts] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const [
        environmentData,
        forecastData,
        hotspotData,
        predictionData,
        alertData,
      ] = await Promise.all([
        getEnvironment(location),
        getForecast(location, 24),
        getHotspots(location),
        getPrediction(location),
        getLiveAlerts(location),
      ]);

      setEnvironment(environmentData);
      setForecast(forecastData);
      setHotspots(hotspotData);
      setPrediction(predictionData);
      setAlerts(alertData);
    } catch (err) {
      setError(
        err?.message ||
          "Failed to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (location) {
      loadDashboard();
    }
  }, [location]);

  if (loading) {
    return (
      <div className="mx-auto flex min-h-[420px] w-full max-w-[1600px] items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-[#29C7F6]" />

          <p className="mt-4 text-sm text-[#8A9AA3]">
            Loading environmental intelligence...
          </p>

          <p className="mt-1 text-xs text-[#64757d]">
            Fetching live CPCB and environmental data
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-[1600px] px-0">
        <div className="rounded-2xl border border-[#FF5A5F]/20 bg-[#101B20] p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FF5A5F]/10 text-[#FF5A5F]">
              <AlertTriangle size={20} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-[#FF5A5F]">
                Unable to load dashboard
              </p>

              <p className="mt-2 break-words text-sm leading-6 text-[#8A9AA3]">
                {error}
              </p>

              <button
                type="button"
                onClick={loadDashboard}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-[#F5F7F8] transition-colors hover:bg-white/[0.05]"
              >
                <RefreshCw size={14} />
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const activeAlerts = alerts?.alerts || [];

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 sm:space-y-8">
      {/* Header */}
      <section>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <p className="text-xs text-[#8A9AA3] sm:text-sm">
              {new Date().toLocaleDateString(
                "en-IN",
                {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }
              )}
            </p>

            <h1 className="mt-1 break-words text-2xl font-semibold tracking-tight text-[#F5F7F8] sm:text-3xl lg:text-4xl">
              {location} Air Intelligence
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64757d]">
              Monitor current conditions and understand
              where air quality is heading before
              pollution peaks.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 text-xs text-[#64757d]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#35D07F] opacity-40" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-[#35D07F]" />
            </span>

            Live environmental data
          </div>
        </div>
      </section>

      {/* AQI + Upcoming Risk */}
      <div className="grid min-w-0 gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <AQIOverview data={environment} />

        <UpcomingRisk
          forecast={forecast}
          hotspots={hotspots}
          prediction={prediction}
        />
      </div>

      {/* Weather */}
      <WeatherMetrics
        data={environment?.weather}
      />

      {/* Forecast + Hotspots */}
      <div className="grid min-w-0 gap-5 xl:grid-cols-[1.5fr_0.8fr]">
        <ForecastPreview data={forecast} />

        <HotspotSummary data={hotspots} />
      </div>

      {/* Alerts */}
      <section className="rounded-2xl border border-white/10 bg-[#101B20] p-4 sm:p-5 lg:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#64757d] sm:text-xs">
              Live Alerts
            </p>

            <h3 className="mt-1 text-base font-semibold text-[#F5F7F8] sm:text-lg">
              Environmental risk status
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#8A9AA3]">
            <Activity
              size={14}
              className="text-[#29C7F6]"
            />

            {activeAlerts.length} active{" "}
            {activeAlerts.length === 1
              ? "alert"
              : "alerts"}
          </div>
        </div>

        {activeAlerts.length > 0 ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {activeAlerts.map((alert, index) => (
              <div
                key={`${alert.title}-${index}`}
                className="rounded-xl border border-[#FFB547]/20 bg-[#FFB547]/[0.05] p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FFB547]/10 text-[#FFB547]">
                    <AlertTriangle size={15} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <p className="text-sm font-medium leading-5 text-[#F5F7F8]">
                        {alert.title}
                      </p>

                      <span className="w-fit shrink-0 rounded-full bg-[#FFB547]/10 px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider text-[#FFB547]">
                        {alert.severity}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-[#8A9AA3]">
                      {alert.message}
                    </p>

                    {alert.pollutant && (
                      <p className="mt-2 text-[10px] text-[#64757d]">
                        Pollutant:{" "}
                        <span className="text-[#8A9AA3]">
                          {alert.pollutant}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-xl border border-[#35D07F]/15 bg-[#35D07F]/[0.05] p-4">
            <p className="text-sm font-medium text-[#35D07F]">
              No active alerts
            </p>

            <p className="mt-1 text-sm leading-6 text-[#8A9AA3]">
              Current environmental conditions are
              not triggering any configured pollution
              alerts.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;