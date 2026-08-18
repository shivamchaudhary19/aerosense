const { getLocation } = require("./locationService");
const { calculateAQI } = require("./aqiService");

async function getCurrentEnvironment(location) {
  const selectedLocation = await getLocation(location);

  if (!process.env.OPENWEATHER_API_KEY) {
    throw new Error("OpenWeather API key is not configured");
  }

  const weatherUrl = new URL(
    "https://api.openweathermap.org/data/2.5/weather"
  );

  weatherUrl.searchParams.set("lat", selectedLocation.latitude);
  weatherUrl.searchParams.set("lon", selectedLocation.longitude);
  weatherUrl.searchParams.set(
    "appid",
    process.env.OPENWEATHER_API_KEY
  );
  weatherUrl.searchParams.set("units", "metric");

  const airQualityUrl = new URL(
    "https://api.openweathermap.org/data/2.5/air_pollution"
  );

  airQualityUrl.searchParams.set(
    "lat",
    selectedLocation.latitude
  );
  airQualityUrl.searchParams.set(
    "lon",
    selectedLocation.longitude
  );
  airQualityUrl.searchParams.set(
    "appid",
    process.env.OPENWEATHER_API_KEY
  );

  const [weatherResponse, airQualityResponse] = await Promise.all([
    fetch(weatherUrl),
    fetch(airQualityUrl),
  ]);

  if (!weatherResponse.ok) {
    throw new Error("Failed to fetch weather data");
  }

  if (!airQualityResponse.ok) {
    throw new Error("Failed to fetch air quality data");
  }

  const weather = await weatherResponse.json();
  const airQuality = await airQualityResponse.json();

  const pollution = airQuality.list?.[0];

  if (!pollution) {
    throw new Error("Air quality data unavailable");
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
    location: {
      name: selectedLocation.name,
      country: selectedLocation.country,
      state: selectedLocation.state,
      coordinates: {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      },
    },

    weather: {
      temperature: weather.main.temp,
      feelsLike: weather.main.feels_like,
      humidity: weather.main.humidity,
      pressure: weather.main.pressure,
      visibility: weather.visibility,
      windSpeed: weather.wind.speed,
      windDirection: weather.wind.deg,
      cloudCover: weather.clouds.all,
      condition: weather.weather?.[0]?.main || null,
      description: weather.weather?.[0]?.description || null,
    },

    airQuality: {
      aqi: aqiResult.aqi,
      category: aqiResult.category,
      primaryPollutant: aqiResult.primaryPollutant,
      pm2_5: components.pm2_5,
      pm10: components.pm10,
      co: components.co,
      no2: components.no2,
      o3: components.o3,
      so2: components.so2,
      subIndices: aqiResult.subIndices,
    },

    observedAt: pollution.dt,
  };
}

async function getAirQuality(location) {
  const selectedLocation = await getLocation(location);

  if (!process.env.OPENWEATHER_API_KEY) {
    throw new Error("OpenWeather API key is not configured");
  }

  const url = new URL(
    "https://api.openweathermap.org/data/2.5/air_pollution"
  );

  url.searchParams.set("lat", selectedLocation.latitude);
  url.searchParams.set("lon", selectedLocation.longitude);
  url.searchParams.set(
    "appid",
    process.env.OPENWEATHER_API_KEY
  );

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
    components: pollution.components,
    observedAt: pollution.dt,
  };
}

module.exports = {
  getCurrentEnvironment,
  getAirQuality,
};