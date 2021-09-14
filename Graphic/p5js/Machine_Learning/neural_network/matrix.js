class Matrix{
    constructor(n,m){
        this.rows = n;
        this.cols = m;
        this.data = [];
        for(let i=0; i< n; i++){
            this.data[i] = [];
            for (let j=0; j< m; j++){
                this.data[i][j] = 0;
            }
        }
    }

    show(){
        console.table(this.data);
    }

    randomize(){
        for (let i=0; i< this.rows; i++){
            for (let j = 0; j< this.cols; j++){
                this.data[i][j] = Math.random()*2 - 1;
            }
        }
    }

    plus(a){
        for (let i=0; i< this.rows; i++){
            for (let j = 0; j< this.cols; j++){
                this.data[i][j] += a;
            }
        }
    }

    static add(a,b){    //element-wise
        if ((a.rows != b.rows) || (a.cols != b.cols)){
            console.log('cannot add matrices, wrong dimension');
        }else{
            let res = new Matrix(a.rows, a.cols);
            for (let i=0; i< a.rows; i++){
                for (let j = 0; j< a.cols; j++){
                    res.data[i][j] = a.data[i][j] + b.data[i][j];
                }
            }
        return res;
        }
    }

    static subtract(a,b){    //element-wise
        if ((a.rows != b.rows) || (a.cols != b.cols)){
            console.log('cannot add matrices, wrong dimension');
        }else{
            let res = new Matrix(a.rows, a.cols);
            for (let i=0; i< a.rows; i++){
                for (let j = 0; j< a.cols; j++){
                    res.data[i][j] = a.data[i][j] - b.data[i][j];
                }
            }
        return res;
        }
    }

    scale(b){
        for (let i=0; i< this.rows; i++){
            for (let j = 0; j< this.cols; j++){
                this.data[i][j] *= b;
            }
        }
    }

    hardamard(n){
        if ((n.cols != this.cols) || (n.rows != this.rows)){
            console.log('cannot hadamarding, wrong dimension');
        }else{
            for (let i=0; i< this.rows; i++){
                for (let j = 0; j< this.cols; j++){
                    this.data[i][j] *= n.data[i][j];
                }
            }
        }
    }

    static multiply(a,b){
        if (a.cols != b.rows){
            console.log('cannot multiply');
            return undefined;
        }else{
            let res = new Matrix(a.rows, b.cols);
            for (let i = 0; i < a.rows; i++){
                for(let j = 0; j< b.cols; j++){
                    let sum = 0;
                    for (let k=0; k < a.cols; k++){
                        sum += a.data[i][k] * b.data[k][j];
                    }
                    res.data[i][j] = sum;
                }
            }
            return res;
        }
    }



    map(fn){
        for (let i=0; i< this.rows; i++){
            for (let j = 0; j< this.cols; j++){
                this.data[i][j] = fn(this.data[i][j]);
            }
        }
    }

    static map(matrix, fn){
        let res = new Matrix(matrix.rows, matrix.cols);
        for (let i=0; i< matrix.rows; i++){
            for (let j = 0; j< matrix.cols; j++){
                res.data[i][j] = fn(matrix.data[i][j]);
            }
        }
        return res;
    }

    static transpose(a){
        let res = new Matrix(a.cols, a.rows);
        for (let i=0; i< a.cols; i++){
            for (let j = 0; j< a.rows; j++){
                res.data[i][j] = a.data[j][i];
            }
        }
        return res;
    }

    static arrayToMatrix(a){
        let m = new Matrix(a.length,1);
        for (let i=0; i<a.length; i++){
            m.data[i][0] = a[i];
        }
        return m;
    }

    matrixToArray(){
        let a = [];
        for (let i=0; i<this.rows; i++){
            for (let j=0; j<this.cols; j++){
                a.push(this.data[i][j]);
            }
        }
        return a;
    }

}