import {
  Thermometer,
  Droplets,
  Wind,
  Gauge,
} from "lucide-react";

const metrics = [
  {
    label: "Temperature",
    value: "31°C",
    description: "Feels like 34°C",
    icon: Thermometer,
  },
  {
    label: "Humidity",
    value: "68%",
    description: "Moderately humid",
    icon: Droplets,
  },
  {
    label: "Wind Speed",
    value: "4.3",
    description: "km/h · NW",
    icon: Wind,
  },
  {
    label: "Pressure",
    value: "1008",
    description: "hPa",
    icon: Gauge,
  },
];

function WeatherMetrics() {
  return (
    <section>
      <div className="mb-4">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#64757d]">
          Environmental Conditions
        </p>

        <h3 className="mt-1 text-lg font-semibold text-[#F5F7F8]">
          Current conditions
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.label}
              className="rounded-2xl border border-white/10 bg-[#101B20] p-5 transition-colors hover:border-white/15"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8A9AA3]">
                  {metric.label}
                </span>

                <Icon size={17} className="text-[#29C7F6]" />
              </div>

              <p className="mt-5 text-2xl font-semibold text-[#F5F7F8]">
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

export default WeatherMetrics;