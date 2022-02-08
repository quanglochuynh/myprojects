#include <iostream>
#include <fstream>
#include <cmath>
#include <cstdlib>
#include <ctime>
using namespace std;

int n;
float mean;

void getInput(){
	cout << "So luong sample: ";
	cin >> n;
	cout << "Mean: ";
	cin >> mean;
}

float Poison(float m){
	int i = 0;
	float P = 1;
	float lambda = exp(-1*mean);
	do{
		float r = (float)rand()/ RAND_MAX;
		P = P* r;
		i++;
	} while (P > lambda);
	return i;
}

void process(){
	float k;
	ofstream file;
	file.open("samples.txt");
	for (int i=1; i <=n; i++){
		k = Poison(mean);
		file << k << endl;
		cout << k << endl;
	}
	file.close();
}

int main(){
	srand((unsigned)time(NULL));
	getInput();
	process();
	return 0;
}
