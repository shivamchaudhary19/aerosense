import {
  MapPin,
  TrendingUp,
  Clock3,
  Wind,
  ChevronRight,
} from "lucide-react";

function HotspotPanel({ hotspot }) {
  if (!hotspot) {
    return (
      <section className="flex min-h-[600px] items-center justify-center rounded-2xl border border-white/10 bg-[#101B20] p-6">
        <div className="max-w-xs text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#29C7F6]/10 text-[#29C7F6]">
            <MapPin size={22} />
          </div>

          <h3 className="mt-4 text-base font-semibold text-[#F5F7F8]">
            Select a hotspot
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#64757d]">
            Select a pollution hotspot on the map to view its predicted risk
            and environmental details.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-[#101B20] p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#64757d]">
            Selected Hotspot
          </p>

          <div className="mt-2 flex items-center gap-2">
            <MapPin size={17} className="text-[#29C7F6]" />

            <h2 className="text-xl font-semibold text-[#F5F7F8]">
              {hotspot.name}
            </h2>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            hotspot.aqi > 150
              ? "bg-[#FF5A5F]/10 text-[#FF5A5F]"
              : "bg-[#FFB547]/10 text-[#FFB547]"
          }`}
        >
          {hotspot.category}
        </span>
      </div>

      {/* AQI */}
      <div className="mt-8 rounded-xl border border-white/[0.07] bg-white/[0.025] p-5">
        <p className="text-xs text-[#64757d]">
          Predicted AQI
        </p>

        <div className="mt-2 flex items-end gap-2">
          <span className="text-5xl font-semibold text-[#F5F7F8]">
            {hotspot.aqi}
          </span>

          <span className="mb-2 text-xs text-[#64757d]">
            next peak
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="mt-5 space-y-3">
        <DetailRow
          icon={TrendingUp}
          label="Trend"
          value="Rising"
          valueClass="text-[#FF5A5F]"
        />

        <DetailRow
          icon={Clock3}
          label="Peak period"
          value="4 PM – 7 PM"
        />

        <DetailRow
          icon={Wind}
          label="Wind"
          value="4.3 km/h NW"
        />
      </div>

      {/* Recommendation */}
      <div className="mt-6 rounded-xl border border-[#29C7F6]/10 bg-[#29C7F6]/[0.04] p-4">
        <p className="text-xs font-medium text-[#29C7F6]">
          Recommended action
        </p>

        <p className="mt-2 text-sm leading-6 text-[#8A9AA3]">
          Pollution is expected to increase during the evening. Consider
          reducing prolonged outdoor activity during the predicted peak.
        </p>
      </div>

      <button className="mt-5 flex w-full items-center justify-between rounded-lg border border-white/10 px-4 py-3 text-sm font-medium text-[#F5F7F8] transition-colors hover:bg-white/[0.04]">
        View detailed forecast

        <ChevronRight size={16} className="text-[#64757d]" />
      </button>
    </section>
  );
}

function DetailRow({ icon: Icon, label, value, valueClass = "text-[#F5F7F8]" }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
      <div className="flex items-center gap-3">
        <Icon size={16} className="text-[#64757d]" />
        <span className="text-sm text-[#8A9AA3]">{label}</span>
      </div>

      <span className={`text-sm font-medium ${valueClass}`}>
        {value}
      </span>
    </div>
  );
}

export default HotspotPanel;