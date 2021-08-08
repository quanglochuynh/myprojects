let plane;
let p, v, a, m;
let s;

function reset(){
    p = new Vector(0,0);
    v = new Vector(plane.unMapX(mouseX), plane.unMapY(mouseY));
    v = Vector.scale(v, 0.1);
    a = new Vector(0, -0.098);
    s = new Particle(p, v, a, 'RED');
}

function setup(){
    createCanvas(600,600);
    background(50);
    plane = new OXY(height, width, 15);
    reset()
    frameRate(30);
}

function draw(){
    plane.drawPlane();
    plane.drawParticle(s);
    s.update();
    if (s.position.y < plane.unMapY(height)){
        reset();
    }
}