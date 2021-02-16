#include <iostream>
#include <ctime>
#include <cstdlib>
using namespace std;

const int sampleSize = 1000;
const int chosenNum = 20;
const float luckContribution = 0.05;        //percentage of luck on the overall evaluation (e.g: 5% ->strength = 1 - 5% = 95%)

struct people{
    float strength;
    float luck;
    float result;
};

people array[sampleSize];
float sumOfStrength=0, sumOfLuck = 0;

void initArray(){
  srand(time(NULL));
  for (int i=0; i < sampleSize; i++){
    array[i].strength = (rand()%10000)/(float)100;
    array[i].luck = (rand()%10000)/(float)100;
    array[i].result = ((array[i].strength * (1-luckContribution)) + (array[i].luck * luckContribution));
    sumOfStrength += array[i].strength;
    sumOfLuck += array[i].luck;
  }
}

void swapRes(int a, int b){
  people temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}

void sort(){        //buble sort because it's simple
  for (int i=0; i<sampleSize; i++){
    for (int j=i+1; j<=sampleSize; j++){
      if (array[i].result < array[j].result){
        swapRes(i,j);
      }
    }
  }
}

void printRes(int num) {
    int unlucky=0;
    for (int i=0; i<num; i++){
        cout << i+1 << ": \n";
        cout << "Result: " << array[i].result<< endl;
        cout << "Strength: " << array[i].strength << endl;
        cout << "Luck: " << array[i].luck << endl << endl << endl;
        if (array[i].luck<50) unlucky++;
    }
    cout << "Number of unlucky people: " << unlucky<< endl;
    cout << "Average strength: " << sumOfStrength/sampleSize << endl;
    cout << "Average luck: " << sumOfLuck / sampleSize << endl;
}

int main() {
  initArray();
  sort();
  printRes(chosenNum);
  return 0;
}
