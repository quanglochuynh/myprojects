//Created by Loc Q. Huynh

#include <iostream>
#include <fstream>
#include <iomanip>
using namespace std;

bool type;      //=false neu minimize, true neu maximize
int n,m;        //number of variable, nums of constrains
float tableau[20][20];
int iter = 0;

void docfile(){
    ifstream inpfile;
    inpfile.open("input.txt",ios::in);
    inpfile >> n >> m;
    for (int i=1; i<=n; i++){
        inpfile >> tableau[0][i];
        tableau[0][i] *=-1;
    }
    for (int i = 1; i <= m; i++){
        for (int j = 1; j <= n+1; j++){
            if (j != n+1){
                inpfile >> tableau[i][j];
            }else{
                inpfile >> tableau[i][j+m];
            }
        }
    }
    inpfile.close();
}

void xuatbang(){
    iter++;
    cout << "ITERATION " << iter << ":\n";
    cout << setw(7) << left << "B.V";
    for (int i=1; i<=n+m; i++){
        cout << "x";
        cout << setw(7) << left << i;
    }
    cout << setw(7) << left << "RHS";
    cout << endl;

    for (int i =0; i<=m; i++){
        for (int j =0; j<=n+m+1; j++){
        	if ((i==0)&&(j==0)){
        		cout << setw(8) << left << "Z";
			}else if (j!=0){
                cout << setw(8) << setprecision(3) << left << tableau[i][j];
            }else{
                cout << "x";
                cout << setw(7) << left << tableau[i][j];
            }
        }
        cout << endl;
    }
}

void init(){
    for (int i =0; i<=20; i++){
        for (int j =0; j<=20; j++){
            tableau[i][j] = 0;
        }
    }
    docfile();
    for (int i=n+1; i<= n+m; i++){
        tableau[i-n][i] = 1;
    }
    for (int i = 1; i <= m; i++){
        tableau[i][0] = i+n;
    }
}

int findEnterVar(){
    float min = 2147483647;
    int e=-1;
    for (int i = 1; i <= n+m; i++){
        if (tableau[0][i] < 0){
            if (tableau[0][i] < min){
                min = tableau[0][i];
                e = i;
            }
        }
    }
    return e;
}

int findLeavingVar(int en){
    float mi = 2147483647;
    int l=-1;
    for (int i = 1; i<=m; i++){
        if (tableau[i][en] > 0){
            if (tableau[i][n+m+1]/tableau[i][en] < mi){
                mi = tableau[i][n+m+1] / tableau[i][en];
                l=i;
            }
        }
    }
    return l;
}

bool process(){
    xuatbang();
    int en = findEnterVar();
    if (en == -1){
        return false;
    }else{
        int lv = findLeavingVar(en);
        cout << "Entering variable is x" << en << endl;
        cout << "Leaving variable is x" << tableau[lv][0] << endl<< endl << endl;
        tableau[lv][0]=en;
        float d = tableau[lv][en];
        //cout << d << endl << endl;
        for (int i = 1; i <= n+m+1; i++){
            tableau[lv][i] = tableau[lv][i] / d;
        }
        //ROW OPERATION
        for (int i = 0; i<= m; i++){
            if (i != lv) {
                float a = tableau[lv][en];
                float b = tableau[i][en];
                if (b !=0) {
                    for (int j = 1; j <= m+n+1; j++){
                        tableau[i][j] = (tableau[i][j] * a) + (tableau[lv][j] * b * (-1));
                    }
                }
            }
        }
        return true;
    }
}

void conclude(){
    cout << "\n \nZmax = " << tableau[0][n+m+1] << endl << endl;
    for (int i = 1; i<=m; i++){
        cout << "x" << tableau[i][0] << " = " << tableau[i][n+m+1] << endl;
    }
    cout << "Shadow price:" << endl;
    for (int j = n; j<= n+m; j++){
        cout << "x" << j << " = " << tableau[0][j] << endl;
    }
}

int main(){
    init();
    bool p = process();
    while (p != false){
        p = process();
    }
    conclude();
    system("pause");
    return 0;
}
