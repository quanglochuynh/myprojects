let nn;
let mlnn;

function setup(){
    noLoop();
    createCanvas(600,600);
    background(0);
    //nn = new NeuralNetwork(3,3,3);
    mlnn = new MultilayerNeuralNetwork([3, 4, 10, 12, 5], 0.1);
    console.log(mlnn.predict([1,0,0]));
}