import { useEffect } from "react";
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

    map.setView([location.latitude, location.longitude], 12, {
      animate: true,
    });
  }, [location, map]);

  return null;
}

function PollutionMap({
  hotspots,
  selectedHotspot,
  onSelectHotspot,
}) {
  const mapCenter = {
    latitude: 28.6139,
    longitude: 77.36,
  };

  return (
    <div className="relative h-[600px] overflow-hidden rounded-2xl border border-white/10">
      <MapContainer
        center={[mapCenter.latitude, mapCenter.longitude]}
        zoom={12}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapRecenter location={mapCenter} />

        {hotspots.map((hotspot) => {
          const isSelected = selectedHotspot?.id === hotspot.id;
          const color = getAQIColor(hotspot.aqi);

          return (
            <CircleMarker
              key={hotspot.id}
              center={[hotspot.latitude, hotspot.longitude]}
              radius={isSelected ? 14 : 10}
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity: isSelected ? 0.75 : 0.55,
                weight: isSelected ? 3 : 2,
              }}
              eventHandlers={{
                click: () => onSelectHotspot(hotspot),
              }}
            >
              <Popup>
                <div className="min-w-[150px]">
                  <strong>{hotspot.name}</strong>
                  <br />
                  AQI: {hotspot.aqi}
                  <br />
                  {hotspot.category}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default PollutionMap;