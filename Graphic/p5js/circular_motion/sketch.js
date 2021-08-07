let plane; 
let s, p, v, a, m;

function myFx(x){
    return Math.sin(x);
}

function init(){
    plane = new OXY(height, width, 40);
    p = new Vector(0,5);
    v = new Vector(0,0);
    a = new Vector(0,0);
    s = new Particle(p, v, a, 1, 1);
    m = new Vector();
}

function setup(){
    createCanvas(600,600);
    init();
}

function draw(){
    background(0);
    m.x = plane.unMapX(mouseX);
    m.y = plane.unMapY(mouseY);
    let sub = Vector.subtract(s.position, m);
    s.accelaration = Vector.parallel(sub,-0.008);
    s.velocity = Vector.add(s.velocity, s.accelaration);
    s.position = Vector.add(s.position, s.velocity);
    plane.drawPlane();
    plane.circle(m.x, m.y,0.5,'WHITE');
    plane.circle(0,0,0.5,'PINK');
    plane.drawParticle(s);
}
