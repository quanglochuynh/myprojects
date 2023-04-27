import sys
import numpy as np


if __name__ == '__main__':
    n = len(sys.argv)-1
    array = np.array(sys.argv[1:n+1], dtype=np.uint16)
    for i in range(0, n):
        for j in range(i, n):
            if (array[j] > array[i]):
                array[i], array[j] = array[j], array[i]

    print(array)
