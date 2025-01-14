from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import joblib
from sklearn.preprocessing import MinMaxScaler

model_path = "random_forest_model.pkl"
model = joblib.load(model_path)

scaler_path = "scaler.pkl"
scaler = joblib.load(scaler_path)


app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class PredictionRequest(BaseModel):
    Area_Sqft: float
    City: str
    Place: str
    Property_Type: str
    Bedroom: int
    Bathroom: int
    Parking: int
    Year_Built: int

categorical_columns = ["City", "Place", "Property_Type"]

@app.post("/predict/")
def predict(data: PredictionRequest):
    try:
        input_data = pd.DataFrame([data.dict()])

        input_data = pd.get_dummies(input_data, columns=categorical_columns)

        model_features = joblib.load("model_features.pkl")
        input_data = input_data.reindex(columns=model_features, fill_value=0)

        prediction = model.predict(input_data)

        original_price = scaler.inverse_transform([[prediction[0], 0]])[0][0]

        return {"predicted_price": float(original_price)}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

