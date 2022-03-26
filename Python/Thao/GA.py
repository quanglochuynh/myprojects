import numpy as np
import csv

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


class DNA:
    def __init__(self, matrix):
        self.matrix = matrix
        self.fitness = self.calc_fitness(matrix)

    def calc_fitness(self, matrix):
        for j in range(np.shape(matrix)[1]-1):
            for i in range(np.shape(matrix)[0]):
                print(str(matrix[i][j]) + " -> " + str(matrix[i][j+1]))
        return 0;
        


num_of_jobs = 3
num_of_machine = 4

job_array = []
population = []
population_size = 10

# # Doc file
# for k in range(3):
#     with open('job' + str(k+1) + '.csv') as csv_file:
#         data = []
#         i=0
#         csv_reader = csv.reader(csv_file, delimiter=',')
#         for row in csv_reader:
#             i=i+1
#             data.append(row)
#         job_array.append(Job(i, data))

# # print(job_array[1].data)


# for i in range(population_size):
#     #init DNA
#     population.append(DNA())

a = [[0, 1, 3, 4, 0, 0],
         [0, 3, 4, 1, 2, 0],
         [0, 4, 3, 3, 0, 0]]

print(a)

k = DNA(a)

