from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import uuid

from app.predict import predict_image

app = FastAPI()

# ENABLE CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads folder automatically
os.makedirs("uploads", exist_ok=True)

@app.get("/")
def home():

    return {
        "message": "Food Quality API Running"
    }

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    # Safe filename
    filename = f"{uuid.uuid4()}.jpg"

    file_path = f"uploads/{filename}"

    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    result = predict_image(file_path)

    return result