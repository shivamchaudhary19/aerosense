import {
  Wind,
  Droplets,
  Thermometer,
  Cloud,
} from "lucide-react";

const factors = [
  {
    label: "Temperature",
    value: "31°C",
    detail: "Feels like 34°C",
    icon: Thermometer,
  },
  {
    label: "Humidity",
    value: "68%",
    detail: "Moderately humid",
    icon: Droplets,
  },
  {
    label: "Wind",
    value: "4.3 km/h",
    detail: "NW direction",
    icon: Wind,
  },
  {
    label: "Cloud Cover",
    value: "22%",
    detail: "Mostly clear",
    icon: Cloud,
  },
];

function EnvironmentalFactors() {
  return (
    <section>
      <div className="mb-4">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#64757d]">
          Environmental Factors
        </p>

        <h2 className="mt-1 text-lg font-semibold text-[#F5F7F8]">
          Conditions influencing the forecast
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {factors.map((factor) => {
          const Icon = factor.icon;

          return (
            <div
              key={factor.label}
              className="rounded-2xl border border-white/10 bg-[#101B20] p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8A9AA3]">
                  {factor.label}
                </span>

                <Icon size={17} className="text-[#29C7F6]" />
              </div>

              <p className="mt-5 text-xl font-semibold text-[#F5F7F8]">
                {factor.value}
              </p>

              <p className="mt-1 text-xs text-[#64757d]">
                {factor.detail}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default EnvironmentalFactors;