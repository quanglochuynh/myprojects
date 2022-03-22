import numpy as np
import csv

class Operation:
    def __init__(self, name, starting_time, duration, machine):
        self.name = name
        self.st = starting_time
        self.duration = duration
        self.machine = machine

class Job:
    def __init__(self, num_of_ope, data): 
        self.num_of_operation = num_of_ope
        self.data = data

def calc_fitness():
    return 0


class DNA:
    def __init__(self, sequence):
        self.sequence = sequence
        self.fitness = calc_fitness(sequence)

        


num_of_jobs = 3
num_of_machine = 4

job_array = []
population = []
population_size = 10

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

# print(job_array[1].data)


for i in range(population_size):
    #init DNA
    population.append(DNA())