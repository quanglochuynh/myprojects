#include <iostream>
#include <fstream>
using namespace std;

int n;

void readfile(){
    ifstream fi;
    fi.open("input.txt", ios::in);
    fi >> n;
    string line;
    for (int i=0; i<n; i++){
        while (getline(fi,line)){
            istringstream iss(line);
            int v;
            while (iss >> v){

            }
        }
    }
    fi.close();
}

int main() {
    readfile();
    return 0;
}
