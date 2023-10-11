import csv
import random
import json

NUM_ROWS = 1000

OUTPUT_FILE = "employee_feedback.csv"

data_rows = []
for i in range(1, NUM_ROWS + 1):
    message_id = i
    message = random.choice()

with open(OUTPUT_FILE, "W", newline="") as file:
    writer = csv.writer(file)
    writer.writerow([
        "message id", "message", 
    ])
    writer.writerows(data_rows)

print("Data gen is done.")
