const locations = {
  noida: {
    name: "Noida",
    country: "India",
    latitude: 28.5355,
    longitude: 77.391,
  },
  delhi: {
    name: "Delhi",
    country: "India",
    latitude: 28.6139,
    longitude: 77.209,
  },
  gurugram: {
    name: "Gurugram",
    country: "India",
    latitude: 28.4595,
    longitude: 77.0266,
  },
  ghaziabad: {
    name: "Ghaziabad",
    country: "India",
    latitude: 28.6692,
    longitude: 77.4538,
  },
  lucknow: {
    name: "Lucknow",
    country: "India",
    latitude: 26.8467,
    longitude: 80.9462,
  },
};

function getLocation(location) {
  if (!location) {
    return null;
  }

  return locations[location.toLowerCase()];
}

module.exports = {
  getLocation,
};