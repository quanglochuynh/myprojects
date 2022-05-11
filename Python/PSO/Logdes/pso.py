from email import header
import numpy as np
from numpy import random as rd
import matplotlib.pyplot as plt
import os
import csv

#/ Objective
# Min cost, max responsiveness, min emission
# Zc, Zr, Ze
# Objective function
#minimize w1*Zc + w2*(M-Zr) +w3*Ze
# 

dc_name = ["Tonekabonl","Tonekabon2","	Tonekabon3","	Chalus1","	Chalus2","Chalus3","Qaemshahr1","Qaemshahr2","Ramsarl","Ramsar2","Baboll","Babol2","Neka"]
garden_name = ["Ramsarl","Ramsar2","Ramsar3","Noorl","Noor2","Noor3","Saril","Sari2","Sari3"]
fruit_customer_name = ["Chalus1","Chalus2","Babolsar","Amoll","Amol2","Amol3","Ramsar","Behshahr","Pol sefid"]
compost_customer_name = ["Behshahr1","Behshahr2","Tonakabon","Neka","Juybar","Ramsar","Noor","Sari"]
composting_center_name = ['Noshahr1', 'Noshahr2', 'Amoll', 'Amol2', 'Amol3', 'Chalus1', 'Chalus2', 'Chalus3', 'Ramsar1', 'Ramsar2', 'Saril', 'Sari2', 'Juybar']
name = np.concatenate([garden_name, dc_name, fruit_customer_name, composting_center_name, compost_customer_name], axis=0)
print(np.shape(name))
num_of_DC = len(dc_name)
num_of_garden = len(garden_name)
num_of_fruit_customer = len(fruit_customer_name)
num_of_compost_customer = len(compost_customer_name)
num_of_composting_center = len(composting_center_name)
num_of_location = num_of_DC+num_of_garden+num_of_fruit_customer+num_of_composting_center+num_of_fruit_customer

#data
total_time = 8
t_prime = 3
fj = [36.363, 36.250, 31.818, 31.700, 30.800]
fl = [18.181, 18.100, 13.636, 13.530, 12.520]
dc = 0.073
ch = rd.uniform(low=38, high=45)
cp = rd.uniform(50,59)
cr = rd.uniform(50,68)
cp_prime = rd.uniform(63,82)
rho = 0.6
d = rd.uniform(5,15)
d_prime = rd.uniform(2,6)
fej = [750.225, 840.040, 836.020, 842.000, 840.000]
fel = [700.000, 800.000, 750.000, 600.000, 950.000]
eh = [260, 240, 220, 250, 215, 230, 235, 225, 257, 219, 270, 210, 205]
eP = [230, 220, 235, 245, 225, 240, 215, 255, 260, 229, 275, 240, 235]
ec = [180, 120, 130, 160, 170, 115, 125, 135, 145, 154, 142, 133, 150]
ep_prime = [310, 305, 300, 290, 305, 285, 315, 295, 288]
d_epsilon = 0.062
alpha_t = [0.1, 0.12, 0.15,0,0,0,0, 0]
lambda_c = rd.uniform(50,120)
lambda_h = [80, 50, 65, 50, 70, 30, 50, 25, 77, 49, 60, 60, 90]
theta = [0.12, 0.13, 0.14, 0.145, 0.145, 0.148, 0.15, 0.15]
beta = [0.12, 0.12, 0.13, 0.135, 0.14, 0.145, 0.145, 0.15]
lambda_r = rd.uniform(3,8)
phi = 1.1
wc = 91
we = 1000


def read_csv(name):
    res = []
    cwd = os.getcwd()
    # print(cwd)
    with open(os.path.join(cwd, "logdes_data", name)) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        head = next(csv_reader)
        for row in csv_reader:
            new_row = []
            for i in range(1, len(row)):
                new_row.append(row[i])
            res.append(new_row)
    return res


ComposeCenter2FruitCustomer = read_csv('ComposeCenter2FruitCustomer.csv')
ComposingCenter2CompostCustomer = read_csv('ComposingCenter2CompostCustomer.csv')
DC2ComposingCenter = read_csv('DC2ComposingCenter.csv')
DC2FruitCustomer = read_csv('DC2FruitCustomer.csv')
Garden2Composing = read_csv('Garden2Composing.csv')
Garden2DC = read_csv('Garden2DC.csv')
Garden2FruitCustomer = read_csv('Garden2FruitCustomer.csv')

#Decision vars

class DNA:
    def __init__(self):
        self.Wj = np.zeros(num_of_DC)
        self.Yl = np.zeros(num_of_composting_center)
        self.X_r_r = np.zeros((num_of_location, num_of_location, total_time))
        self.Ih = np.zeros((num_of_DC, total_time))
        self.ld = np.zeros((num_of_garden, total_time))
        self.z_cost = 0
        self.z_response = 0
        self.z_emission = 0
        self.fitness = self.calcfitness()

    def calcfitness(self):
        print('fit')

    def calc_cost(self):
        z1 = np.multiply(fj,self.Wj) + np.multiply(fl, self.Yl)
        z2 = 