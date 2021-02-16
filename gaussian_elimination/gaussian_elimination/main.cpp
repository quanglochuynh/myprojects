//
//  main.cpp
//  Gaussian elimination
//
//  Created by Huynh Quang Loc on 10/22/20.
//

#include <iostream>
#include <iomanip>
#include <fstream>

using namespace std;

int n;
float mat[100][100];
float det = 1;

void Doc_file(){
    fstream inp;
    inp.open("input.txt", ios::in);
    inp >> n;
    for (int i=1; i<=n; i++){
        for (int j=1; j<=n; j++){
            inp >> mat[i][j];
        }
    }
    inp.close();
}

void Ghi_file(){
    for (int i=1; i<=n; i++){
        for (int j=1; j<=n; j++){
            cout << fixed << setprecision(3) << setw(10) << mat[i][j];
        }
        cout << endl << endl;
    }
    cout << endl<< endl;
}

void swp(int u, int v){
    cout << "Swap " << u << " with " << v << "\n";
    det *= -1;
    for (int i=1; i<=n; i++){
        swap(mat[u][i], mat[v][i]);
    }
}

void gaussian(){
    for (int i=1; i<=n; i++){
        for (int j=i+1; j<=n; j++){
            if (mat[i][i] == 0){
                for (int t= i+1; t<=n; t++){
                    if (mat[t][i] ==0){
                        continue;
                    }else{
                        swp(t,i);
                        break;
                    }
                }
            }
            float d = (-1) * mat[j][i] / mat[i][i];
            for (int k=1; k<=n; k++){
                mat[j][k] = mat[i][k] * d + mat[j][k];
            }
        }
        Ghi_file();
        det = det * mat[i][i];
    }
}

int main() {
    Doc_file();
    gaussian();
    cout << "Det = " << det << endl;
    //Ghi_file();
    return 0;
}
