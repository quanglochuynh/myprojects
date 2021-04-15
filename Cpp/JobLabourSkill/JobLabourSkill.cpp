#include <iostream>
#include <fstream>
#include <iomanip>
using namespace std;

const int maxLabour=100, maxJob = 200, maxSkills = 50;

int n, m, p;
float income[maxJob];
float available[maxLabour], ucost[maxLabour];
int requireskills[maxJob][maxSkills];
bool labourskills[maxLabour][maxSkills];
bool z[maxJob];
float x[maxJob][maxLabour][maxSkills];


void docfile(){
    fstream fi;
    fi.open("input.txt", ios::in);
    fi >> n >> m >> p;
    for (int i = 1; i<= n; i++){
        fi >> income[i];
        cout << income[i] << endl;
    }
    for (int i=1; i<=n; i++){
        for (int j=1; j<=p; j++){
            fi >> requireskills[i][j];
        }
    }
    for (int i = 1; i<= m; i++){
        fi >> available[i];
    }
    for (int i = 1; i<= m; i++){
        fi >> ucost[i];
    }
    for (int i=1; i<=m; i++){
        for (int j=1; j<=p; j++){
            fi >> labourskills[i][j];
        }
    }
    fi.close();
}

// void calculateProfit(){
//     for (int i=1; i<=n; i++){
//         for (int j=1; j<=m; j++){
//             for (int k=1; k<=p; k++){
//                 x[i][j][k] +=
//             }
//         }
//     }
// }

void try()


int main(){
    docfile();
    //calculateProfit();
    return 0;
}
