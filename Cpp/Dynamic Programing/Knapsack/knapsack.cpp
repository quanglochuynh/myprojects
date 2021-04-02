#include <iostream>
#include <fstream>
#include <math.h>
#include <iomanip>
using namespace std;

const int noi = 1000, maxcapa = 1000;

int n, c, p=0;
int w[noi], v[noi];
bool x[noi];
int ks[noi][maxcapa];

void readData(){
    ifstream file;
    file.open("data.txt", ios::in);
    file >> n >> c;
    for (int i=1; i<=n; i++){
        file >> w[i];
    }
    for (int i=1; i<=n; i++){
        file >> v[i];
    }
    file.close();
}

void init(){
    for (int i=0; i<=c; i++){
        ks[0][i] = 0;
    }
    for (int i=0; i<=n; i++){
        ks[i][0] = 0;
    }
}

void process(){
    for (int i = 1; i<=n; i++){
        for (int j=1; j<= c; j++){
            if (w[i] <= j){
                ks[i][j] = max(ks[i-1][j], ks[i-1][j-w[i]] + v[i]);
            }else{
                ks[i][j] = ks[i-1][j];
            }
            cout << setw(3) << left << ks[i][j];
        }
        cout << endl;
    }
}

void backtrack(){
    int k=n, g=c;
    while (k!=0){
        if (ks[k][g] != ks[k-1][g]){
            cout << setw(3) << left << k;
            g = g - w[k];
        }        
        k--;
    }
}

int main(){
    readData();
    init();
    process();
    cout << "\nOptimum value is: " << ks[n][c] << endl;
    cout << "Picked items: ";
    backtrack();
    return 0;
}