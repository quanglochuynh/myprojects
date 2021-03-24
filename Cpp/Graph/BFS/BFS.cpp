#include <iostream>
#include <fstream>
using namespace std;

bool vertex[100][100];
bool visit[100];
int q[100];
int n, d=0, c=0;


void doc_file(){
  ifstream fi;
  fi.open("/Users/huynhquangloc/github/myprojects/Cpp/Graph/BFS/input.txt", ios::in);
  fi >> n;
  for (int i=1; i<=n; i++){
    for (int j=1; j<=n; j++){
      fi >> vertex[i][j];
    }
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
  add(1);
  visit[1]=true;
}

void BFS(){
  while (d<c){
    int v = pop();
    cout << v << " ";
    for (int i=1; i<=n; i++){
      if ((visit[i] == false) && (vertex[v][i]==1)){
        visit[i] = true;
        add(i);
      }
    }
  }
}

int main(){
  doc_file();
  init();
  BFS();
  return 0;
}
