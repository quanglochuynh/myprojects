import numpy as np
import csv


num_of_jobs = 3
num_of_machine = 4

job_array = []
population = []
population_size = 10

class Operation:
    def __init__(self, name, duration, machine):
        self.name = name
        self.es = 0
        self.ef = 0
        self.ls = 0
        self.lf = 0
        self.duration = duration
        self.machine = machine

class Job:
    def __init__(self, num_of_ope, data): 
        self.num_of_operation = num_of_ope
        self.data = data





# Doc file
for k in range(3):
    with open('job' + str(k+1) + '.csv') as csv_file:
        data = []
        i=0
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            i=i+1
            data.append(row)
        job_array.append(Job(i, data))

# print(job_array[2].num_of_operation)

class DNA:
    def __init__(self, matrix):
        self.matrix = matrix
        self.fitness = self.calc_fitness(matrix)

    def calc_fitness(self, matrix):
        ma_stt = [0] * num_of_machine
        ef = [0] * num_of_jobs
        for j in range(np.shape(matrix)[1]-1):
            for i in range(num_of_jobs):
                if (matrix[i][j+1] == -1) or (matrix[i][j+1] == 0):
                    continue
                else:    
                    a = matrix[i][j]
                    b = matrix[i][j+1]
                    duration = int(job_array[i].data[j][matrix[i][j+1]-1])
                    # print(str(a) + " -> " + str(b) + "  " + str(duration))
                    ma_stt[b-1] = max(ma_stt[b-1], ef[i]) + duration
                    # print(ma_stt)
                    ef[i] = max(ef[i],ma_stt[b-1])
                    # print(ef)
        # print(ef)
        return max(ef)
        






# for i in range(population_size):
#     #init DNA
#     population.append(DNA())

a = [[0, 1, 3, 4, -1, 0, 0],
     [0, 3, 4, 1, 2, -1, 0],
     [0, 4, 3, 3, -1, 0, 0]]

# print(a)

k = DNA(a)

print(k.fitness)