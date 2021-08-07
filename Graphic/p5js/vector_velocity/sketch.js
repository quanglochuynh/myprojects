let plane; 
let s, p, v, a;

function myFx(x){
    return Math.sin(x);
}

function init(){
    plane = new OXY(height, width, 30);
    p = new Vector(0,5);
    v = new Vector(-0.2,0);
    a = new Vector(0,0);
    s = new Particle(p, v, a, 1, 1);
}

function setup(){
    createCanvas(600,600);
    frameRate(60);
    init();
    
    
}

function draw(){
    background(0)
    // s.accelaration = Vector.setLength(s.position,-0.008);
    // s.velocity = Vector.add(s.velocity, s.accelaration);
    // s.position = Vector.add(s.position, s.velocity);
    plane.drawPlane();
    //plane.plot(myFx, 'PINK');
    //plane.derivePlot(myFx,'green');
    plane.drawPoint(new Point(2,5));
    plane.circle(-2, 3, 0.35, 'WHITE');
    plane.drawSegment(new Point(2,5), new Point(-2,3), 'WHITE');
    // plane.circle(0,0,0.5,'PINK');
    // plane.drawParticle(s);
}
