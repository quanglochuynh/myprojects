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
    
    map(fn){
        for (let i=0; i<this.rows; i++){
            for (let j=0; j<this.cols; j++){
                let val = this.data[i][j];
                this.data[i][j] = fn(val);
            }
        }
        return this;
    }

    transpose(){
        let result = new Matrix(this.cols, this.rows);
        for (let i=0; i<this.rows; i++){
            for (let j=0; j<this.cols; j++){
                result.data[j][i] = this.data[i][j];
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
