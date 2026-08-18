import {
  Thermometer,
  Droplets,
  Wind,
  Gauge,
} from "lucide-react";

function WeatherMetrics({ data }) {
  const temperature = Number(data?.temperature);
  const feelsLike = Number(data?.feelsLike);
  const humidity = Number(data?.humidity);
  const windSpeed = Number(data?.windSpeed);
  const windDirection = Number(data?.windDirection);
  const pressure = Number(data?.pressure);

  const metrics = [
    {
      label: "Temperature",
      value: Number.isFinite(temperature)
        ? `${Math.round(temperature)}°C`
        : "—",
      description: Number.isFinite(feelsLike)
        ? `Feels like ${Math.round(
            feelsLike
          )}°C`
        : "Unavailable",
      icon: Thermometer,
    },
    {
      label: "Humidity",
      value: Number.isFinite(humidity)
        ? `${Math.round(humidity)}%`
        : "—",
      description: "Relative humidity",
      icon: Droplets,
    },
    {
      label: "Wind Speed",
      value: Number.isFinite(windSpeed)
        ? `${windSpeed.toFixed(1)} km/h`
        : "—",
      description: Number.isFinite(
        windDirection
      )
        ? `${getWindDirection(windDirection)}`
        : "Wind direction unavailable",
      icon: Wind,
    },
    {
      label: "Pressure",
      value: Number.isFinite(pressure)
        ? `${Math.round(pressure)}`
        : "—",
      description: "hPa",
      icon: Gauge,
    },
  ];

  return (
    <section>
      <div className="mb-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#64757d] sm:text-xs">
          Environmental Conditions
        </p>

        <h3 className="mt-1 text-base font-semibold text-[#F5F7F8] sm:text-lg">
          Current conditions
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.label}
              className="rounded-2xl border border-white/10 bg-[#101B20] p-4 transition-colors hover:border-white/15 sm:p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-[#8A9AA3]">
                  {metric.label}
                </span>

                <Icon
                  size={17}
                  className="shrink-0 text-[#29C7F6]"
                />
              </div>

              <p className="mt-5 break-words text-xl font-semibold text-[#F5F7F8] sm:text-2xl">
                {metric.value}
              </p>

              <p className="mt-1 text-xs text-[#64757d]">
                {metric.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function getWindDirection(degrees) {
  if (!Number.isFinite(degrees)) {
    return "Unknown";
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

  const normalized =
    ((degrees % 360) + 360) % 360;

  const index =
    Math.round(normalized / 45) % 8;

  return `${directions[index]} wind`;
}

export default WeatherMetrics;