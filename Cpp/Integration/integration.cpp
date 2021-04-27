#include <iostream>
#include <cmath>
using namespace std;

const double e  = 2.7182818;
const double dx = 0.00001;
float a, b;

float myFunction(float x){
  //return (pow(e,x) + pow(e, x * (-1)));
  //return (0.5*x);
  return (0.25*x*x - x + 2);
}

float integration(float a, float b){  //Reimann sum algorithm
  float result=0;
  for (float x=a; x<b; x=x+dx){
    result += dx * myFunction(x);
  }
  return result;
}

float derivative(float x){
  return (myFunction(x + dx)-myFunction(x))/(dx);
}

float integration2(float a, float b){    //Loc Huynh sum algorithm
  float result = 0;
  for (float x=a; x<b; x=x+dx){
    result += dx * myFunction(x) + (derivative(x)*dx)*(dx/2);
    //cout << result << endl;
  }
  return result;
}

int main(){
  cout << "Take the integration of f(x) when x go from: ";
  cin >> a;
  cout << "To ";
  cin >> b;
  cout << "The result is " << integration2(a,b) << endl;
  return 0;
}
