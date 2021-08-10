let plane;
let p, v, a, m;
let s;

function reset(){
    p = new Vector(0,0);
    v = new Vector(plane.unMapX(mouseX), plane.unMapY(mouseY));
    v = Vector.scale(v, 0.05);
    a = new Vector(0, -1 / frameRate());
    let rc = 'hsl(' + round(random(0,255)) + ', 100%, 50%)';
    console.log(rc);
    s = new Particle(p, v, a, rc);
}

function setup(){
    createCanvas(1600,900);
    background(50);
    plane = new OXY(height, width, 30);
    reset()
    frameRate(60);
}

function draw(){
    background(10);
    plane.drawPlane();
    plane.drawParticle(s);
    s.updateAccelaration(a);
    if (s.position.y < plane.unMapY(height)){
        reset();
    }
}