import {
  Sparkles,
  ShieldAlert,
  TrafficCone,
  School,
  Leaf,
} from "lucide-react";

const actions = [
  {
    icon: TrafficCone,
    title: "Traffic intervention",
    description:
      "Prioritize traffic management around Sector 62 and Sector 63 during the predicted evening peak.",
  },
  {
    icon: School,
    title: "School advisory",
    description:
      "Recommend limiting outdoor physical activities in high-risk zones during peak pollution hours.",
  },
  {
    icon: Leaf,
    title: "Dust control",
    description:
      "Increase monitoring of construction and road-dust sources in priority areas.",
  },
];

function PolicySummary() {
  return (
    <section className="rounded-2xl border border-[#29C7F6]/15 bg-[#101B20] p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#29C7F6]/10 text-[#29C7F6]">
          <Sparkles size={19} />
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#29C7F6]">
            AI Action Layer
          </p>

          <h2 className="mt-1 text-lg font-semibold text-[#F5F7F8]">
            Recommended interventions
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#64757d]">
            Actions generated from predicted pollution conditions and
            identified high-risk zones.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <div
              key={action.title}
              className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"
            >
              <div className="flex items-start gap-3">
                <Icon
                  size={17}
                  className="mt-0.5 shrink-0 text-[#29C7F6]"
                />

                <div>
                  <p className="text-sm font-medium text-[#F5F7F8]">
                    {action.title}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#64757d]">
                    {action.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-start gap-2 rounded-lg border border-[#FFB547]/10 bg-[#FFB547]/[0.04] p-3">
        <ShieldAlert
          size={15}
          className="mt-0.5 shrink-0 text-[#FFB547]"
        />

        <p className="text-[11px] leading-5 text-[#8A9AA3]">
          Recommendations are generated from structured forecast and hotspot
          data. The AI action layer does not generate AQI predictions.
        </p>
      </div>
    </section>
  );
}

export default PolicySummary;