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
                this.data[i][j] = Math.floor(Math.random()*10);
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

    static multiply(n){
        if (this.cols !== n.rows){
            console.log('cannot multiply');
            return undefined;
        }else{
            let result = new Matrix(this.rows, n.cols);
            for (let i=0; i<result.rows; i++){
                for (let j=0; j<result.cols; j++){
                    let sum = 0;
                    for (let k=0; k<this.cols; k++){
                        console.log(this.data[i][k] + " * " + n.data[k][j]);
                        sum += this.data[i][k] * n.data[k][j];
                    }
                    result.data[i][j] = sum;
                }
            }
            return result;
        }
    }
    
    multiply(n){
        for (let i=0; i<this.rows; i++){
            for (let j=0; j<this.cols; j++){
                this.data[i][j] *= n;
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

}
