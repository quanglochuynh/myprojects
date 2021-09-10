function sigmoid(x){
    return 1/(1+Math.exp(-x));
}

function dsigmoid(y){
    return y*(1-y);
}

class NeuralNetwork{
    constructor(numI, numH, numO){
        this.numOfInput = numI;
        this.numOfHidden = numH;
        this.numOfOutput = numO;
        this.weightIH = new Matrix(numH, numI);
        this.weightHO = new Matrix(numO, numH);
        this.weightIH.randomize();
        this.weightHO.randomize();
        this.bias_H = new Matrix(numH,1);
        this.bias_O = new Matrix(numO,1);
        this.bias_H.randomize();
        this.bias_O.randomize();
        this.learningRate = 0.1;
    }

    feedForward(input_array){
        let inpMatrix = Matrix.arrayToMatrix(input_array);
        let hidMatrix = Matrix.multiply(this.weightIH, inpMatrix);  
        hidMatrix = Matrix.add(hidMatrix, this.bias_H);
        hidMatrix.map(sigmoid);
        let output = Matrix.multiply(this.weightHO, hidMatrix);
        output = Matrix.add(output, this.bias_O);
        output.map(sigmoid);
        return output.matrixToArray();
    }

}