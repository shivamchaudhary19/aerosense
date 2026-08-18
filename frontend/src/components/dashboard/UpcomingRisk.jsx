import {
  AlertTriangle,
  Clock3,
  MapPin,
  TrendingUp,
} from "lucide-react";

function getAQIColor(aqi) {
  if (aqi <= 50) return "#35D07F";
  if (aqi <= 100) return "#9BC53D";
  if (aqi <= 200) return "#FFB547";
  if (aqi <= 300) return "#FF7A59";
  return "#FF5A5F";
}

function getAQICategory(aqi) {
  const value = Number(aqi);

  if (!Number.isFinite(value)) {
    return "Unknown";
  }

  if (value <= 50) return "Good";
  if (value <= 100) return "Satisfactory";
  if (value <= 200) return "Moderate";
  if (value <= 300) return "Poor";
  if (value <= 400) return "Very Poor";

  return "Severe";
}

function UpcomingRisk({
  forecast,
  hotspots,
  prediction,
}) {
  const predictions = Array.isArray(
    forecast?.predictions
  )
    ? forecast.predictions
    : [];

  const highestPrediction =
    predictions.reduce(
      (highest, current) => {
        const currentAQI = Number(
          current?.estimatedAQI
        );

        if (
          !Number.isFinite(currentAQI)
        ) {
          return highest;
        }

        if (!highest) {
          return current;
        }

        const highestAQI = Number(
          highest?.estimatedAQI
        );

        return currentAQI > highestAQI
          ? current
          : highest;
      },
      null
    );

  const stations = Array.isArray(
    hotspots?.airQuality?.stations
  )
    ? hotspots.airQuality.stations
    : Array.isArray(hotspots?.stations)
    ? hotspots.stations
    : [];

  const highestHotspot =
    [...stations]
      .filter((station) =>
        Number.isFinite(
          Number(station?.aqi)
        )
      )
      .sort(
        (a, b) =>
          Number(b.aqi) - Number(a.aqi)
      )[0] || null;

  const predictedAQI =
    highestPrediction?.estimatedAQI ??
    prediction?.prediction?.predictedAQI ??
    null;

  let riskLocation =
    "Selected location";

  if (
    typeof highestHotspot?.station ===
    "string"
  ) {
    riskLocation =
      highestHotspot.station;
  } else if (
    typeof forecast?.location?.name ===
    "string"
  ) {
    riskLocation =
      forecast.location.name;
  } else if (
    typeof hotspots?.location ===
    "string"
  ) {
    riskLocation =
      hotspots.location;
  }

  const peakTime =
    highestPrediction?.dateTime
      ? formatTime(
          highestPrediction.dateTime
        )
      : "Upcoming period";

  const category =
    typeof highestPrediction?.category ===
    "string"
      ? highestPrediction.category
      : typeof prediction?.prediction
          ?.category === "string"
      ? prediction.prediction.category
      : getAQICategory(predictedAQI);

  const numericAQI = Number(
    predictedAQI
  );

  const color = getAQIColor(
    Number.isFinite(numericAQI)
      ? numericAQI
      : 0
  );

  return (
    <section className="min-w-0 rounded-2xl border border-white/10 bg-[#101B20] p-4 sm:p-5 lg:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#64757d] sm:text-xs">
            Upcoming Risk
          </p>

          <h3 className="mt-1 text-base font-semibold text-[#F5F7F8] sm:text-lg">
            {predictedAQI !== null
              ? "Highest forecasted AQI"
              : "Risk assessment"}
          </h3>
        </div>

        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{
            color,
            backgroundColor: `${color}15`,
          }}
        >
          <AlertTriangle size={20} />
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 sm:p-5">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-2 text-sm font-medium text-[#F5F7F8]">
              <MapPin
                size={14}
                className="shrink-0 text-[#29C7F6]"
              />

              <span className="truncate">
                {riskLocation}
              </span>
            </div>

            <div className="mt-2 flex items-center gap-2 text-xs text-[#8A9AA3]">
              <Clock3 size={13} />

              <span>{peakTime}</span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <p
              className="text-4xl font-semibold tracking-tight sm:text-5xl"
              style={{ color }}
            >
              {predictedAQI ?? "—"}
            </p>

            <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#64757d]">
              predicted AQI
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
        <div className="flex items-start gap-3">
          <TrendingUp
            size={17}
            className="mt-0.5 shrink-0 text-[#FFB547]"
          />

          <div className="min-w-0">
            <p className="text-xs font-medium text-[#FFB547]">
              Forecast insight
            </p>

            <p className="mt-2 text-sm leading-6 text-[#8A9AA3]">
              {predictedAQI !== null
                ? `The forecast indicates a peak AQI of ${predictedAQI} during the upcoming period. Current risk category: ${category}.`
                : "Forecast data is currently unavailable."}
            </p>
          </div>
        </div>
      </div>

      {highestHotspot && (
        <div className="mt-4 flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[#64757d]">
            Highest current station
          </span>

          <span className="font-medium text-[#F5F7F8]">
            {typeof highestHotspot.station ===
            "string"
              ? highestHotspot.station
              : "Unknown station"}{" "}
            <span
              style={{
                color: getAQIColor(
                  Number(
                    highestHotspot.aqi
                  )
                ),
              }}
            >
              ({highestHotspot.aqi})
            </span>
          </span>
        </div>
      )}
    </section>
  );
}

function formatTime(dateTime) {
  if (!dateTime) {
    return "Upcoming period";
  }

  const raw = String(dateTime);

  const date = new Date(
    raw.includes("T")
      ? raw
      : raw.replace(" ", "T")
  );

  if (Number.isNaN(date.getTime())) {
    return raw;
  }

  return date.toLocaleTimeString(
    "en-IN",
    {
      hour: "numeric",
      minute: "2-digit",
    }
  );
}

export default UpcomingRisk;