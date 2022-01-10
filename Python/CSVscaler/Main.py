import csv

scale_factor = 10

inp = []

with open('maze.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0

    for row in csv_reader:
        inp.append(row)

for i in range(2):
    for j in range(2):
        val = inp[i][j]
        print(val, sep = '--', end = '')
