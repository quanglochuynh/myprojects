#include <iostream>
#include <ctime>
#include <cstdlib>
#include <iomanip>
using namespace std;

const int sampleSize = 10000;
const int chosenNum = 20;
float strength[sampleSize], luck[sampleSize];
float result[sampleSize];

void initArray(){
  srand(time(NULL));
  for (int i=0; i < sampleSize; i++){
    strength[i] = (rand()%10000)/(float)100;
    luck[i] = (rand()%10000)/(float)100;
    result[i] = ((strength[i] * 0.95) + (luck[i] * 0.05));
  }
}

void swapRes(int a, int b){
  float temp = result[a];
  result[a] = result[b];
  result[b] = temp;

  temp = strength[a];
  strength[a] = strength[b];
  strength[b] = temp;

  temp = luck[a];
  luck[a] = luck[b];
  luck[b] = temp;
}



void sort(){
  for (int i=0; i<sampleSize; i++){
    for (int j=i+1; j<=sampleSize; j++){
      if (result[i] < result[j]){
        swapRes(i,j);
      }
    }
  }
}

void printRes(int num) {
    int unlucky=0;
    for (int i=0; i<num; i++){
        cout << i+1 << ": \n";
        cout << "Result: " << result[i]<< endl;
        cout << "Strength: " << strength[i] << endl;
        cout << "Luck: " << luck[i] << endl << endl << endl;
        if (luck[i]<50) unlucky++;
    }
    cout << "Number of unlucky people: " << unlucky<< endl;
}

int main() {
  initArray();
  sort();
  printRes(chosenNum);
  return 0;
}
