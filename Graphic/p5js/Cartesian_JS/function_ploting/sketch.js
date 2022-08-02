let plane;

function sigmoid(x){
    return 1/(1+Math.exp(-x));
}

// function poly(x):


function setup(){
    createCanvas(1600,900);
    background(50);
    plane = new OXY(height, width, 30);
    frameRate(60);
}

function draw(){
    background(10);
    plane.drawPlane();
    plane.plot(Math.sin, 'orange');
    plane.derivePlot(Math.sin, 'blue');
}