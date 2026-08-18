import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";

import ForecastHeader from "../components/forecast/ForecastHeader";
import ForecastTabs from "../components/forecast/ForecastTabs";
import ForecastChart from "../components/forecast/ForecastChart";
import PeakRisk from "../components/forecast/PeakRisk";
import EnvironmentalFactors from "../components/forecast/EnvironmentalFactors";
import { getForecast } from "../services/api";

function Forecast() {
  const { location } = useOutletContext();

  const [selectedHours, setSelectedHours] = useState(24);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadForecast() {
      try {
        setLoading(true);
        setError("");

        const data = await getForecast(
          location,
          selectedHours
        );

        if (!cancelled) {
          setForecast(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err?.message ||
              "Failed to load forecast data."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (location) {
      loadForecast();
    }

    return () => {
      cancelled = true;
    };
  }, [location, selectedHours]);

  const chartData = useMemo(() => {
    return (
      forecast?.predictions?.map((item) => ({
        time: formatTime(item.dateTime),
        aqi: Number(item.estimatedAQI) || 0,
        category: item.category,
        dateTime: item.dateTime,
      })) || []
    );
  }, [forecast]);

  const peakPrediction = useMemo(() => {
    if (!forecast?.predictions?.length) {
      return null;
    }

    return forecast.predictions.reduce(
      (highest, current) => {
        if (
          !highest ||
          Number(current.estimatedAQI) >
            Number(highest.estimatedAQI)
        ) {
          return current;
        }

        return highest;
      },
      null
    );
  }, [forecast]);

  if (loading) {
    return (
      <div className="mx-auto flex min-h-[400px] w-full max-w-[1600px] items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#29C7F6]" />

          <p className="mt-4 text-sm text-[#8A9AA3]">
            Loading AQI forecast...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="rounded-2xl border border-[#FF5A5F]/20 bg-[#101B20] p-5 sm:p-6">
          <p className="text-sm font-medium text-[#FF5A5F]">
            Unable to load forecast
          </p>

          <p className="mt-2 break-words text-sm leading-6 text-[#8A9AA3]">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-[#F5F7F8] transition-colors hover:bg-white/[0.05]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 sm:space-y-8">
      {/* Header */}
      <ForecastHeader
        location={location}
        forecast={forecast}
      />

      {/* Current forecast information */}
      <section className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#101B20] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#64757d]">
            Forecast location
          </p>

          <p className="mt-1 truncate text-base font-semibold text-[#F5F7F8] sm:text-lg">
            {forecast?.location?.name ||
              location ||
              "—"}
          </p>

          <p className="mt-1 text-xs text-[#64757d]">
            {forecast?.forecastHorizon ||
              `${selectedHours} hours`}
          </p>
        </div>

        <div className="shrink-0 sm:text-right">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#64757d]">
            Current AQI
          </p>

          <p className="mt-1 text-2xl font-semibold text-[#29C7F6] sm:text-3xl">
            {forecast?.currentAQI ?? "—"}
          </p>

          <p className="mt-1 text-xs text-[#64757d]">
            {forecast?.currentCategory ||
              "Current conditions"}
          </p>
        </div>
      </section>

      {/* Forecast range */}
      <div className="w-full overflow-x-auto pb-1">
        <ForecastTabs
          selectedHours={selectedHours}
          onChange={setSelectedHours}
        />
      </div>

      {/* Main forecast */}
      <div className="grid min-w-0 gap-5 xl:grid-cols-[1.5fr_0.75fr]">
        <div className="min-w-0">
          {chartData.length > 0 ? (
            <ForecastChart
              data={chartData}
              selectedHours={selectedHours}
            />
          ) : (
            <EmptyState message="Forecast data unavailable." />
          )}
        </div>

        <div className="min-w-0">
          <PeakRisk
            forecast={forecast}
            peakPrediction={peakPrediction}
          />
        </div>
      </div>

      {/* Environmental factors */}
      <EnvironmentalFactors
        forecast={forecast}
      />

      {/* Data source */}
      <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-[#101B20] px-4 py-4 text-xs text-[#64757d] sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <span>
          Forecast generated from live environmental
          conditions.
        </span>

        <span className="text-[#8A9AA3]">
          OpenWeather + AeroSense prediction engine
        </span>
      </div>
    </div>
  );
}

function formatTime(dateTime) {
  if (!dateTime) {
    return "—";
  }

  const date = new Date(
    String(dateTime).replace(" ", "T")
  );

  if (Number.isNaN(date.getTime())) {
    return dateTime;
  }

  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function EmptyState({ message }) {
  return (
    <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-white/10 bg-[#101B20] p-6">
      <p className="text-sm text-[#64757d]">
        {message}
      </p>
    </div>
  );
}

export default Forecast;