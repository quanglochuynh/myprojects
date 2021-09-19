#include <iostream>
#include <iomanip>
#include <math.h>
#include <stdlib.h>
#include <time.h>
#include "matrix.h"
using namespace std;

int main(){
    srand (time(NULL));
    Matrix x(5,5);
    Matrix y(5,5);
    x.show();
    y.show();
    //Matrix z(5,5);
    // //z = Matrix::add(x,y);
    //z.show();
    return 0;
}