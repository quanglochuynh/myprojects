let  plane;
let dot;

function reset(){
    plane = new OXY(height, width, 15);
    dot = new Particle();
    dot.position = new Vector(0,0);
    dot.velocity = new Vector(0.1, 0);
    dot.accelaration = new Vector(0,0);
    dot.color = color(38, 172, 255);
}

function setup(){
    createCanvas(600,600);
    background(50);
    reset();
}

function draw(){
    dot.updateAccelaration(dot.accelaration);
    plane.drawPlane();
    plane.drawParticle(dot);
}