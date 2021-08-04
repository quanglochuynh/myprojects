class Matrix{
    constructor(row, col){
        this.rows = row;
        this.cols = col;
        this.data = [];
    
        for (let i=0; i<this.rows; i++){
            this.data[i] = [];
            for (let j=0; j<this.cols; j++){
                this.data[i][j] = 0;
            }
        }
    }
    
    randomize(){
        for (let i=0; i<this.rows; i++){
            for (let j=0; j<this.cols; j++){
                this.data[i][j] = Math.random()*2 - 1;
            }
        }
    }
    
    add(n){
        if (n instanceof Matrix){
            for (let i=0; i<this.rows; i++){
                for (let j=0; j<this.cols; j++){
                    this.data[i][j] += n.data[i][j];
                }
            }
        }else{
            for (let i=0; i<this.rows; i++){
                for (let j=0; j<this.cols; j++){
                    this.data[i][j] += n;
                }
            }
        }
    }

    static subtract(a,b){
        let result = new Matrix(a.rows, a.cols);
        for (let i=0; i<result.rows; i++){
            for (let j=0; j<result.cols; j++){
                result.data[i][j] = a.data[i][j] - b.data[i][j];
            }
        }
        return result;
    }

    static multiply(m, n){
        if (m.cols !== n.rows){
            console.log('cannot multiply');
            return undefined;
        }else{
            let result = new Matrix(m.rows, n.cols);
            for (let i=0; i<result.rows; i++){
                for (let j=0; j<result.cols; j++){
                    let sum = 0;
                    for (let k=0; k<m.cols; k++){
                        sum += m.data[i][k] * n.data[k][j];
                    }
                    result.data[i][j] = sum;
                }
            }
            return result;
        }
    }

    multiply(m){
        if (this.cols !== m.rows){
            console.log('khong the multiply');
            return undefined;
        }else{
            let result = new Matrix(this.rows, m.cols);
            for (let i=0; i<result.rows; i++){
                for (let j=0; j<result.cols; j++){
                    let sum = 0;
                    for (let k=0; k<this.cols; k++){
                        sum += this.data[i][k] * m.data[k][j];
                        //console.log('sum = ' + sum);
                    }
                    result.data[i][j] = sum;
                }
            }
            return result;
        }
    }
    
    map(fn){
        for (let i=0; i<this.rows; i++){
            for (let j=0; j<this.cols; j++){
                let val = this.data[i][j];
                this.data[i][j] = fn(val);
            }
        }
        return this;
    }

    static map(matrix, fn){
        let result = new Matrix(matrix.rows, matrix.cols);
        for (let i=0; i<this.rows; i++){
            for (let j=0; j<this.cols; j++){
                let val = result.data[i][j];
                result.data[i][j] = fn(val);
            }
        }
        return result;
    }

    static transpose(a){
        let result = new Matrix(a.cols, a.rows);
        for (let i=0; i<a.rows; i++){
            for (let j=0; j<a.cols; j++){
                result.data[j][i] = a.data[i][j];
            }
        }
        return result;
    }

    print(){
        console.table(this.data);
    }

    static fromArr(a){
        let m = new Matrix(a.length,1);
        for (let i=0; i<a.length; i++){
            m.data[i][0] = a[i];
        }
        return m;
    }

    toArr(){
        let a = [];
        for (let i=0; i<this.rows; i++){
            for (let j=0; j<this.cols; j++){
                a.push(this.data[i][j]);
            }
        }
        return a;
    }

}
