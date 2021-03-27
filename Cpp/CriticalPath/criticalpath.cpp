#include <iostream>
#include <fstream>
#include <iomanip>
using namespace std;

const int numOfVertex=100;

bool vertex[numOfVertex][numOfVertex];
int q[numOfVertex];
int n, m, d=0, c=0;

int du[numOfVertex], es[numOfVertex], lf[numOfVertex];

void doc_file(){
  ifstream fi;
  fi.open("C:/Users/quang_000/github/myprojects/Cpp/CriticalPath/input.txt", ios::in);
  fi >> n >> m;
  int s, f;
  for (int i=0; i<m; i++){
      fi >> s >> f;
      vertex[s][f] = 1;
  }
  for (int i = 0; i<n; i++){
      fi >> du[i];
  }
  fi.close();
}

void add(int n){
  c++;
  q[c] = n;
}

int pop(){
  d++;
  return q[d];
}

bool empty(){
  if (d==c){
    return true;
  }
  return false;
}

void init(){
  add(0);
}

void FindES(){
  while (!empty()){
    int v = pop();
    //cout << v << " ";
    for (int i=0; i<n; i++){
      if ((true) && (vertex[v][i]==1)){
        add(i);
        if (es[i] < es[v] + du[v]){
            es[i] = es[v] + du[v];
        }
      }
    }
  }
}

void FindLF(){
    d=c;
    add(n-1);
    lf[n-1] = es[n-1];
  while (!empty()){
    int v = pop();
    //cout << v << " ";
    for (int i=0; i < n; i++){
      if ((vertex[i][v]==1)){
        add(i);
        if (lf[i]=0){
            lf[i] = lf[v] - du[v];
        }else{
            if (lf[i] < lf[v] - du[v]){
                lf[i] = lf[v] - du[v];
            }
        }
      }
    }
  }
}

// char numToChar(int n){
//
// }

void printOut(){
    cout << fixed << setw(4);
    cout << fixed << setw(5) << "no.";
    cout << fixed << setw(4) << "ES";
    cout << fixed << setw(4) << "LS" << endl;
    for (int i=1; i<n-1; i++){
        cout << fixed << setw(4) << (char)(i+64) << ":";
        cout << fixed << setw(4) << es[i];
        cout << fixed << setw(4) << lf[i] << endl;
    }
    cout << endl << "Critical Path is: ";
    for (int i=1; i<n-1; i++){
        if (lf[i]-du[i] == es[i]){
            cout << (char)(i+64) << "  ";
        }
    }
    // for (int i=0; i<n; i++){
    //   for (int j=0; j<n; j++){
    //     cout << vertex[i][j] << "  ";
    //   }
    //   cout << endl;
    // }
}

int main(){
  doc_file();
  init();
  FindES();
  FindLF();
  printOut();
  return 0;
}
