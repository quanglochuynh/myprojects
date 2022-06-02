from matplotlib import pyplot as plt
import numpy as np
import math
from numpy import float32, random as rd
from math import floor
import csv
import os

num_of_iteration = 100

num_of_jobs = 8
num_of_machine = 12

job_array = []
population = []

population_size = 100
crossover_rate = 0.8
mutation_rate = 0.5
ope = [2, 2, 2, 2, 2, 1, 2, 3]
makespan = []

def partition(array, low, high):
  pivot = array[high].fitness
  i = low - 1
  for j in range(low, high):
    if array[j].fitness >= pivot:
      i = i + 1
      (array[i], array[j]) = (array[j], array[i])
  (array[i + 1], array[high]) = (array[high], array[i + 1])
  return i + 1

def quickSort(array, low, high):
  if low < high:
    pi = partition(array, low, high)
    quickSort(array, low, pi - 1)
    quickSort(array, pi + 1, high)

def sort_DNA():
    quickSort(population, 0, len(population)-1)

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
for k in range(8):
    cwd = os.getcwd()
    with open(cwd+'/data1/job' + str(k+1) + '.csv') as csv_file:
        data = []
        i=0
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            i=i+1
            data.append(row)
        job_array.append(Job(i, data))




class DNA:
    def __init__(self, num_of_job, num_of_operation=None, ma=None):
        if (num_of_operation!=None):
            matrix = np.zeros((num_of_job, max(num_of_operation)+3), dtype=np.int8)
            # print(np.shape(matrix))
            for i in range(num_of_job):
                for j in range(1,num_of_operation[i]+2):
                    # print(i,j)
                    # print(num_of_operation[i])
                    if (j<=num_of_operation[i]):
                        while True:
                            machine = floor(rd.rand()*num_of_machine)+1
                            duration = int(job_array[i].data[j-1][machine-1])
                            if duration!=0:
                                matrix[i][j] = machine
                                break
                    else:
                        matrix[i][j+1] = -1
            self.matrix = matrix
            self.num_of_operation = num_of_operation
            self.num_of_job = num_of_job
        else:
            self.matrix = np.array(ma)
            self.num_of_job = num_of_job
            self.num_of_operation = ope
        self.fitness = self.calc_fitness()

    def calc_fitness(self):
        ma_stt = np.zeros(num_of_machine)
        ef = np.zeros(num_of_jobs)
        for j in range(np.shape(self.matrix)[1]-1):
            for i in range(num_of_jobs):
                if (self.matrix[i][j+1] == -1) or (self.matrix[i][j+1] == 0):
                    continue
                else:    
                    a = self.matrix[i][j]
                    b = self.matrix[i][j+1]
                    duration = int(job_array[i].data[j][self.matrix[i][j+1]-1])
                    if duration == 0:
                        duration = 1000
                    ma_stt[b-1] = max(ma_stt[b-1], ef[i]) + duration
                    ef[i] = max(ef[i],ma_stt[b-1])
        return max(ef)

    def mutation(self):
        for i in range(self.num_of_job):
                for j in range(1,self.num_of_operation[i]+2):
                    if (self.matrix[i][j+1] == -1) or (self.matrix[i][j+1] == 0):
                        continue
                    else:    
                        if (rd.rand() < mutation_rate):
                            while True:
                                machine = floor(rd.rand()*num_of_machine)+1
                                duration = int(job_array[i].data[j-1][machine-1])
                                if duration!=0:
                                    self.matrix[i][j]=machine
                                    break
                            


def curve(x):
    return int(np.floor(400 * np.power(15,-0.002*x)))

def natural_select(population):
    pool = []
    for i in range(population_size):
        for j in range(curve(population[i].fitness)):
            pool.append(i)
    return pool

def crossover(dna1, dna2):
    new_dna = dna1
    for i in range(num_of_jobs):
        if (rd.rand() < crossover_rate):
            #crossover
            new_dna.matrix[i] = dna2.matrix[i][:] #take row of this job
    return new_dna

def mutation(dna):
    new_dna = dna
    for j in range(1, np.shape(new_dna.matrix)[1]-1):
            for i in range(num_of_jobs):
                if (new_dna.matrix[i][j+1] == -1) or (new_dna.matrix[i][j+1] == 0):
                    continue
                else:    
                    if (rd.rand() < mutation_rate):
                        #Mutate
                        new_dna.matrix[i][j] = floor(rd.rand()*num_of_machine)+1
    print(new_dna.matrix)
    return new_dna

def init_population():
    for i in range(population_size):
        population.append(DNA(8, ope))
        # print(population[i].fitness)


init_population()

for it in range(num_of_iteration):
    print("Iteration " + str(it))
    #Natural selection
    pool = natural_select(population)
    new_population = []
    for i in range(floor(population_size*0.8)):
        id1 = rd.choice(pool)
        id2 = rd.choice(pool)
        if id1!=id2:
            new_DNA = crossover(population[id1], population[id2])
        new_DNA.mutation()
        new_population.append(DNA(8, num_of_operation=None,ma=new_DNA.matrix))
    new_population = new_population + population[floor(0.8*population_size):population_size]
    # print(len(new_population))
    population = new_population
    sort_DNA()
    print("Best make span: " + str(population[population_size-1].fitness))
    makespan.append(population[population_size-1].fitness)
    if (it>50):
        if makespan[it-50]-makespan[it]<1:
            break

print("Solution: ")
print(repr(population[population_size-1].matrix))
plt.plot(np.linspace(0,len(makespan)-1, len(makespan)), makespan)
plt.show()
# fit = []

# for i in range(population_size):
#     fit.append(population[i].fitness)

# print(min(fit))

# a = [[0, 1, 3, 2, -1, 0, 0],
#      [0, 3, 4, 1, 1, -1, 0],
#      [0, 4, 3, 3, -1, 0, 0]]

# print(a)

# k = DNA(3, [3, 4, 3])

# print(k.matrix)
# print("Make span = " + str(k.fitness))

# k = DNA(3,[3, 4, 3])
# print(k.matrix)

# h = DNA(3,[3, 4, 3])
# print(h.matrix)

# l = crossover(k,h)
# print(l.matrix)
# ar = [[ 0, 11,  7,  0, -1,  0],
#        [ 0,  2, 10,  0, -1,  0],
#        [ 0, 12,  9,  0, -1,  0],
#        [ 0,  9,  9,  0, -1,  0],
#        [ 0, 11,  4,  0, -1,  0],
#        [ 0,  3,  0, -1,  0,  0],
#        [ 0,  8,  8,  0, -1,  0],
#        [ 0,  1,  8,  3,  0, -1]]
# ar = list(best_DNA.matrix)
# a = DNA(8, [2, 2, 2, 2, 2, 1, 2, 3], ar)

# a.calc_fitness()

# print(a.matrix)
# print(a.fitness)