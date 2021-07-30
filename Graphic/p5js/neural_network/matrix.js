class Matrix{
    constructor(row, col){
        this.rows = row;
        this.cols = col;
        this.matrix = [];
    
        for (let i=0; i<this.rows; i++){
            this.matrix[i] = [];
            for (let j=0; j<this.cols; j++){
                this.matrix[i][j] = 0;
            }
        }
    }
    
    randomize(){
        for (let i=0; i<this.rows; i++){
            for (let j=0; j<this.cols; j++){
                this.matrix[i][j] = Math.floor(Math.random()*10);
            }
        }
    }
    
    add(n){
    
        if (n instanceof Matrix){
            for (let i=0; i<this.rows; i++){
                for (let j=0; j<this.cols; j++){
                    this.matrix[i][j] += n.matrix[i][j];
                }
            }
        }else{
            for (let i=0; i<this.rows; i++){
                for (let j=0; j<this.cols; j++){
                    this.matrix[i][j] += n;
                }
            }
        }
    }
    
    multiply(n){
        if (n instanceof Matrix){
            for (let i=0; i<this.rows; i++){
                for (let j=0; j<this.cols; j++){
                    this.matrix[i][j] *= n;
                }
            }
        }else{
            for (let i=0; i<this.rows; i++){
                for (let j=0; j<this.cols; j++){
                    this.matrix[i][j] *= n;
                }
            }
        }
    }
}
