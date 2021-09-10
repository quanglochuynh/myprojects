let network;


function setup(){
    createCanvas(640,480);
    background(0);
    rect(300, 100, 200, 40);
    network = ml5.imageClassifier('MobileNet', modelReady());
}

function modelReady(){
    console.log('ready');
}
