import numpy as np
from numpy import random as rd
from math import floor
import csv

num_of_iteration = 1

num_of_jobs = 3
num_of_machine = 4

job_array = []
population = []
population_size = 100

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
    def __init__(self, num_of_job, num_of_operation):
        matrix = np.array([[0]*(max(num_of_operation)+3)]*num_of_job)
        for i in range(num_of_job):
            for j in range(1, num_of_operation[i]+2):
                if (j!=num_of_operation[i]+1):
                    matrix[i][j] = floor(rd.rand()*num_of_machine)+1
                else:
                    matrix[i][j] = -1
        self.matrix = matrix
        self.fitness = self.calc_fitness(self.matrix)

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
                    # print(duration)
                    if duration == 0:
                        duration = 65535
                    # print(str(a) + " -> " + str(b) + "  " + str(duration))
                    ma_stt[b-1] = max(ma_stt[b-1], ef[i]) + duration
                    # print(ma_stt)
                    ef[i] = max(ef[i],ma_stt[b-1])
                    # print(ef)
        # print(ef)
        # print("EF = ")
        # print(ef)
        return max(ef)

def curve(x):
    return int(np.floor(200 * np.power(5,-0.05*x)))

def natural_select(population):
    pool = []
    for i in range(population_size):
        for j in range(curve(population[i].fitness)):
            pool.append(i)
    return pool

#init Population
for i in range(population_size):
    population.append(DNA(3, [3, 4, 3]))
    # print(population[i].fitness)


for it in range(num_of_iteration):
    #Natural selection
    pool = natural_select(population)
    # print(pool)
    new_population = []
    for i in range(population_size):
        id1 = rd.choice(pool)
        id2 = rd.choice(pool)
        new_DNA = crossover(population[id1], population[id2])
        new_DNA = mutation(new_DNA)
        new_population.append(new_DNA)
    population = new_population


# a = [[0, 1, 3, 2, -1, 0, 0],
#      [0, 3, 4, 1, 1, -1, 0],
#      [0, 4, 3, 3, -1, 0, 0]]

# print(a)

# k = DNA(3, [3, 4, 3])

# print(k.matrix)
# print("Make span = " + str(k.fitness))


# function res = natural_select(pop)
#     pool = [];
#     for i = 1:size(pop.community,2)
#         for j = 1:map(pop.community(i).fitness)
#             pool(end+1) = i;
#         end
#     end
#     res = pool;
# end

# function res = map(x)
#     res = floor(200*5^(-0.05*x));
# end