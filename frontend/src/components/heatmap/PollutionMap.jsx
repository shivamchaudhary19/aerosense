import { useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";

function getAQIColor(aqi) {
  if (aqi <= 50) return "#35D07F";
  if (aqi <= 100) return "#9BC53D";
  if (aqi <= 150) return "#FFB547";
  if (aqi <= 200) return "#FF7A59";

  return "#FF5A5F";
}

function MapRecenter({ location }) {
  const map = useMap();

  useEffect(() => {
    if (!location) return;

    map.flyTo(
      [location.latitude, location.longitude],
      12,
      {
        animate: true,
        duration: 0.8,
      }
    );
  }, [location, map]);

  return null;
}

function PollutionMap({
  hotspots = [],
  selectedHotspot,
  onSelectHotspot,
}) {
  const stations = useMemo(() => {
    return hotspots
      .map((station, index) => {
        const latitude = Number(
          station?.coordinates?.latitude ??
            station?.latitude
        );

        const longitude = Number(
          station?.coordinates?.longitude ??
            station?.longitude
        );

        const aqi = Number(station?.aqi);

        if (
          !Number.isFinite(latitude) ||
          !Number.isFinite(longitude) ||
          !Number.isFinite(aqi)
        ) {
          return null;
        }

        return {
          id:
            station.id ??
            station.station ??
            `station-${index}`,

          name:
            station.name ??
            station.station ??
            "Unknown station",

          latitude,
          longitude,

          aqi,

          category:
            station.category ??
            "Unknown",

          primaryPollutant:
            station.primaryPollutant ??
            "Unknown",

          lastUpdate:
            station.lastUpdate ??
            null,
        };
      })
      .filter(Boolean);
  }, [hotspots]);

  const mapCenter = useMemo(() => {
    if (stations.length > 0) {
      const totalLatitude = stations.reduce(
        (sum, station) =>
          sum + station.latitude,
        0
      );

      const totalLongitude = stations.reduce(
        (sum, station) =>
          sum + station.longitude,
        0
      );

      return {
        latitude:
          totalLatitude / stations.length,
        longitude:
          totalLongitude / stations.length,
      };
    }

    return {
      latitude: 28.5706,
      longitude: 77.3272,
    };
  }, [stations]);

  return (
    <div className="relative h-[380px] w-full overflow-hidden rounded-2xl border border-white/10 sm:h-[480px] md:h-[540px] lg:h-[600px]">
      <MapContainer
        center={[
          mapCenter.latitude,
          mapCenter.longitude,
        ]}
        zoom={12}
        minZoom={9}
        maxZoom={18}
        scrollWheelZoom={true}
        zoomControl={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapRecenter location={mapCenter} />

        {stations.map((station) => {
          const isSelected =
            selectedHotspot?.id === station.id;

          const color =
            getAQIColor(station.aqi);

          return (
            <CircleMarker
              key={station.id}
              center={[
                station.latitude,
                station.longitude,
              ]}
              radius={
                isSelected
                  ? 15
                  : 9
              }
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity:
                  isSelected
                    ? 0.85
                    : 0.6,
                weight:
                  isSelected
                    ? 3
                    : 2,
              }}
              eventHandlers={{
                click: () =>
                  onSelectHotspot?.(
                    station
                  ),
              }}
            >
              <Popup
                closeButton={true}
                autoPan={true}
                keepInView={true}
              >
                <div className="w-[190px] max-w-[70vw] space-y-1.5 text-sm">
                  <p className="break-words font-semibold text-gray-900">
                    {station.name}
                  </p>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-gray-600">
                      AQI
                    </span>

                    <strong
                      style={{
                        color,
                      }}
                    >
                      {station.aqi}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-gray-600">
                      Status
                    </span>

                    <span className="text-right font-medium">
                      {station.category}
                    </span>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-600">
                      Primary pollutant
                    </span>

                    <strong className="break-words">
                      {station.primaryPollutant}
                    </strong>
                  </div>

                  {station.lastUpdate && (
                    <p className="border-t border-gray-200 pt-1.5 text-[11px] text-gray-500">
                      Updated:{" "}
                      {station.lastUpdate}
                    </p>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      {/* Station count */}
      {stations.length > 0 && (
        <div className="pointer-events-none absolute left-3 top-3 z-[1000]">
          <div className="rounded-lg border border-white/10 bg-[#101B20]/90 px-3 py-2 shadow-lg backdrop-blur-md">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#64757d]">
              CPCB Stations
            </p>

            <p className="mt-0.5 text-sm font-semibold text-[#F5F7F8]">
              {stations.length}
            </p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {stations.length === 0 && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-[#071014]/45 px-4 backdrop-blur-[2px]">
          <div className="w-full max-w-sm rounded-xl border border-white/10 bg-[#101B20]/95 px-5 py-5 text-center shadow-2xl">
            <p className="text-sm font-medium text-[#F5F7F8]">
              No monitoring station data
            </p>

            <p className="mt-2 text-xs leading-5 text-[#64757d]">
              CPCB station data is currently
              unavailable for this location.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PollutionMap;