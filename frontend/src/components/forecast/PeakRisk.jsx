import {
  AlertTriangle,
  Clock3,
  MapPin,
  TrendingUp,
} from "lucide-react";

function PeakRisk({ forecast, peakPrediction }) {
  const peakAQI = Number(peakPrediction?.estimatedAQI) || 0;

  const category =
    peakPrediction?.category ||
    getAQICategory(peakAQI);

  const location =
    forecast?.location?.name ||
    "Current location";

  const time = peakPrediction?.dateTime
    ? formatDateTime(peakPrediction.dateTime)
    : "Forecast period";

  return (
    <section className="min-w-0 rounded-2xl border border-[#FFB547]/20 bg-[#101B20] p-4 sm:p-5 lg:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#64757d] sm:text-xs">
            Peak Risk
          </p>

          <h2 className="mt-1 text-base font-semibold text-[#F5F7F8] sm:text-lg">
            Predicted pollution spike
          </h2>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFB547]/10 text-[#FFB547]">
          <AlertTriangle size={20} />
        </div>
      </div>

      <div className="mt-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-start gap-2 text-sm text-[#8A9AA3]">
              <MapPin
                size={14}
                className="mt-0.5 shrink-0 text-[#29C7F6]"
              />

              <span className="break-words">
                {location}
              </span>
            </div>

            <div className="mt-2 flex items-start gap-2 text-xs text-[#64757d]">
              <Clock3
                size={13}
                className="mt-0.5 shrink-0"
              />

              <span>{time}</span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-4xl font-semibold text-[#FFB547] sm:text-5xl">
              {peakPrediction ? peakAQI : "—"}
            </p>

            <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#64757d]">
              {peakPrediction ? category : "Unavailable"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
        <div className="flex items-start gap-3">
          <TrendingUp
            size={17}
            className="mt-0.5 shrink-0 text-[#FF5A5F]"
          />

          <p className="text-sm leading-6 text-[#8A9AA3]">
            {peakPrediction
              ? getPeakMessage(peakAQI)
              : "Peak forecast information is currently unavailable."}
          </p>
        </div>
      </div>

      {peakPrediction && (
        <div className="mt-5 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
          <MiniMetric
            label="Current AQI"
            value={forecast?.currentAQI ?? "—"}
          />

          <MiniMetric
            label="Peak category"
            value={category}
          />
        </div>
      )}

      <div className="mt-5 text-[10px] leading-5 text-[#64757d]">
        {peakPrediction
          ? "Higher pollution levels are expected during this forecast point."
          : "Forecast conditions are currently unavailable."}
      </div>
    </section>
  );
}

function MiniMetric({ label, value }) {
  return (
    <div className="min-w-0 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
      <p className="text-[10px] text-[#64757d]">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-semibold text-[#F5F7F8]">
        {value}
      </p>
    </div>
  );
}

function getPeakMessage(aqi) {
  if (aqi <= 50) {
    return "The forecast remains in the good range. No significant pollution spike is currently expected.";
  }

  if (aqi <= 100) {
    return "Air quality is expected to remain satisfactory, although conditions may change with weather and pollution levels.";
  }

  if (aqi <= 200) {
    return "AQI is expected to reach the moderately polluted range. Prolonged outdoor activity should be reduced during the peak period.";
  }

  if (aqi <= 300) {
    return "Poor air quality is predicted during the peak period. Sensitive individuals should limit prolonged outdoor exposure.";
  }

  if (aqi <= 400) {
    return "Very poor air quality is predicted. Prolonged outdoor exposure should be minimized.";
  }

  return "Severe pollution is predicted. Outdoor exposure should be minimized and local health advisories should be followed.";
}

function getAQICategory(aqi) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Satisfactory";
  if (aqi <= 200) return "Moderately Polluted";
  if (aqi <= 300) return "Poor";
  if (aqi <= 400) return "Very Poor";

  return "Severe";
}

function formatDateTime(dateTime) {
  const date = new Date(
    String(dateTime).replace(" ", "T")
  );

  if (Number.isNaN(date.getTime())) {
    return String(dateTime);
  }

  return date.toLocaleString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    day: "numeric",
    month: "short",
  });
}

export default PeakRisk;