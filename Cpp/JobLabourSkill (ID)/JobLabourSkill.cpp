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

bool z[maxJob], maxz[maxJob];
float maxprofit=0, profit=0;

float x[maxJob][maxLabour][maxSkills],maxx[maxJob][maxLabour][maxSkills];


void docfile(){
    fstream fi;
    fi.open("input.txt", ios::in);
    fi >> n >> m >> p;
    for (int i = 1; i<= n; i++){
        fi >> income[i];
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

void checkMax(){
  if (maxprofit < profit){
    cout << "checking" << endl;
    maxprofit = profit;
    for (int t=1; t<=n; t++){
      maxz[t] = z[t];
      //cout << maxz[t] << " ";
    }
    //cout << endl;
    for (int i=1; i<=n; i++){
      for (int j=1; j<=m; j++){
        for (int k=1; k<=p; k++){
          maxx[i][j][k] = x[i][j][k];
          //cout << maxx[i][j][k] << " ";
        }
        //cout << endl;
      }
      //cout << endl;
    }
  }
}

void test(int i){  //Uu tien lam cong viec thu i
    if (i==n+1){

    }else{
      float cost=0;
      for (int k=1; k<=p; k++){
        for (int j=1; j<=m; j++){
          if ((labourskills[j][k]==1) && (available[j] > requireskills[i][k])){
            cost = cost + ucost[j] * requireskills[i][k];
            z[i] = true;
            profit += income[i] - cost;
            available[j] -= requireskills[i][k];
            x[i][j][k] += requireskills[i][k];
            checkMax();
            test(i+1);
            x[i][j][k] -= requireskills[i][k];
            available[j] += requireskills[i][k];
            profit -= income[i] - cost;
            z[i] = false;
            cost = cost - ucost[j] * requireskills[i][k];
          }
        }
      }
    }
}

float min(float a, float b){
  if (a<b){
    return a;
  }
  return b;
}

void Try(int j){
  if (j==m){
    checkMax();
  }else{
    for (int i=1; i<=n; i++){
      for (int k=1; k<=p; k++){
        if ((labourskills[j][k] == 1) && (requireskills[i][k] > 0) && (available[j] > 0)){
          //int mi = min(requireskills[i][k], available[j]);
          z[i] = true;
          profit = profit + (income[i] - ucost[j] * min(requireskills[i][k], available[j]));
          available[j] -= min(requireskills[i][k], available[j]);
          x[i][j][k] += min(requireskills[i][k], available[j]);
          Try(j+1);
          x[i][j][k] -= min(requireskills[i][k], available[j]);
          available[j] += min(requireskills[i][k], available[j]);
          profit = profit - (income[i] - ucost[j] * min(requireskills[i][k], available[j]));
          z[i] = false;
        }
      }
    }
  }
}

int main(){
    docfile();
    Try(1);
    cout << "Max profit: " << maxprofit << endl;
    for (int i=1; i<=n; i++){
      if (maxz[i] == 1){
        cout << i << " ";
      }
    }
    cout << endl;
    for (int i=1; i<=n; i++){
      for (int j=1; j<=m; j++){
        for (int k=1; k<=p; k++){
          if (maxx[i][j][k] > 0){
            cout << "Job " << i << ": Number of labour type " << j << " using skill " << k << " is " << maxx[i][j][k] << endl;
          }
        }
      }
    }
    return 0;
}
