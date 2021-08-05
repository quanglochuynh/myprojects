let plane; 
let s, p, v, a;

function myFx(x){
    return Math.sin(x);
}

function init(){
    plane = new OXY(height, width, 10);
    p = new Vector(0,4);
    v = new Vector(0,1);
    a = new Vector(0,-0.1);
    s = new Particle(p, v, a, 1, 1);
}

function setup(){
    createCanvas(600,600);
    frameRate(20);
    init();
    
    
}

function draw(){
    plane.drawPlane();
    plane.circle(0,0,0.5,'PINK');
    plane.drawVector(s.position, 0.1, 'ORANGE');
    plane.drawVector(s.velocity, 1, 'Green');
    plane.drawVector(s.accelaration, 10, 'RED');
    plane.drawParticle(s);
    s.position = Vector.add(s.position, s.velocity);
    s.velocity = Vector.add(s.velocity, s.accelaration);

    let va = Vector.setLength(s.position,-0.1)
    
    s.accelaration = va;
}
