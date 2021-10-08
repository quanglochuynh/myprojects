class AHPmatrix{
    constructor(n, meaningMatrix, valMatrix){
        this.data = [];
        for (let i=0; i < n; i++){
            this.data[i] = [];
            for(let j=0; j < n; j++){
                this.data[i][j] = meaningMatrix[valMatrix[i][j]];
            }
        }
    }

    show(){
        console.log(this.data);
    }
}

//  1/9 -> 1/2, 1, 2 -> 9

let meaning = [ new FuzzyNumber(1/9, 1/9, 1/7),
                new FuzzyNumber(1/9, 1/8, 1/6),
                new FuzzyNumber(1/9, 1/7, 1/5),
                new FuzzyNumber(1/8, 1/6, 1/4),
                new FuzzyNumber(1/7, 1/5, 1/3),
                new FuzzyNumber(1/6, 1/4, 1/2),
                new FuzzyNumber(1/5, 1/3, 1),
                new FuzzyNumber(1/4, 1/2, 1),
                new FuzzyNumber(1, 1, 3),
                new FuzzyNumber(1, 2, 4),
                new FuzzyNumber(1, 3, 5),
                new FuzzyNumber(2, 4, 6),
                new FuzzyNumber(3, 5, 7),
                new FuzzyNumber(4, 6, 8),
                new FuzzyNumber(5, 7, 9),
                new FuzzyNumber(6, 8, 9),
                new FuzzyNumber(7, 9, 9)];
/*
1/9 -> 0
1/7 -> 2
1/5 -> 4
1/3 -> 6
1 -> 8
3 -> 10
5 -> 12
7 -> 14
9 -> 16
*/
let valMat = [  [8, 12, 10],
                [4, 8, 6],
                [6, 10, 8] 
            ];

let mat = new AHPmatrix(3, meaning, valMat);



mat.show();
