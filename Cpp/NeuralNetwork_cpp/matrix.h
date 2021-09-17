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
        srand (time(NULL));
        this->rows = row;
        this->cols = col;
        for (int i=0; i<rows; i++){
            for (int j=0; j<cols; j++){
                this->data[i][j] = (rand()%200 - 100)/100.0;
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
    
    void add(Matrix m){
        for (int i=0; i<m.rows; i++){
            for (int j=0; j<m.cols; j++){
                this->data[i][j] += m.data[i][j];
            }
        }
    }
};
