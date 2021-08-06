let x = 0;
let a = 0;
let v = 10;

function drawParticle(x){
    ellipse(width/2 + x, height/2, 10);
}

function setup(){
    createCanvas(600,600);
    background(50);
}

function draw(){
    background(0);
    a = -x*0.01;
    v += a;
    x += v;
    
    
    console.log(v);
    drawParticle(x);
}