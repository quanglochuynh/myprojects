let nn;
let mlnn;

let dataset = [
    {
        inputs:[1,0],
        target:[1]
    },
    {
        inputs:[0,1],
        target:[1]
    },
    {
        inputs:[0,0],
        target:[0]
    },
    {
        inputs:[1,1],
        target:[0]
    }
];

function setup(){
    noLoop();
    //createCanvas(600,600);
    //background(0);
    mlnn = new MultilayerNeuralNetwork([2, 2, 4, 1], 0.1);
    for (let i=0; i<40000; i++){
        let data = random(dataset);
        mlnn.train(data.inputs, data.target);
    }
    console.log(mlnn.predict(dataset[0].inputs));
    console.log(mlnn.predict(dataset[1].inputs));
    console.log(mlnn.predict(dataset[2].inputs));
    console.log(mlnn.predict(dataset[3].inputs));
}