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
    createCanvas(100,100);
    background(0);
    nn = new NeuralNetwork(2,2,1);
    for (let i=0; i<50000; i++){
        let data = random(dataset);
        nn.train(data.inp, data.out);
        //console.log(data);
    }
    console.table(nn.feedForward([0,1]));
    console.table(nn.feedForward([1,0]));
    console.table(nn.feedForward([0,0]));
    console.table(nn.feedForward([1,1]));
}