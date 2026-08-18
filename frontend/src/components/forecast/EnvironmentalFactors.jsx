import {
  Wind,
  Droplets,
  Thermometer,
  Cloud,
} from "lucide-react";

function EnvironmentalFactors({ forecast }) {
  const current =
    forecast?.predictions?.[0] || null;

  const factors = [
    {
      label: "Temperature",
      value: formatNumber(
        current?.temperature,
        "°C"
      ),
      detail: current?.feelsLike
        ? `Feels like ${formatNumber(
            current.feelsLike,
            "°C"
          )}`
        : "Data unavailable",
      icon: Thermometer,
    },
    {
      label: "Humidity",
      value: formatNumber(
        current?.humidity,
        "%"
      ),
      detail: getHumidityDetail(
        current?.humidity
      ),
      icon: Droplets,
    },
    {
      label: "Wind",
      value: formatNumber(
        current?.windSpeed,
        " m/s"
      ),
      detail: getWindDirection(
        current?.windDirection
      ),
      icon: Wind,
    },
    {
      label: "Cloud Cover",
      value: formatNumber(
        current?.cloudCover,
        "%"
      ),
      detail: getCloudDetail(
        current?.cloudCover
      ),
      icon: Cloud,
    },
  ];

  return (
    <section>
      <div className="mb-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#64757d] sm:text-xs">
          Environmental Factors
        </p>

        <h2 className="mt-1 text-base font-semibold text-[#F5F7F8] sm:text-lg">
          Conditions influencing the forecast
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 xl:grid-cols-4">
        {factors.map((factor) => {
          const Icon = factor.icon;

          return (
            <div
              key={factor.label}
              className="rounded-2xl border border-white/10 bg-[#101B20] p-4 sm:p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-[#8A9AA3]">
                  {factor.label}
                </span>

                <Icon
                  size={17}
                  className="shrink-0 text-[#29C7F6]"
                />
              </div>

              <p className="mt-4 break-words text-xl font-semibold text-[#F5F7F8] sm:mt-5">
                {factor.value}
              </p>

              <p className="mt-1 break-words text-xs leading-5 text-[#64757d]">
                {factor.detail}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function formatNumber(value, suffix = "") {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "—";
  }

  return `${number % 1 === 0
    ? number
    : number.toFixed(1)}${suffix}`;
}

function getHumidityDetail(humidity) {
  const value = Number(humidity);

  if (!Number.isFinite(value)) {
    return "Data unavailable";
  }

  if (value < 40) {
    return "Low humidity";
  }

  if (value <= 70) {
    return "Moderate humidity";
  }

  if (value <= 85) {
    return "High humidity";
  }

  return "Very high humidity";
}

function getWindDirection(degrees) {
  const value = Number(degrees);

  if (!Number.isFinite(value)) {
    return "Direction unavailable";
  }

  const directions = [
    "N",
    "NE",
    "E",
    "SE",
    "S",
    "SW",
    "W",
    "NW",
  ];

  const index =
    Math.round(value / 45) % 8;

  return `${directions[index]} direction`;
}

function getCloudDetail(cloudCover) {
  const value = Number(cloudCover);

  if (!Number.isFinite(value)) {
    return "Data unavailable";
  }

  if (value <= 20) {
    return "Mostly clear";
  }

  if (value <= 50) {
    return "Partly cloudy";
  }

  if (value <= 80) {
    return "Mostly cloudy";
  }

  return "Overcast";
}

export default EnvironmentalFactors;