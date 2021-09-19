#include <iostream>
#include <iomanip>
#include <math.h>
#include <stdlib.h>
#include <time.h>

using namespace std;

class Matrix{
public:
    int rows;
    int cols;
    float data[1000][1000];

    Matrix(int row, int col){
        rows = row;
        cols = col;
        for (int i=0; i<rows; i++){
            for (int j=0; j<cols; j++){
                data[i][j] = (rand()%200 - 100)/100.0;
            }
        }
    }

    void show(){
        for (int i=0; i<rows; i++){
            for (int j=0; j<cols; j++){
                cout << setw(11) << setprecision(6) << fixed << data[i][j];
            }
            cout << endl;
        }
        cout << endl;
    }
    
    static Matrix add(Matrix m, Matrix n){
        Matrix res(m.rows, m.cols);
        for (int i=0; i<m.rows; i++){
            for (int j=0; j<m.cols; j++){
                res.data[i][j] = m.data[i][j] + n.data[i][j];
            }
        }
        return res;
    }
};
