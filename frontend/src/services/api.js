const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000/api";

async function request(endpoint) {
  try {
    const response = await fetch(
      `${API_BASE_URL}${endpoint}`
    );

    let data;

    try {
      data = await response.json();
    } catch {
      throw new Error(
        `Server returned an invalid response (${response.status})`
      );
    }

    if (!response.ok || !data.success) {
      throw new Error(
        data?.error ||
          `Request failed with status ${response.status}`
      );
    }

    return data.data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "Unable to connect to AeroSense backend."
      );
    }

    throw error;
  }
}

export function getEnvironment(location) {
  return request(
    `/environment/current?location=${encodeURIComponent(
      location
    )}`
  );
}

export function getForecast(
  location,
  hours = 24
) {
  return request(
    `/forecast?location=${encodeURIComponent(
      location
    )}&hours=${hours}`
  );
}

export function getHotspots(location) {
  return request(
    `/hotspots?location=${encodeURIComponent(
      location
    )}`
  );
}

export function getLiveAlerts(location) {
  return request(
    `/alerts?location=${encodeURIComponent(
      location
    )}`
  );
}

export function getGovernmentSummary(
  location
) {
  return request(
    `/government/summary?location=${encodeURIComponent(
      location
    )}`
  );
}

export function getPrediction(location) {
  return request(
    `/prediction?location=${encodeURIComponent(
      location
    )}`
  );
}