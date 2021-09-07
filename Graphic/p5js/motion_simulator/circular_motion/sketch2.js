let plane;
let par;
//let posArray = [];

function init(){
    plane = new OXY(height, width, 50);
    let p = new Vector(0, 4);
    let v = new Vector(0.2, 0);
    let a = new Vector(0, -0.01);
    par = new Particle(p, v, a, 'cyan');

}

function setup(){
    createCanvas(800, 800);
    frameRate(60);
    background(0);
    init();
}

function draw(){
    background(color('rgba(0,0,0,0.05)'));
    par.updateAccelaration(Vector.parallel(par.position,  -0.01));
    plane.drawPlane();
    plane.drawParticle(par);
}