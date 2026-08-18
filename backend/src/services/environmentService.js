const { getLocation } = require("./locationService");

async function getCurrentEnvironment(location) {
  const selectedLocation = getLocation(location);

  if (!selectedLocation) {
    throw new Error("Unsupported location");
  }

  if (!process.env.OPENWEATHER_API_KEY) {
    throw new Error("OpenWeather API key is not configured");
  }

  const url = new URL(
    "https://api.openweathermap.org/data/2.5/weather"
  );

  url.searchParams.set("lat", selectedLocation.latitude);
  url.searchParams.set("lon", selectedLocation.longitude);
  url.searchParams.set("appid", process.env.OPENWEATHER_API_KEY);
  url.searchParams.set("units", "metric");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await response.json();

  return {
    location: selectedLocation.name,
    country: selectedLocation.country,
    coordinates: {
      latitude: data.coord.lat,
      longitude: data.coord.lon,
    },
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    visibility: data.visibility,
    windSpeed: data.wind.speed,
    windDirection: data.wind.deg,
    cloudCover: data.clouds.all,
    condition: data.weather?.[0]?.main || null,
    description: data.weather?.[0]?.description || null,
    observedAt: data.dt,
  };
}

async function getAirQuality(location) {
  const selectedLocation = getLocation(location);

  if (!selectedLocation) {
    throw new Error("Unsupported location");
  }

  if (!process.env.OPENWEATHER_API_KEY) {
    throw new Error("OpenWeather API key is not configured");
  }

  const url = new URL(
    "https://api.openweathermap.org/data/2.5/air_pollution"
  );

  url.searchParams.set("lat", selectedLocation.latitude);
  url.searchParams.set("lon", selectedLocation.longitude);
  url.searchParams.set("appid", process.env.OPENWEATHER_API_KEY);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch air quality data");
  }

  const data = await response.json();
  const pollution = data.list?.[0];

  if (!pollution) {
    throw new Error("Air quality data unavailable");
  }

  return {
    location: selectedLocation.name,
    country: selectedLocation.country,
    aqi: pollution.main.aqi,
    components: {
      pm2_5: pollution.components.pm2_5,
      pm10: pollution.components.pm10,
      co: pollution.components.co,
      no2: pollution.components.no2,
      o3: pollution.components.o3,
      so2: pollution.components.so2,
    },
    observedAt: pollution.dt,
  };
}

module.exports = {
  getCurrentEnvironment,
  getAirQuality,
};