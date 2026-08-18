import { useEffect, useMemo, useState } from "react";
import { MapPinned, Activity } from "lucide-react";
import { useOutletContext } from "react-router-dom";

import PollutionMap from "../components/heatmap/PollutionMap";
import MapLegend from "../components/heatmap/MapLegend";
import HotspotPanel from "../components/heatmap/HotspotPanel";
import HotspotFilters from "../components/heatmap/HotspotFilters";
import { getEnvironment } from "../services/api";

function Heatmap() {
  const { location } = useOutletContext();

  const [environment, setEnvironment] = useState(null);
  const [selectedHotspot, setSelectedHotspot] =
    useState(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*
   * Fetch the same environment data used by
   * the dashboard.
   *
   * This gives the heatmap access to the real
   * CPCB monitoring stations.
   */
  useEffect(() => {
    async function loadHeatmapData() {
      try {
        setLoading(true);
        setError("");
        setSelectedHotspot(null);

        const data =
          await getEnvironment(location);

        setEnvironment(data);
      } catch (err) {
        setError(
          err.message ||
            "Failed to load pollution data"
        );
      } finally {
        setLoading(false);
      }
    }

    if (location) {
      loadHeatmapData();
    }
  }, [location]);

  /*
   * Real CPCB station data.
   */
  const hotspots = useMemo(() => {
    const stations =
      environment?.airQuality?.stations || [];

    return stations
      .map((station, index) => {
        const latitude = Number(
          station?.coordinates?.latitude
        );

        const longitude = Number(
          station?.coordinates?.longitude
        );

        const aqi = Number(
          station?.aqi
        );

        if (
          !Number.isFinite(latitude) ||
          !Number.isFinite(longitude) ||
          !Number.isFinite(aqi)
        ) {
          return null;
        }

        return {
          id:
            station.station ||
            `station-${index}`,

          name:
            station.station ||
            "Unknown station",

          latitude,
          longitude,

          aqi,

          category:
            station.category ||
            "Unknown",

          primaryPollutant:
            station.primaryPollutant ||
            "Unknown",

          lastUpdate:
            station.lastUpdate ||
            null,
        };
      })
      .filter(Boolean);
  }, [environment]);

  /*
   * Search stations by name.
   */
  const filteredHotspots = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    if (!query) {
      return hotspots;
    }

    return hotspots.filter((hotspot) =>
      hotspot.name
        .toLowerCase()
        .includes(query)
    );
  }, [hotspots, search]);

  /*
   * Keep the selected station valid when
   * filtering/searching.
   */
  useEffect(() => {
    if (!selectedHotspot) {
      return;
    }

    const stillExists =
      filteredHotspots.some(
        (hotspot) =>
          hotspot.id ===
          selectedHotspot.id
      );

    if (!stillExists) {
      setSelectedHotspot(null);
    }
  }, [
    filteredHotspots,
    selectedHotspot,
  ]);

  /*
   * Loading state.
   */
  if (loading) {
    return (
      <div className="mx-auto flex min-h-[400px] max-w-[1600px] items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#29C7F6]" />

          <p className="mt-4 text-sm text-[#8A9AA3]">
            Loading CPCB monitoring stations...
          </p>
        </div>
      </div>
    );
  }

  /*
   * Error state.
   */
  if (error) {
    return (
      <div className="mx-auto max-w-[1600px] px-0">
        <div className="rounded-2xl border border-[#FF5A5F]/20 bg-[#101B20] p-5 sm:p-6">
          <p className="text-sm font-medium text-[#FF5A5F]">
            Unable to load pollution data
          </p>

          <p className="mt-2 text-sm leading-6 text-[#8A9AA3]">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 sm:space-y-8">
      {/* Header */}
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-[#8A9AA3] sm:text-sm">
            <MapPinned
              size={15}
              className="shrink-0 text-[#29C7F6]"
            />

            <span>
              Pollution Intelligence
            </span>
          </div>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#F5F7F8] sm:text-3xl">
            {location} Pollution Heatmap
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64757d]">
            Explore live CPCB monitoring stations and
            identify locations experiencing higher
            pollution levels.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-xs text-[#64757d]">
          <Activity
            size={14}
            className="text-[#35D07F]"
          />

          Live CPCB monitoring
        </div>
      </section>

      {/* Filters */}
      <HotspotFilters
        search={search}
        onSearchChange={setSearch}
      />

      {/* Main content */}
      <div className="grid gap-5 xl:grid-cols-[1.5fr_0.8fr]">
        <div className="relative min-w-0">
          <PollutionMap
            hotspots={filteredHotspots}
            selectedHotspot={selectedHotspot}
            onSelectHotspot={
              setSelectedHotspot
            }
          />

          <MapLegend />
        </div>

        <div className="min-w-0">
          <HotspotPanel
            hotspot={selectedHotspot}
          />
        </div>
      </div>

      {/* Monitoring summary */}
      <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-[#101B20] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <p className="text-sm text-[#8A9AA3]">
          Monitoring{" "}
          <span className="font-medium text-[#F5F7F8]">
            {filteredHotspots.length}
          </span>{" "}
          CPCB stations
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#64757d]">
          <span>
            City AQI:{" "}
            <span className="text-[#F5F7F8]">
              {environment?.airQuality?.aqi ??
                "—"}
            </span>
          </span>

          <span className="hidden h-1 w-1 rounded-full bg-[#64757d] sm:block" />

          <span>
            Highest risk:{" "}
            <span className="text-[#FFB547]">
              {environment?.airQuality
                ?.highestRisk?.aqi ??
                "—"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Heatmap;