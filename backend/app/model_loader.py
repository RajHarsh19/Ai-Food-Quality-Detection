import tensorflow as tf

model = tf.keras.models.load_model(
    "ml_model/food_model.h5"
)

classes = [
    "Fresh Apple",
    "Fresh Banana",
    "Fresh Orange",
    "Rotten Apple",
    "Rotten Banana",
    "Rotten Orange"
]