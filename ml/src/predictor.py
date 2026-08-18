import os

import joblib
import pandas as pd


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "aqi_model.joblib",
)


def get_category(aqi):
    if aqi <= 50:
        return "Good"

    if aqi <= 100:
        return "Satisfactory"

    if aqi <= 200:
        return "Moderately Polluted"

    if aqi <= 300:
        return "Poor"

    if aqi <= 400:
        return "Very Poor"

    return "Severe"


def predict_aqi(environment):
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(
            "AQI model not found. Run train.py first."
        )

    saved_model = joblib.load(MODEL_PATH)

    model = saved_model["model"]
    features = saved_model["features"]

    input_data = pd.DataFrame(
        [
            {
                "pm2_5": environment["pm2_5"],
                "pm10": environment["pm10"],
                "no2": environment["no2"],
                "o3": environment["o3"],
                "so2": environment["so2"],
                "co": environment["co"],
                "temperature": environment["temperature"],
                "humidity": environment["humidity"],
                "wind_speed": environment["wind_speed"],
            }
        ]
    )

    input_data = input_data[features]

    prediction = model.predict(input_data)[0]

    prediction = max(0, min(500, prediction))

    return {
        "predictedAQI": round(float(prediction)),
        "category": get_category(prediction),
    }


if __name__ == "__main__":
    sample_environment = {
        "pm2_5": 35,
        "pm10": 70,
        "no2": 25,
        "o3": 75,
        "so2": 8,
        "co": 300,
        "temperature": 32,
        "humidity": 70,
        "wind_speed": 1.8,
    }

    result = predict_aqi(sample_environment)

    print(result)