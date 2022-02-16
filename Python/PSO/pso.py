import numpy as np
from numpy import random as rd



class particle:
    def __init__(self, ub, lb, vm) :
        self.value = np.subtract(rd.rand(1, len(ub)) * np.subtract(ub,lb), lb)
        self.velocity = np.subtract(rd.rand(1, len(ub)) * np.multiply(2,vm), vm)

def get_PSO(max_iteration, num_of_particle, upper_bound, lower_bound):
    w = 1
    wdamp = 0.99
    c1 = 1.5
    c2 = 1.5

    vel_max = np.subtract(upper_bound, lower_bound) * 0.15
    p = particle(upper_bound, lower_bound, vel_max)
    print(p.velocity)








get_PSO(100, 100, [2, 2 , 2], [0, 0, 0])