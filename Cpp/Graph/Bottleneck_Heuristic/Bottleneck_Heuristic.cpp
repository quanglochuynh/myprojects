#include <iostream>
#include <fstream>
using namespace std;

const int maxn = 100, maxm = 100;

int n,m;    //n: number of machines, m: number of jobs
int pr[maxn][maxm];
int graph[maxm][maxn];
int

void docfile(){
  ifstream file;
  file.open("input.txt", ios::in);
  file >> n >> m;
  for (int i=1; i<=n; i++){
    for (int j=1; j<=m; j++){
      file >> pr[i][j];
    }
  }
  for (int i=1; i<=m; i++){
    for (int j=1; j<=n; j++){
      file >> pr[i][j];
  }
  file.close();
}

void init(){
  int u=0;
  int length = 0, lengthmax=0;
  for (int i=1; <= m; i++){
    for (int j=1; j<=n; j++){
      length += pr[]
    }
  }
}


int main(){
    docfile();
    init();
    return 0;
}
