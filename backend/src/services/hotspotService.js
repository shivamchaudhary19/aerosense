const { getLocation } = require("./locationService");
const { calculateAQI } = require("./aqiService");

async function getHotspots(location) {
  const selectedLocation = await getLocation(location);

  if (!process.env.OPENWEATHER_API_KEY) {
    throw new Error("OpenWeather API key is not configured");
  }

  const offsets = [
    { name: "North", lat: 0.04, lon: 0 },
    { name: "North East", lat: 0.03, lon: 0.04 },
    { name: "East", lat: 0, lon: 0.05 },
    { name: "South East", lat: -0.03, lon: 0.04 },
    { name: "South", lat: -0.04, lon: 0 },
    { name: "South West", lat: -0.03, lon: -0.04 },
    { name: "West", lat: 0, lon: -0.05 },
    { name: "North West", lat: 0.03, lon: -0.04 },
    { name: "Central", lat: 0, lon: 0 },
  ];

  const results = await Promise.all(
    offsets.map(async (point) => {
      const latitude = selectedLocation.latitude + point.lat;
      const longitude = selectedLocation.longitude + point.lon;

      const url = new URL(
        "https://api.openweathermap.org/data/2.5/air_pollution"
      );

      url.searchParams.set("lat", latitude);
      url.searchParams.set("lon", longitude);
      url.searchParams.set(
        "appid",
        process.env.OPENWEATHER_API_KEY
      );

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch hotspot data");
      }

      const data = await response.json();
      const pollution = data.list?.[0];

      if (!pollution) {
        return null;
      }

      const components = pollution.components;

      const aqiResult = calculateAQI({
        pm2_5: components.pm2_5,
        pm10: components.pm10,
        no2: components.no2,
        o3: components.o3,
        so2: components.so2,
        co: components.co,
      });

      return {
        name: point.name,
        aqi: aqiResult.aqi,
        category: aqiResult.category,
        primaryPollutant: aqiResult.primaryPollutant,
        coordinates: {
          latitude,
          longitude,
        },
        pm2_5: components.pm2_5,
        pm10: components.pm10,
        observedAt: pollution.dt,
      };
    })
  );

  const hotspots = results
    .filter(Boolean)
    .sort((a, b) => b.aqi - a.aqi)
    .slice(0, 5)
    .map((hotspot, index) => ({
      rank: index + 1,
      ...hotspot,
    }));

  return {
    location: {
      name: selectedLocation.name,
      country: selectedLocation.country,
      state: selectedLocation.state,
      coordinates: {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      },
    },
    hotspots,
  };
}

module.exports = {
  getHotspots,
};