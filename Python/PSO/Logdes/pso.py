import numpy as np
from numpy import float32, random as rd
import matplotlib.pyplot as plt
import os
import csv
import pandas as pd
class Location:
    def __init__(self, name, x, y):
        self.name = name
        self.x = x
        self.y = y

# 𝑖: Production locations; 
# 𝑗: Distribution locations; 
# 𝑘: Retail locations; 
# 𝑚: Recycling locations;

def read_csv(name, skip_row, skip_col):
    res = []
    cwd = os.getcwd()
    # print(cwd)
    with open(os.path.join(cwd, "logdes_data", name)) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for k in range(skip_row):
            head = next(csv_reader)
        for row in csv_reader:
            new_row = []
            for i in range(skip_col, len(row)):
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

def process_distance(a,b):
    num_a = len(a)
    num_b = len(b)
    dis = np.zeros((num_a, num_b), dtype=np.uint8)
    for i in range(num_a):
        for j in range(num_b):
            # dis[i][j] = np.sqrt(np.square(a[i].x - b[j].x) + np.square(a[i].y - b[j].y ))*10
            dis[i][j] = np.abs((a[i].x - b[j].x) + (a[i].y - b[j].y ))
    return dis

def get_row_value(a):
    i=0
    # print(a)
    
    while (a[i]!=''):
        # print(i)
        i=i+1
        if i==len(a):return float32(a)
    if i==1: return float32(a[0])
    return float32(a[0:i])

production_name = []
DC_name = []
Retail_name = []
Recycling_name = []



map = read_csv('map.csv', 0,0)
process_map(map)

num_of_production = len(production_name)
num_of_DC = len(DC_name)
num_of_Retail = len(Retail_name)
num_of_Recycling = len(Recycling_name)



l_ij = process_distance(production_name, DC_name)
l_im = process_distance(production_name,Recycling_name)
l_jk = process_distance(DC_name, Retail_name)
l_jm = process_distance(DC_name, Recycling_name)
l_km = process_distance(Retail_name, Recycling_name)

pd.DataFrame(l_ij).to_csv("l_ij")
pd.DataFrame(l_im).to_csv("l_im")
pd.DataFrame(l_jk).to_csv("l_jk")
pd.DataFrame(l_jm).to_csv("l_jm")
pd.DataFrame(l_km).to_csv("l_km")

# data = read_csv('data.csv', 5, 2)
# cap_p = get_row_value(data[0])
# cap_dc = get_row_value(data[1])
# cap_rec = get_row_value(data[2])
# retail_dm = get_row_value(data[3])
# Fp=get_row_value(data[4])
# Fdc=get_row_value(data[5])
# Fr=get_row_value(data[6])
# Cp=get_row_value(data[7])
# C_trans=get_row_value(data[8])
# Ch = get_row_value(data[9])
# Cr = get_row_value(data[10])
# Cd = get_row_value(data[11])
# Efp = get_row_value(data[12])
# Efdc = get_row_value(data[13])
# Efr = get_row_value(data[14])
# Ep = get_row_value(data[15])
# E_trans = get_row_value(data[16])
# Eh = get_row_value(data[17])
# Er = get_row_value(data[18])
# Ed = get_row_value(data[19])
# alpha_p = get_row_value(data[20])
# alpha_dc = get_row_value(data[21])
# alpha_retail = get_row_value(data[22])

# class DNA:
#     def __init__(self):
#         self.S = rd.randint(2, size=num_of_production)
#         self.W = rd.randint(2, size=num_of_DC)
#         self.G = rd.randint(2, size=num_of_Recycling)
#         self.Q = np.multiply(rd.rand(num_of_production),10)
#         self.v_ij = np.multiply(rd.rand(num_of_production, num_of_DC),10)
#         self.v_im = np.multiply(rd.rand(num_of_production, num_of_Recycling),10)
#         self.v_jk = np.multiply(rd.rand(num_of_DC, num_of_Retail),10)
#         self.v_jm =np.multiply(rd.rand(num_of_DC, num_of_Recycling),10)
#         self.v_km = np.multiply(rd.rand(num_of_Retail, num_of_Recycling),10)
#         # self.z_cost = self.calc_cost()
#         # self.z_emission = self.calc_emission()
#         self.fitness = 0

#     def calc_cost(self):
        
#         Zcf = np.sum(np.multiply(self.S,Fp)) + np.sum(np.multiply(self.W, Fdc)) + np.sum(np.multiply(self.G, Fr))
#         Zcp = np.sum(np.multiply(self.Q, Cp))
#         Zct = C_trans * (np.sum(np.multiply(self.v_ij, l_ij)) + np.sum(np.multiply(self.v_jk, l_jk)) + np.sum(np.multiply(self.v_im, l_im)) + np.sum(np.multiply(self.v_jm, l_jm)) + np.sum(np.multiply(self.v_km, l_km)))
#         Zch = np.sum(np.multiply(self.v_ij, Ch))
#         Zcr = np.sum(np.multiply(self.v_im, Cr)) + np.sum(np.multiply(self.v_jm, Cr)) + np.sum(np.multiply(self.v_km, Cr))
#         Zcd = np.transpose(self.v_im.transpose() - np.multiply(self.Q, alpha_p)) + np.transpose(self.v_jm.transpose() - np.multiply(self.v_ij, alpha_dc)) #+ np.transpose(self.v_km.transpose() - np.multiply(self.v_jk, alpha_retail))
#         print(Zcd)
#         return Zcf+Zcp+Zct+Zch+Zcr



# myDNA = DNA()

# print(myDNA.z_cost)