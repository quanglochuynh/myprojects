#include <iostream>
#include <cmath>
#define e  2.71828182846
#define dx 0.000001
using namespace std;

float n;

float myFunction(float x){
  return (pow(e,x) + pow(e, x * (-1))); //e^x - e^-x
}

float derivative(float x){
  return (myFunction(x + dx)-myFunction(x))/(dx);
}

int main(){
  cout << "Take the derivative of f(x) when x approach: ";
  cin >> n;
  cout << "The result is " << derivative(n) << endl;
  return 0;
}
