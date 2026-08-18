const API_BASE_URL = "http://localhost:5000/api";

async function request(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || "Something went wrong");
  }

  return data.data;
}

export function getEnvironment(location) {
  return request(
    `/environment/current?location=${encodeURIComponent(location)}`
  );
}

export function getForecast(location, hours = 24) {
  return request(
    `/forecast?location=${encodeURIComponent(location)}&hours=${hours}`
  );
}

export function getHotspots(location) {
  return request(
    `/hotspots?location=${encodeURIComponent(location)}`
  );
}

export function getLiveAlerts(location) {
  return request(
    `/alerts?location=${encodeURIComponent(location)}`
  );
}

export function getGovernmentSummary(location) {
  return request(
    `/government/summary?location=${encodeURIComponent(location)}`
  );
}

export function getPrediction(location) {
  return request(
    `/prediction?location=${encodeURIComponent(location)}`
  );
}