from PIL import Image
import numpy as np
from app.model_loader import model, classes

def predict_image(image_path):

    image = Image.open(image_path).convert("RGB")
    image = image.resize((224,224))

    image_array = np.array(image) / 255.0
    image_array = np.expand_dims(image_array, axis=0)

    prediction = model.predict(image_array)

    predicted_class = np.argmax(prediction)
    confidence = float(np.max(prediction)) * 100
    print(prediction)
    print(predicted_class)
    print(len(classes))
    print(classes)

    return {
        "prediction": classes[predicted_class],
        "confidence": round(confidence,2)
    }