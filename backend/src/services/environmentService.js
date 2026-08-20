const { getLocation } = require("./locationService");
const { getCPCBData } = require("./cpcbService");

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


 console.log("Fetching OpenWeather weather...");
const weatherResponse = await fetch(weatherUrl);
console.log("Weather API succeeded");

console.log("Fetching OpenWeather air pollution...");
const airQualityResponse = await fetch(airQualityUrl);
console.log("Air pollution API succeeded");

console.log("Fetching CPCB data...");
const cpcb = await getCPCBData(location);
console.log("CPCB API succeeded");

  if (!weatherResponse.ok) {
    throw new Error(
      "Failed to fetch weather data"
    );
  }

  if (!airQualityResponse.ok) {
    throw new Error(
      "Failed to fetch air quality data"
    );
  }

  const weather = await weatherResponse.json();

  const airQuality =
    await airQualityResponse.json();

  const pollution =
    airQuality.list?.[0];

  if (!pollution) {
    throw new Error(
      "Air quality data unavailable"
    );
  }

  const components =
    pollution.components || {};

  return {
    location: {
      name: selectedLocation.name,
      country: selectedLocation.country,
      state: selectedLocation.state,

      coordinates: {
        latitude:
          selectedLocation.latitude,

        longitude:
          selectedLocation.longitude,
      },
    },

    weather: {
      temperature:
        weather.main?.temp ?? null,

      feelsLike:
        weather.main?.feels_like ?? null,

      humidity:
        weather.main?.humidity ?? null,

      pressure:
        weather.main?.pressure ?? null,

      visibility:
        weather.visibility ?? null,

      windSpeed:
        weather.wind?.speed ?? null,

      windDirection:
        weather.wind?.deg ?? null,

      cloudCover:
        weather.clouds?.all ?? null,

      condition:
        weather.weather?.[0]?.main || null,

      description:
        weather.weather?.[0]?.description || null,
    },

    airQuality: {
      aqi: cpcb.currentAQI,

      category:
        cpcb.category,

      primaryPollutant:
        cpcb.primaryPollutant,

      source:
        cpcb.source,

      methodology:
        cpcb.methodology,

      highestRisk:
        cpcb.highestRisk,

      stationCount:
        cpcb.stationCount,

      stations:
        cpcb.stations,

      pm2_5:
        components.pm2_5 ?? null,

      pm10:
        components.pm10 ?? null,

      co:
        components.co ?? null,

      no2:
        components.no2 ?? null,

      o3:
        components.o3 ?? null,

      so2:
        components.so2 ?? null,
    },

    observedAt:
      pollution.dt ||
      Math.floor(Date.now() / 1000),
  };
}


async function getAirQuality(location) {
  const selectedLocation =
    await getLocation(location);

  if (!process.env.OPENWEATHER_API_KEY) {
    throw new Error(
      "OpenWeather API key is not configured"
    );
  }

  const url = new URL(
    "https://api.openweathermap.org/data/2.5/air_pollution"
  );

  url.searchParams.set(
    "lat",
    selectedLocation.latitude
  );

  url.searchParams.set(
    "lon",
    selectedLocation.longitude
  );

  url.searchParams.set(
    "appid",
    process.env.OPENWEATHER_API_KEY
  );

  const response =
    await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Failed to fetch air quality data"
    );
  }

  const data =
    await response.json();

  const pollution =
    data.list?.[0];

  if (!pollution) {
    throw new Error(
      "Air quality data unavailable"
    );
  }

  const components =
    pollution.components || {};

  return {
    location: {
      name: selectedLocation.name,
      country: selectedLocation.country,
      state: selectedLocation.state,

      coordinates: {
        latitude:
          selectedLocation.latitude,

        longitude:
          selectedLocation.longitude,
      },
    },

    airQuality: {
      pm2_5:
        components.pm2_5 ?? null,

      pm10:
        components.pm10 ?? null,

      co:
        components.co ?? null,

      no2:
        components.no2 ?? null,

      o3:
        components.o3 ?? null,

      so2:
        components.so2 ?? null,
    },

    observedAt:
      pollution.dt ||
      Math.floor(Date.now() / 1000),
  };
}


module.exports = {
  getCurrentEnvironment,
  getAirQuality,
};