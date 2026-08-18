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

    map.setView(
      [location.latitude, location.longitude],
      12,
      {
        animate: true,
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
  }, [hotspots]);

  const mapCenter = useMemo(() => {
    if (stations.length > 0) {
      return {
        latitude: stations[0].latitude,
        longitude: stations[0].longitude,
      };
    }

    return {
      latitude: 28.5706,
      longitude: 77.3272,
    };
  }, [stations]);

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-white/10 sm:h-[500px] lg:h-[600px]">
      <MapContainer
        center={[
          mapCenter.latitude,
          mapCenter.longitude,
        ]}
        zoom={12}
        scrollWheelZoom={true}
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
                isSelected ? 14 : 10
              }
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity:
                  isSelected
                    ? 0.8
                    : 0.55,
                weight:
                  isSelected ? 3 : 2,
              }}
              eventHandlers={{
                click: () =>
                  onSelectHotspot?.(
                    station
                  ),
              }}
            >
              <Popup>
                <div className="min-w-[180px] space-y-1 text-sm">
                  <p className="font-semibold">
                    {station.name}
                  </p>

                  <p>
                    <strong>AQI:</strong>{" "}
                    {station.aqi}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {station.category}
                  </p>

                  <p>
                    <strong>Primary pollutant:</strong>{" "}
                    {station.primaryPollutant}
                  </p>

                  {station.lastUpdate && (
                    <p className="text-xs text-gray-500">
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

      {/* Empty state */}
      {stations.length === 0 && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-[#071014]/40 backdrop-blur-[2px]">
          <div className="mx-4 rounded-xl border border-white/10 bg-[#101B20]/95 px-5 py-4 text-center">
            <p className="text-sm font-medium text-[#F5F7F8]">
              No monitoring station data
            </p>

            <p className="mt-1 text-xs text-[#64757d]">
              CPCB station data is currently unavailable.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PollutionMap;