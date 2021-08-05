let plane; 
let s, p, v, a;

function myFx(x){
    return Math.sin(x);
}

function init(){
    plane = new OXY(height, width, 5);
    p = new Vector(0,4);
    v = new Vector(0,2);
    a = new Vector(0,0);
    s = new Particle(p, v, a);
}

function setup(){
    createCanvas(600,600);
    frameRate(3);
    init();
    
    
}

function draw(){
    // plane.drawPlane();
    // plane.circle(0,0,0.5,'PINK');
    // plane.drawVector(s.position, 0.1, 'ORANGE');
    // plane.drawVector(s.velocity, 1, 'Green');
    // plane.drawVector(s.accelaration, 10, 'RED');
    // plane.drawParticle(s);
    // s.position = Vector.add(s.position, s.velocity);
    // s.velocity = Vector.add(s.velocity, s.accelaration);
    // // let cof = s.position.len();
    // // console.log(cof);
    // // let newA = Vector.scale(s.position, -cof/3000);
    
    // let newA = new Vector(0.001,0);
    // let ang = OXY.getAngle(s.position);
    // console.log(ang*180/PI);
    // ang = ang + PI;
    // console.log(ang*180/PI);
    // newA = Vector.rotate(ang);
    // console.log(newA);
    // s.accelaration = newA;
}
