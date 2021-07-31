function sigmoid(x){
    return 1/(1+Math.exp(x));
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

}