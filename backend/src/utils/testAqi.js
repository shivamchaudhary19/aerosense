const { calculateAQI } = require("../services/aqiService");

const result = calculateAQI({
  pm2_5: 12.17,
  pm10: 27.94,
  co: 166.75,
  no2: 5.88,
  o3: 55.8,
  so2: 1.52,
});

console.log(result);