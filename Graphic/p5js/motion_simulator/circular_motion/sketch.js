let plane; 
let s, p, v, a, m;

function myFx(x){
    return Math.sin(x);
}

function init(){
    plane = new OXY(height, width, 40);
    p = new Vector(1,5);
    v = new Vector(0.2,0);
    a = new Vector(0,0);
    s = new Particle(p, v, a, 'Cyan');
    m = new Vector(1,1);
}

function setup(){
    createCanvas(600,600);
    frameRate(60);
    init();
}

function draw(){
    background(color('rgba(0,0,0,1)'));
    m.x = plane.unMapX(mouseX);
    m.y = plane.unMapY(mouseY);
    let sub = Vector.subtract(s.position, m);
    s.updateAccelaration(Vector.parallel(sub,-0.01));
    plane.drawPlane();
    plane.circle(m.x, m.y,0.5,'WHITE');
    plane.drawParticle(s);
    let c = plane.map(m);
    let par = plane.map(s.position);
    stroke('PINK');
    line(c.x, c.y, par.x, par.y);
    //console.log(plane.unMapX(dist(c.x, c.y, par.x, par.y)));
}
