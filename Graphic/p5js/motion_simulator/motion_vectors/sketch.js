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
    createCanvas(1600, 900);
    frameRate(25);
    reset();
}

function draw(){
    background(10);
    dot.updateAccelaration(new Vector(0,0));
    if (dot.position.x > 100){
        dot.position = new Vector(0,0);
        dot.velocity = new Vector(0.1,0);
        plane.offsetX = width/2;
    }
    plane.drawDynamicPlane(dot);
    plane.drawParticle(dot);
    text(round(dot.position.x, 3), width/2, height/2+50);

}