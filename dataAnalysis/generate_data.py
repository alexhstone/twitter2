import csv
import random
import json

NUM_ROWS = 100

OUTPUT_FILE = "employee_feedback.csv"

with open("sentiment_analysis_training_data.json") as json_file:
    messages = json.load(json_file)

data_rows = []
for i in range(1, NUM_ROWS + 1):
    message_id = i
    chosen_message = random.choice(messages)
    message = chosen_message["message"]
    positive_or_negative = chosen_message["type"]

    data_row = [
        message_id,
        message,
        positive_or_negative
    ]

    data_rows.append(data_row)

with open(OUTPUT_FILE, "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(
        ["message_id","message", "positive_or_negative"]
    )
    writer.writerows(data_rows)

print("Data gen is done.")
