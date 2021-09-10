function sigmoid(x){
    return 1/(1+Math.exp(x));
}

function dsigmoid(y){
    return y*(1-y);
}

function lrmultiply(x){
    return x*0.1;
}

function db(a){
    console.log(a);
}

class NeuralNetwork{
    constructor(input_nodes, hidden_nodes, output_nodes){
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;

        this.weigth_ih = new Matrix(this.hidden_nodes, this.input_nodes);
        this.weigth_ho = new Matrix(this.output_nodes, this.hidden_nodes);
        this.weigth_ih.randomize();
        this.weigth_ho.randomize();
        this.bias_h = new Matrix(hidden_nodes,1);
        this.bias_o = new Matrix(output_nodes,1);
        this.bias_h.randomize();
        this.bias_o.randomize();
        this.learning_rate = 0.1;
    }

    feedforward(input_array){
        let inputs = Matrix.fromArr(input_array);
        let hidden = Matrix.multiply(this.weigth_ih, inputs);
        hidden.add(this.bias_h);
        hidden.map(sigmoid);

        let output = Matrix.multiply(this.weigth_ho, hidden);
        output.add(this.bias_o);
        output.map(sigmoid);

        return output.toArr();
    }

    train(input_array, target_array){
        //feedforward
        let inputs = Matrix.fromArr(input_array);
        let hidden = Matrix.multiply(this.weigth_ih, inputs);
        hidden.add(this.bias_h);
        hidden.map(sigmoid);

        let output = Matrix.multiply(this.weigth_ho, hidden);
        output.add(this.bias_o);
        output.map(sigmoid);
        //db('output')
        //output.print();

        this.weigth_ih.print();
        this.weigth_ho.print();

        //TRAIN
        let target = Matrix.fromArr(target_array);
        let output_error = Matrix.subtract(target,output);
        //db('output_error')
        //output_error.print();

        let gradient = output.map(dsigmoid);
       // db('gradient');
        //gradient.print();
        gradient = gradient.multiply(output_error);
        gradient = gradient.map(lrmultiply);
        //gradient.print();


        let hidden_T = Matrix.transpose(hidden);
        let weigth_ho_delta = Matrix.multiply(gradient, hidden_T);
        this.weigth_ho.add(weigth_ho_delta);
        this.bias_o.add(gradient);
        
        let weight_ho_transposed = Matrix.transpose(this.weigth_ho);
        let hidden_error = Matrix.multiply(weight_ho_transposed, output_error);
        
        //hidden_error.print();

        let input_gradient = hidden;
        //input_gradient.print();
        hidden_error = Matrix.transpose(hidden_error);
        //hidden_error.print();
        input_gradient = input_gradient.multiply(hidden_error);
        input_gradient = input_gradient.map(lrmultiply);

        let input_T = Matrix.transpose(inputs);
        let weigth_ih_delta = Matrix.multiply(gradient, input_T);
        this.weigth_ih.add(Matrix.transpose(weigth_ih_delta));
        this.bias_h.add(input_gradient);
    }

}