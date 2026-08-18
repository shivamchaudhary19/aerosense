import { useEffect, useMemo, useState } from "react";
import { Bell, Activity } from "lucide-react";
import { useOutletContext } from "react-router-dom";

import AlertSummary from "../components/alerts/AlertSummary";
import AlertFilters from "../components/alerts/AlertFilters";
import AlertCard from "../components/alerts/AlertCard";
import AlertDetails from "../components/alerts/AlertDetails";

import { getLiveAlerts } from "../services/api";

function Alerts() {
  const { location } = useOutletContext();

  const [alertsData, setAlertsData] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedAlert, setSelectedAlert] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAlerts() {
      try {
        setLoading(true);
        setError("");

        const data = await getLiveAlerts(location);

        setAlertsData(data);

        const firstAlert = data?.alerts?.[0] || null;
        setSelectedAlert(firstAlert);
      } catch (err) {
        setError(
          err.message || "Failed to load environmental alerts"
        );

        setAlertsData(null);
        setSelectedAlert(null);
      } finally {
        setLoading(false);
      }
    }

    if (location) {
      loadAlerts();
    }
  }, [location]);

  const alerts = useMemo(() => {
    if (!alertsData?.alerts?.length) {
      return [];
    }

    return alertsData.alerts.map((alert, index) => ({
      id: `alert-${index}-${alert.pollutant || "general"}`,

      severity:
        alert.severity === "critical" || alert.severity === "high"
          ? "high"
          : "medium",

      location: alertsData.location || location,

      time:
        alertsData.stationLastUpdate ||
        "Live monitoring",

      predictedAQI:
        alert.aqi ?? alertsData.currentAQI ?? "—",

      category:
        alertsData.category || "Unknown",

      audience:
        alert.severity === "critical" ||
        alert.severity === "high"
          ? "sensitive-group"
          : "citizen",

      title:
        alert.title || "Environmental alert",

      recommendation:
        alert.message ||
        "Monitor local air-quality conditions.",

      pollutant:
        alert.pollutant || null,

      value:
        alert.value ?? null,

      unit:
        alert.unit || null,

      station:
        alertsData.station || null,

      stationAQI:
        alertsData.stationAQI ?? null,

      stationCategory:
        alertsData.stationCategory || null,

      stationLastUpdate:
        alertsData.stationLastUpdate || null,
    }));
  }, [alertsData, location]);

  const filteredAlerts = useMemo(() => {
    if (activeFilter === "all") {
      return alerts;
    }

    return alerts.filter(
      (alert) => alert.audience === activeFilter
    );
  }, [alerts, activeFilter]);

  useEffect(() => {
    if (!filteredAlerts.length) {
      setSelectedAlert(null);
      return;
    }

    const selectedStillExists = filteredAlerts.some(
      (alert) => alert.id === selectedAlert?.id
    );

    if (!selectedStillExists) {
      setSelectedAlert(filteredAlerts[0]);
    }
  }, [filteredAlerts, selectedAlert]);

  if (loading) {
    return (
      <div className="mx-auto flex min-h-[400px] max-w-[1600px] items-center justify-center px-4">
        <div className="text-center">
          <Activity
            size={24}
            className="mx-auto animate-pulse text-[#29C7F6]"
          />

          <p className="mt-3 text-sm text-[#8A9AA3]">
            Loading live environmental alerts...
          </p>

          <p className="mt-1 text-xs text-[#64757d]">
            Checking CPCB monitoring data for {location}.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-[1600px] px-1 sm:px-0">
        <div className="rounded-2xl border border-[#FF5A5F]/20 bg-[#101B20] p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FF5A5F]/10 text-[#FF5A5F]">
              <Bell size={20} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-[#FF5A5F]">
                Unable to load alerts
              </p>

              <p className="mt-1 break-words text-sm leading-6 text-[#8A9AA3]">
                {error}
              </p>

              <p className="mt-2 text-xs text-[#64757d]">
                Location: {location}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 px-1 sm:space-y-8 sm:px-0">
      {/* Header */}
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-[#8A9AA3] sm:text-sm">
            <Bell
              size={15}
              className="shrink-0 text-[#29C7F6]"
            />

            <span>Live Environmental Intelligence</span>
          </div>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#F5F7F8] sm:text-3xl lg:text-4xl">
            Smart Alerts
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64757d]">
            Turn live pollution conditions into timely,
            location-specific actions for citizens and
            sensitive groups.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-xs text-[#64757d]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#35D07F]" />

          <Activity
            size={14}
            className="text-[#35D07F]"
          />

          CPCB monitoring active
        </div>
      </section>

      {/* Live status */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatusCard
          label="Current AQI"
          value={alertsData?.currentAQI ?? "—"}
          description={alertsData?.category || "Unknown"}
        />

        <StatusCard
          label="Primary pollutant"
          value={alertsData?.primaryPollutant || "—"}
          description="Highest contributing pollutant"
        />

        <StatusCard
          label="Highest-risk station"
          value={
            alertsData?.station
              ? alertsData.station.replace(/ - .*$/, "")
              : "—"
          }
          description={
            alertsData?.stationAQI
              ? `Station AQI ${alertsData.stationAQI}`
              : "No station data"
          }
        />

        <StatusCard
          label="Monitoring stations"
          value={alertsData?.stationCount ?? "—"}
          description="CPCB stations analyzed"
        />
      </section>

      {/* Summary */}
      <AlertSummary alerts={alerts} />

      {/* Filters */}
      <AlertFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Alerts + details */}
      <div className="grid min-w-0 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="min-w-0 space-y-3">
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
            <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-white/10 bg-[#101B20] p-6">
              <div className="text-center">
                <Bell
                  size={24}
                  className="mx-auto text-[#35D07F]"
                />

                <p className="mt-3 text-sm font-medium text-[#F5F7F8]">
                  No active alerts
                </p>

                <p className="mt-1 max-w-sm text-xs leading-5 text-[#64757d]">
                  Current CPCB monitoring data is not
                  triggering alerts for the selected filter.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="min-w-0">
          <AlertDetails alert={selectedAlert} />
        </div>
      </div>

      {/* Data credibility */}
      <section className="rounded-xl border border-white/10 bg-[#101B20] px-4 py-4 sm:px-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#64757d]">
              Data source
            </p>

            <p className="mt-1 break-words text-sm text-[#F5F7F8]">
              {alertsData?.source ||
                "Central Pollution Control Board / data.gov.in"}
            </p>
          </div>

          <div className="min-w-0 text-left lg:text-right">
            <p className="text-xs text-[#64757d]">
              Methodology
            </p>

            <p className="mt-1 text-xs leading-5 text-[#8A9AA3]">
              {alertsData?.methodology ||
                "CPCB-style calculation from monitoring data"}
            </p>
          </div>
        </div>

        {alertsData?.stationLastUpdate && (
          <div className="mt-4 border-t border-white/[0.07] pt-3 text-xs text-[#64757d]">
            Latest station observation:{" "}
            <span className="text-[#8A9AA3]">
              {alertsData.stationLastUpdate}
            </span>
          </div>
        )}
      </section>
    </div>
  );
}

function StatusCard({
  label,
  value,
  description,
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-[#101B20] p-4 sm:p-5">
      <p className="truncate text-[9px] font-medium uppercase tracking-[0.12em] text-[#64757d] sm:text-[10px]">
        {label}
      </p>

      <p className="mt-2 truncate text-lg font-semibold text-[#F5F7F8] sm:text-xl">
        {value}
      </p>

      <p className="mt-1 truncate text-[10px] leading-5 text-[#64757d] sm:text-xs">
        {description}
      </p>
    </div>
  );
}

export default Alerts;