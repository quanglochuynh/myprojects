int sign(float n){
    if (n<0){
        return -1;
    }
    return 1;
}

class Perceptron {
    float[] weights = new float[2];
    float lr = 0.1;
    Perceptron () {
        for (int i=0; i< weights.length; i++){
            weights[i] = random(-1,1);
        }
    }

    int guess(float[] input){
        float sum = 0;
        for (int i=0; i< weights.length; i++){
            sum += input[i] * weights[i];
        }
        int output = sign(sum);
        return output;
    }
    
    void train(float[] input, int target){
        int guess = guess(input);
        int error = target - guess;

        for (int i=0; i < weights.length; i++){
            weights[i] += error * input[i] * lr;
        }
    }
    
}
