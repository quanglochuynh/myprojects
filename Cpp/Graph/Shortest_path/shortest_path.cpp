#include <iostream>
#include <fstream>
#include <iomanip>
using namespace std;

const int numOFvertices=100;

int n, m, a=0, b=0, s, d;
int path[numOFvertices][numOFvertices];
int dis[numOFvertices], q[numOFvertices], trace[numOFvertices];
bool visited[numOFvertices];

void readData(){
    ifstream file;
    file.open("data.txt",ios::in);
    file >> n >> m >> s >> d;
    int x,y;
    for (int i=1; i<=m; i++){
        file >> x >> y >> path[x][y];
        path[y][x] = path[x][y];
    }
    file.close();
}

void add(int v){
    b++;
    q[b]=v;
    //cout << "add " <<v << endl;
}

int pop(){
    a++;
    //cout << "pop " << q[a]<< endl;
    return q[a];
}

bool empty(){
    if (a=b){
        return true;
    }else{
        return false;
    }
}

void init(){
    for (int i = 1; i<=n; i++){
        dis[i] = 2147483647;
        visited[i] = false;
    }
    dis[s] = 0;
    visited[s] = true;
    add(s);
}

void Find(){
    int u;
    while (a!=b){
        u = pop();
        visited[u] = true;
        for (int i = 1; i<= n; i++){
            if ((path[u][i]!=0)&&(!visited[i])){
                add(i);
            }
        }
        for (int i=1; i<=n; i++){
            if ((path[u][i]!=0)&&(path[u][i] + dis[u])<dis[i]){
                    dis[i] = path[u][i] + dis[u];
                    trace[i] = u;
            }
        }
    }
}

void backtrack(int u){
    if (u != 0){
        backtrack(trace[u]);
        cout << setw(4) << left << u;
    }
}

int main(){
    readData();
    init();
    Find();
    cout << dis[d] << endl;
    backtrack(d);
    return 0;
}
