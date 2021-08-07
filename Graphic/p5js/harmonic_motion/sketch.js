let x1 = 0;
let a1 = 0;
let v1 = 10;
let m=0;
let x2 = 141.5;
let v2 = 0;
let a2 = x2 * -0.005;

function drawParticleX(x){
    ellipse(width/2 + x, height/2, 10);
}

function drawParticleY(y){
    ellipse(width/2, height/2+y, 10);
}

function setup(){
    createCanvas(600,600);
    background(50);
    stroke(255);
    frameRate(60);
}

function draw(){
    background(0);
    a1 = -x1*0.005;
    v1 += a1;
    x1 += v1;
    drawParticleX(x1);
    
    let a2 = x2*-0.005;
    v2 += a2;
    x2 += v2;
    drawParticleY(x2);

    ellipse(x1 + width/2, x2 + height/2, 10)
    line(x1 + width/2, height/2, x1 + width/2, height/2 + x2);
    line(width/2, height/2 + x2, width/2 + x1, height/2 + x2);
}