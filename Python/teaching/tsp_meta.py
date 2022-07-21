from turtle import back
from p5 import *
import numpy as np
import math

height = 800
width = 800
num_of_city = 8
city = []
dis = np.zeros((num_of_city, num_of_city), dtype=np.float16)
population = None
pop_size = 20
mutation_rate = 0.1
best_fit= None
best_dna = None

def distance(i,j):
    return math.sqrt((city[i].x-city[j].x)**2 + (city[i].y-city[j].y)**2)

def swap(a,b):
    return b,a

def fit_curve(x):
    return 1000*pow(1.015,-0.1*(x-200))
class City:
    def __init__(self) -> None:
        self.x = np.random.randint(0,width)
        self.y = np.random.randint(0,height)
        

class DNA:
    def __init__(self, dv=[]) -> None:
        if len(dv)==0:
            self.dvar = np.arange(num_of_city, dtype=np.int8)
            np.random.shuffle(self.dvar)
        else:
            self.dvar = dv
        self.fitness = 0

    def calc_fitness(self):
        for i in range(num_of_city-1):
            self.fitness = self.fitness + dis[self.dvar[i]][self.dvar[i+1]]
        self.fitness = self.fitness + dis[self.dvar[num_of_city-1]][self.dvar[0]]
        
    def draw(self):
        for i in range(num_of_city-1):
            line(city[self.dvar[i]].x, city[self.dvar[i]].y, city[self.dvar[i+1]].x, city[self.dvar[i+1]].y)

    def mutate(self):
        for i in range(num_of_city):
            if np.random.rand()<mutation_rate:
                id2 = np.random.randint(0, num_of_city)
                self.dvar[i], self.dvar[id2] = swap(self.dvar[i], self.dvar[id2])

def crossover(dna1, dna2):
    dv1 = dna1.dvar
    dv2 = dna2.dvar
    mid = np.random.randint(0, num_of_city)
    for i in range(mid):
        id = np.where(dv1==dv2[i])[0]
        dv1[id], dv1[i] = dv1[i], dv1[id]
        id = np.where(dv2==dv1[i])[0]
        dv2[id], dv2[i] = dv2[i], dv2[id]
    return DNA(dv=dv1), DNA(dv=dv2)

def init():
    best_fit= math.inf
    best_dna = DNA()
    population = []
    for i in range(num_of_city):
        city.append(City())
    for i in range(num_of_city):
        for j in range(i,num_of_city):
            d = distance(i,j)
            dis[i][j] = d
            dis[j][i] = d
    for i in range(pop_size):
        population.append(DNA())
        population[i].calc_fitness()
        print(population[i].fitness)


def setup():
    size(height, width)
    no_stroke()
    background(0)
    init()

def drawdna(i):
    population[i].draw()

def draw():
    background(0)
    fill(0)
    stroke(255)
    stroke_weight(2)
    draw_cities()
    print(len(population))
    # pool = []
    # # population[0].draw()
    # for i in range(pop_size):
    #     drawdna(i)
    #     for j in range(math.floor(fit_curve(population[i].fitness))):
    #         pool.append(i)
    # new_population = []
    # for i in range(math.floor(pop_size/2)):
    #     dna1 = population[np.random.choice(pool)]
    #     dna2 = population[np.random.choice(pool)]
    #     dna1, dna2 = crossover(dna1, dna2)
    #     dna1.mutate()
    #     dna2.mutate()
    #     dna1.calc_fitness()
    #     dna2.calc_fitness()
    #     if best_fit > dna1.fitness:
    #         best_fit = dna1.fitness
    #         best_dna = dna1
    #     if best_fit > dna2.fitness:
    #         best_fit = dna2.fitness
    #         best_dna = dna2
    #     new_population.append(dna1)
    #     new_population.append(dna2)
    # print(len(new_population))
    # population = new_population
    # stroke(255,0,255)
    # stroke_weight(4)
    # best_dna.draw()
    print(best_fit)



def draw_cities():
    for i in range(num_of_city):
        circle(city[i].x, city[i].y,20)


run()