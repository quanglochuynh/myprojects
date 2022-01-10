import random

class matrix:
    def __init__(self, n,m):
        self.n = n
        self.m = m
        self.data = [[0]*m]*n
        

    def show(self):
        for i in range(self.n):
            print(self.data[i])
        

a = matrix(2,2);

print('a = ')
a.show()