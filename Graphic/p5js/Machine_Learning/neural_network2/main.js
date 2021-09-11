let nn;

function binhphuong(x){
    return x*x;
}

function setup(){
    createCanvas(600,600);
    background(0);
    nn = new NeuralNetwork(3,3,3);
    let inp = [1,0,0];
    let out = [0,0,1];
    let res = nn.feedForward(inp);
    console.table(res);
    for (let i=0; i<600; i++){
        inp = [1,0,0];
        out = [0,0,1];
        nn.train(inp, out);
        inp = [0,1,0];
        out = [1,0,0];
        nn.train(inp, out);
        inp = [0,0,1];
        out = [0,1,0];
        nn.train(inp, out);
    }
    inp = [0,0,1];
    res = nn.feedForward(inp);
    console.table(res);
}