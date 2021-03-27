#include <iostream>
#include <fstream>
using namespace std;

bool vertex[100][100];
bool visit[100];
int n;


void doc_file(){
  ifstream fi;
  fi.open("/Users/huynhquangloc/github/myprojects/Cpp/DFS/input.txt", ios::in);
  fi >> n;
  for (int i=1; i<=n; i++){
    for (int j=1; j<=n; j++){
      fi >> vertex[i][j];
    }
  }
  fi.close();
}

void DFS(int v){
  if (visit[v] == false){
    visit[v] = true;
    cout << v << "  ";
    for (int i=1; i<=n; i++){
      if (vertex[v][i]==1){
        DFS(i);
      }
    }
  }
}

int main(){
  doc_file();
  DFS(1);
  return 0;
}
