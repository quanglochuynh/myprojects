let nn;

function binhphuong(x){
    return x*x;
}

function setup(){
    createCanvas(600,600);
    background(0);
    nn = new NeuralNetwork(3,3,3);
    let inp = [1,0,0];
    let res = nn.feedForward(inp);
    console.log(res);
}