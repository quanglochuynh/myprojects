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
    s = new Particle(p, v, a, 'Cyan');
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
    s.updateAccelaration(Vector.parallel(sub,-0.008));
    plane.drawPlane();
    plane.circle(m.x, m.y,0.5,'WHITE');
    plane.drawParticle(s);
}
