let  plane;
let dot;

function reset(){
    plane = new OXY(height, width, 50);
    dot = new Particle();
    dot.position = new Vector(0,0);
    dot.velocity = new Vector(0.1, 0);
    dot.accelaration = new Vector(0,0);
    dot.color = color(38, 172, 255);
}

function setup(){
    createCanvas(600, 600);
    background(50);
    frameRate(60);
    reset();
}

function draw(){    
    dot.updateAccelaration(new Vector(0,0));
    if (dot.position.x > plane.unMapX(width)){
        dot.position = new Vector(0,0);
        dot.velocity = new Vector(0.1,0);
    }
    plane.drawPlane();
    plane.drawParticle(dot);
    plane.drawVector(dot.velocity,10, 'Magenta');
}