const { getLocation } = require("./locationService");
const { getCurrentEnvironment } = require("./environmentService");

async function getForecast(location, hours = 24) {
  const selectedLocation = await getLocation(location);
  const currentEnvironment = await getCurrentEnvironment(location);

  const forecastHours = [24, 48, 72].includes(Number(hours))
    ? Number(hours)
    : 24;

  const url = new URL(
    "https://api.openweathermap.org/data/2.5/forecast"
  );

  url.searchParams.set("lat", selectedLocation.latitude);
  url.searchParams.set("lon", selectedLocation.longitude);
  url.searchParams.set(
    "appid",
    process.env.OPENWEATHER_API_KEY
  );
  url.searchParams.set("units", "metric");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch forecast data");
  }

  const data = await response.json();

  const requiredPoints = Math.ceil(forecastHours / 3);

  const forecastPoints = data.list
    .slice(0, requiredPoints)
    .map((item) => {
      const estimatedAQI = estimateAQI(
        currentEnvironment.airQuality.aqi,
        item
      );

      return {
        timestamp: item.dt,
        dateTime: item.dt_txt,
        temperature: item.main.temp,
        feelsLike: item.main.feels_like,
        humidity: item.main.humidity,
        windSpeed: item.wind.speed,
        windDirection: item.wind.deg,
        cloudCover: item.clouds.all,
        condition: item.weather?.[0]?.main || null,
        description: item.weather?.[0]?.description || null,
        estimatedAQI: estimatedAQI.aqi,
        category: estimatedAQI.category,
      };
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
    forecastHorizon: `${forecastHours} hours`,
    currentAQI: currentEnvironment.airQuality.aqi,
    currentCategory: currentEnvironment.airQuality.category,
    predictions: forecastPoints,
  };
}

function estimateAQI(currentAQI, weather) {
  let estimatedAQI = currentAQI;

  if (weather.wind.speed < 2) {
    estimatedAQI += 8;
  } else if (weather.wind.speed > 5) {
    estimatedAQI -= 8;
  }

  if (weather.humidity > 80) {
    estimatedAQI += 4;
  }

  if (weather.clouds.all > 80) {
    estimatedAQI += 3;
  }

  estimatedAQI = Math.round(
    Math.max(0, Math.min(500, estimatedAQI))
  );

  return {
    aqi: estimatedAQI,
    category: getAQICategory(estimatedAQI),
  };
}

function getAQICategory(aqi) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Satisfactory";
  if (aqi <= 200) return "Moderately Polluted";
  if (aqi <= 300) return "Poor";
  if (aqi <= 400) return "Very Poor";
  return "Severe";
}

module.exports = {
  getForecast,
};