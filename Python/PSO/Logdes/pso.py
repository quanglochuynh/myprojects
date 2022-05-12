from email import header
import numpy as np
from numpy import random as rd
import matplotlib.pyplot as plt
import os
import csv
class Location:
    def __init__(self, name, x, y):
        self.name = name
        self.x = x
        self.y = y

# 𝑖: Production locations; 
# 𝑗: Distribution locations; 
# 𝑘: Retail locations; 
# 𝑚: Recycling locations;

production_name = []
DC_name = []
Retail_name = []
Recycling_name = []

def read_csv(name):
    res = []
    cwd = os.getcwd()
    # print(cwd)
    with open(os.path.join(cwd, "logdes_data", name)) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        # head = next(csv_reader)
        for row in csv_reader:
            new_row = []
            for i in range(len(row)):
                new_row.append(row[i])
            res.append(new_row)
    return res

def process_map(map):
    for i in range(np.shape(map)[0]):
        for j in range(np.shape(map)[1]):
            val = map[i][j]
            # print(val)
            if val!='':
                if (val[0]=='P'):
                    production_name.append(Location(val, i+1, j+1))
                elif (val[0]=='D'):
                    DC_name.append(Location(val, i+1,j+1))
                elif (val[0]=='S'):
                    Retail_name.append(Location(val, i+1, j+1))
                elif (val[0] == 'R'):
                    Recycling_name.append(Location(val,i+1,j+1))

map = read_csv('map.csv')
process_map(map)


def process_distance(a,b):
    num_a = len(a)
    num_b = len(b)
    dis = np.zeros((num_a, num_b))
    for i in range(num_a):
        for j in range(num_b):
            dis[i][j] = np.sqrt(np.square(a[i].x - b[j].x) + np.square(a[i].y - b[j].y ))*10
    return dis

num_of_production = len(production_name)
num_of_DC = len(DC_name)
num_of_Retail = len(Retail_name)
num_of_Recycling = len(Recycling_name)

l_ij = process_distance(production_name, DC_name)
l_im = process_distance(production_name,Recycling_name)
l_jk = process_distance(DC_name, Retail_name)
l_jm = process_distance(DC_name, Recycling_name)
l_km = process_distance(Retail_name, Recycling_name)


#Decision vars

class DNA:
    def __init__(self):
        self.S = rd.randint(2, size=num_of_production)
        self.W = rd.randint(2, size=num_of_DC)
        self.G = rd.randint(2, size=num_of_Recycling)
        self.Q = np.multiply(rd.rand(num_of_production),10)
        self.v_ij = np.multiply(rd.rand(num_of_production, num_of_DC),10)
        self.v_im = np.multiply(rd.rand(num_of_production, num_of_Recycling),10)
        self.v_jk = np.multiply(rd.rand(num_of_DC, num_of_Retail),10)
        self.v_jm =np.multiply(rd.rand(num_of_DC, num_of_Recycling),10)
        self.v_km = np.multiply(rd.rand(num_of_Retail, num_of_Recycling),10)
        self.z_cost = self.calc_cost()
        self.z_emission = self.calc_emission()
        self.fitness = 0

    # def calc_cost(self):
    #     z1 = np.multiply(fj,self.Wj) + np.multiply(fl, self.Yl)
    #     z2 = 