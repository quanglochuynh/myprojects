function sigmoid(x){
    return 1/(1+Math.exp(-x));
}

function dsigmoid(y){
    return y*(1-y);
}

class UserInterface{

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

        //BACK-PROPAGATION

        //calculate output error
        let targetMatrix = Matrix.arrayToMatrix(targetArray);
        let outputError = Matrix.subtract(targetMatrix, resultMatrix);
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

class MultilayerNeuralNetwork{
    constructor(layerArray, learning_rate){
        this.layerArray = layerArray;
        this.weightMatrix = [];
        for (let i=0; i<this.layerArray.length-1; i++){
            this.weightMatrix[i] = new Matrix(this.layerArray[i+1], this.layerArray[i]);
            this.weightMatrix[i].randomize();
        }
        this.biasMatrix = [];
        for (let i=0; i<this.layerArray.length-1; i++){
            this.biasMatrix[i] = new Matrix(layerArray[i+1], 1);
            this.biasMatrix[i].randomize();
        }
        this.learningRate = learning_rate;
    }

    predict(inputArray){
        if (inputArray.length != this.layerArray[0]){
            console.log('Wrong amount of input, ' + this.layerArray[0] + ' instead of ' + inputArray.length);
            return undefined;
        }else{
            let dataMatrix = Matrix.arrayToMatrix(inputArray);
            for (let i=0; i<this.weightMatrix.length; i++){
                dataMatrix = Matrix.multiply(this.weightMatrix[i],dataMatrix);
                dataMatrix = Matrix.add(dataMatrix, this.biasMatrix[i]);
                dataMatrix.map(sigmoid);
            }
            return dataMatrix.matrixToArray();
        }
    }

    train(input_Array, target_Array){
        if (input_Array.length != this.layerArray[0]){
            console.log('Wrong amount of input, ' + this.layerArray[0] + ' instead of ' + inputArray.length);
        }else if (target_Array.length != this.layerArray[this.layerArray.length-1]){
            console.log('Wrong amount of input, ' + this.layerArray[this.layerArray.length-1] + ' instead of ' + target_Array.length);
        }else{
            //feed-forward            
            let layerResultMatrixArray = [];
            let dataMatrix = Matrix.arrayToMatrix(input_Array);
            layerResultMatrixArray.push(dataMatrix);
            for (let i=0; i<this.weightMatrix.length; i++){
                dataMatrix = Matrix.multiply(this.weightMatrix[i],dataMatrix);
                dataMatrix = Matrix.add(dataMatrix, this.biasMatrix[i]);
                dataMatrix.map(sigmoid);
                layerResultMatrixArray.push(dataMatrix);
            }
            let feedResultMatrix = layerResultMatrixArray[layerResultMatrixArray.length-1];
            //console.log(layerResultMatrixArray);
            
            //BACK-PROPAGATION
            let targetMatrix = Matrix.arrayToMatrix(target_Array);
            let errorMatrix = Matrix.subtract(targetMatrix,feedResultMatrix);
            //gradient
            let outputGradient = Matrix.map(feedResultMatrix,dsigmoid);
            outputGradient.hardamard(errorMatrix);
            outputGradient.scale(this.learningRate);
            //calculate delta
            let transpose = Matrix.transpose(layerResultMatrixArray[layerResultMatrixArray.length-2]);
            let delta = Matrix.multiply(outputGradient, transpose);            
            this.weightMatrix[this.weightMatrix.length-1] = Matrix.add(this.weightMatrix[this.weightMatrix.length-1], delta);
            this.biasMatrix[this.biasMatrix.length-1] = Matrix.add(this.biasMatrix[this.biasMatrix.length-1], outputGradient);
            for(let i=this.layerArray.length-3; i>=0; i--){
                //console.log('i = ' + i);
                let weightTransposed = Matrix.transpose(this.weightMatrix[i+1]);
                errorMatrix = Matrix.multiply(weightTransposed, errorMatrix);
                let gradientMatrix = Matrix.map(layerResultMatrixArray[i+1], dsigmoid);
                gradientMatrix.hardamard(errorMatrix);
                gradientMatrix.scale(this.learningRate);
                let delta = Matrix.multiply(gradientMatrix, Matrix.transpose(layerResultMatrixArray[i]));
                this.weightMatrix[i] = Matrix.add(this.weightMatrix[i], delta);
                this.biasMatrix[i] = Matrix.add(this.biasMatrix[i], gradientMatrix);
            }
            //console.log('Finish training!');
        }
    }
}