#include <fstream>
#include <iostream>
using namespace std;

const int ScaleFactor = 10;
const int Size = 50;

//short data[Size][Size];
short val;
string str;

short output[Size*ScaleFactor][Size*ScaleFactor];

int main(){
    ifstream inp;
    ofstream out;
    inp.open("WH.txt", ios::in);
    for (int i = 0; i < Size; i++){
        for (int j = 0; j < Size; j++){
            inp >> val;
            if (val!=0){
            	// cout << i << "  " << j << endl;
            	for (int u = i*ScaleFactor; u < (i+1)*(ScaleFactor); u++){
	                for (int v = j*ScaleFactor; v < (j+1)*(ScaleFactor); v++){
	                    output[u][v] = val;
	                }
	            }
			}
        }
    }

    
    inp.close();
    out.open("WH500.txt", ios::out);
    for (int i = 0; i<Size*ScaleFactor; i++){
        for (int j = 0; j<Size*ScaleFactor; j++){
            out << output[i][j];
            if (j != Size*ScaleFactor){
                out << ',';
            }
        }
        out << endl;
    }
    out.close();
    cout << "Done\n";
    return 0;
}
