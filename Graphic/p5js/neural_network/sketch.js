

function setup(){
    let nn = new NeuralNetwork(2,2,1);
    let input = [1,0];
    let target = [1];
    nn.train(input, target);
    //console.log(output);
}
