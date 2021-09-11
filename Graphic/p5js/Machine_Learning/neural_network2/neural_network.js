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

    train(inputArray, targetArray){
        //feed forward
        let inpMatrix = Matrix.arrayToMatrix(inputArray);
        let hidMatrix = Matrix.multiply(this.weightIH, inpMatrix);  
        hidMatrix = Matrix.add(hidMatrix, this.bias_H);
        hidMatrix.map(sigmoid);
        let resultMatrix = Matrix.multiply(this.weightHO, hidMatrix);
        resultMatrix = Matrix.add(resultMatrix, this.bias_O);
        resultMatrix.map(sigmoid);

        //back-propagation
        let targetMatrix = Matrix.arrayToMatrix(targetArray);
        let outputError = Matrix.subtract(targetMatrix, resultMatrix);
        // console.table(inputArray);
        // resultMatrix.show();
        // targetMatrix.show();
        // outputError.show();

        //calculate gradient
        let gradient = Matrix.map(resultMatrix, dsigmoid);
        gradient.hardamard(outputError);
        gradient.scale(this.learningRate);
        //calculate delta
        let hidden_T = Matrix.transpose(hidMatrix);
        let weightHO_delta = Matrix.multiply(gradient, hidden_T);
        this.weightHO = Matrix.add(this.weightHO, weightHO_delta);
        this.bias_O = Matrix.add(this.bias_O, gradient);
        //calculate hidden error
        let weigthHO_Transposed = Matrix.transpose(this.weightHO);
        let hiddenError = Matrix.multiply(weigthHO_Transposed, outputError);
        //hiddenError.show();

        let hiddenGradient = Matrix.map(hidMatrix, dsigmoid);
        hiddenGradient.hardamard(hiddenError);
        hiddenGradient.scale(this.learningRate);
        let input_T = Matrix.transpose(inpMatrix);
        let weightIH_delta = Matrix.multiply(hiddenGradient, input_T);
        this.weightIH = Matrix.add(this.weightIH, weightIH_delta);
        this.bias_H = Matrix.add(this.bias_H, hiddenGradient);
    }

}