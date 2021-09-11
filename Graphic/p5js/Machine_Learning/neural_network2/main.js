let nn;

let dataset = [
    {
        inp: [0,1],
        out: [1]
    },
    {
        inp: [1,0],
        out: [1]
    },
    {
        inp: [1,1],
        out: [0]
    },
    {
        inp: [0,0],
        out: [0]
    },
]

function setup(){
    createCanvas(600,600);
    background(0);
    nn = new NeuralNetwork(2,2,1);
    for (let i=0; i<600; i++){
        let data = random(dataset);
        nn.train(data.inp, data.out);
    }


    let inp = [0,1];
    console.table(nn.feedForward(inp));
    inp = [1,0];
    console.table(nn.feedForward(inp));
    inp = [0,0];
    console.table(nn.feedForward(inp));
    inp = [1,1];
    console.table(nn.feedForward(inp));
}