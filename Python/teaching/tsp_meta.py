from turtle import back
from p5 import *
import numpy as np

height = 800
width = 800
num_of_city = 8
city = []
dis = np.zeros((num_of_city, num_of_city), dtype=np.float16)
population = []
pop_size = 20
mutation_rate = 0.1


def distance(i,j):
    return (city[i].x-city[j].x)**2 + (city[i].y-city[j].y)**2

def swap(a,b):
    tmp = a
    a=b
    b=tmp
    return a,b

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
    new_dv = dv1[0:mid]
    

def init():
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


def setup():
    size(height, width)
    no_stroke()
    background(0)
    init()



def draw():
    background(0)
    fill(0)
    stroke(255)
    stroke_weight(2)
    draw_cities()
    population[0].draw()
    population[0].mutate()




def draw_cities():
    for i in range(num_of_city):
        circle(city[i].x, city[i].y,20)


run()