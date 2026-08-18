import json
import os
import sys

import joblib
import pandas as pd


BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "aqi_model.joblib",
)


FEATURES = [
    "pm2_5",
    "pm10",
    "no2",
    "o3",
    "so2",
    "co",
    "temperature",
    "humidity",
    "wind_speed",
]


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


def load_model():
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(
            "AQI model not found. Run train.py first."
        )

    saved_model = joblib.load(MODEL_PATH)

    if "model" not in saved_model:
        raise ValueError(
            "Invalid AQI model file: model missing."
        )

    if "features" not in saved_model:
        raise ValueError(
            "Invalid AQI model file: features missing."
        )

    return (
        saved_model["model"],
        saved_model["features"],
    )


def predict_aqi(environment):
    if not isinstance(environment, dict):
        raise ValueError(
            "Environment data must be an object."
        )

    model, features = load_model()

    missing_features = [
        feature
        for feature in FEATURES
        if feature not in environment
        or environment[feature] is None
    ]

    if missing_features:
        raise ValueError(
            "Missing prediction features: "
            + ", ".join(missing_features)
        )

    input_data = pd.DataFrame(
        [
            {
                feature: float(environment[feature])
                for feature in FEATURES
            }
        ]
    )

    input_data = input_data[features]

    prediction = model.predict(input_data)[0]

    prediction = max(
        0,
        min(500, float(prediction))
    )

    rounded_prediction = round(prediction)

    return {
        "predictedAQI": rounded_prediction,
        "category": get_category(
            rounded_prediction
        ),
    }


if __name__ == "__main__":
    try:
        raw_input = sys.stdin.read()

        if not raw_input.strip():
            raise ValueError(
                "No environment data provided."
            )

        environment = json.loads(raw_input)

        result = predict_aqi(environment)

        print(json.dumps({
            "success": True,
            "data": result,
        }))

    except Exception as error:
        print(
            json.dumps({
                "success": False,
                "error": str(error),
            })
        )

        sys.exit(1)