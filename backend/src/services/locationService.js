async function getLocation(location) {
  if (!location) {
    throw new Error("Location is required");
  }

  if (!process.env.OPENWEATHER_API_KEY) {
    throw new Error("OpenWeather API key is not configured");
  }

  const url = new URL(
    "https://api.openweathermap.org/geo/1.0/direct"
  );

  url.searchParams.set("q", location);
  url.searchParams.set("limit", "1");
  url.searchParams.set(
    "appid",
    process.env.OPENWEATHER_API_KEY
  );

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to resolve location");
  }

  const data = await response.json();

  if (!data.length) {
    throw new Error("Location not found");
  }

  const result = data[0];

  return {
    name: result.name,
    country: result.country,
    state: result.state || null,
    latitude: result.lat,
    longitude: result.lon,
  };
}

module.exports = {
  getLocation,
};