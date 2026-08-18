import { useMemo, useState } from "react";
import { Bell, Activity } from "lucide-react";

import AlertSummary from "../components/alerts/AlertSummary";
import AlertFilters from "../components/alerts/AlertFilters";
import AlertCard from "../components/alerts/AlertCard";
import AlertDetails from "../components/alerts/AlertDetails";

const alerts = [
  {
    id: "alert-001",
    severity: "high",
    location: "Sector 62",
    time: "4:00 PM – 7:00 PM",
    predictedAQI: 187,
    category: "Unhealthy",
    audience: "citizen",
    title: "AQI expected to rise sharply during evening hours.",
    recommendation:
      "Reduce prolonged outdoor activity during the predicted peak. Sensitive individuals should consider remaining indoors and limiting exposure.",
  },
  {
    id: "alert-002",
    severity: "high",
    location: "Sector 63",
    time: "5:00 PM – 8:00 PM",
    predictedAQI: 174,
    category: "Unhealthy",
    audience: "school",
    title: "Elevated pollution conditions predicted near the area.",
    recommendation:
      "Schools should consider limiting outdoor physical activities during the predicted high-risk period.",
  },
  {
    id: "alert-003",
    severity: "medium",
    location: "Sector 18",
    time: "4:00 PM – 6:00 PM",
    predictedAQI: 161,
    category: "Unhealthy",
    audience: "sensitive-group",
    title: "Air quality may become unhealthy for sensitive groups.",
    recommendation:
      "Sensitive individuals should reduce prolonged outdoor exposure and monitor local air-quality conditions.",
  },
  {
    id: "alert-004",
    severity: "medium",
    location: "Sector 15",
    time: "3:00 PM – 6:00 PM",
    predictedAQI: 148,
    category: "Moderate",
    audience: "government",
    title: "Pollution levels approaching elevated-risk threshold.",
    recommendation:
      "Prioritize monitoring of traffic-heavy areas and prepare targeted interventions if pollution continues rising.",
  },
];

function Alerts() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedAlert, setSelectedAlert] = useState(alerts[0]);

  const filteredAlerts = useMemo(() => {
    if (activeFilter === "all") {
      return alerts;
    }

    return alerts.filter((alert) => alert.audience === activeFilter);
  }, [activeFilter]);

  return (
    <div className="mx-auto max-w-[1600px] space-y-8">
      {/* Header */}
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2 text-sm text-[#8A9AA3]">
            <Bell size={15} className="text-[#29C7F6]" />
            Predictive Warning System
          </div>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#F5F7F8]">
            Smart Alerts
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64757d]">
            Turn predicted pollution events into timely, location-specific
            actions for citizens, schools and authorities.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#64757d]">
          <Activity size={14} className="text-[#35D07F]" />
          Predictive monitoring active
        </div>
      </section>

      {/* Summary */}
      <AlertSummary alerts={alerts} />

      {/* Filters */}
      <AlertFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Alerts + details */}
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-3">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                selected={selectedAlert?.id === alert.id}
                onSelect={setSelectedAlert}
              />
            ))
          ) : (
            <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-white/10 bg-[#101B20] p-6">
              <div className="text-center">
                <Bell
                  size={24}
                  className="mx-auto text-[#64757d]"
                />

                <p className="mt-3 text-sm font-medium text-[#F5F7F8]">
                  No alerts found
                </p>

                <p className="mt-1 text-xs text-[#64757d]">
                  Try another audience filter.
                </p>
              </div>
            </div>
          )}
        </div>

        <AlertDetails alert={selectedAlert} />
      </div>

      {/* Demo indicator */}
      <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-[#101B20] px-5 py-4 text-xs text-[#64757d] sm:flex-row sm:items-center sm:justify-between">
        <span>
          Alerts are currently displayed using demo prediction data.
        </span>

        <span className="text-[#8A9AA3]">
          Backend integration will replace these values.
        </span>
      </div>
    </div>
  );
}

export default Alerts;