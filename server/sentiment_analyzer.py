#/usr/bin/python3
import sys
import json
import pickle
import pandas as pd

# Load the pre-trained model
with open('model.pkl', 'rb') as f:
   model, vectorizer = pickle.load(f)

# Read data from stdin
message = sys.stdin.read()


# Perform the prediction
vectorizedMessage = vectorizer.transform([message])

predictions = model.predict(vectorizedMessage)

print(predictions)