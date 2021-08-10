let plane;
let p, v, a, m;
let s;

function reset(){
    p = new Vector(0,0);
    v = new Vector(4,12);
    v = Vector.scale(v, 0.05);
    a = new Vector(0, -1/150);
    //let rc = 'hsl(' + round(random(0,255)) + ', 100%, 50%)';
    rc = color('cyan');
    s = new Particle(p, v, a, rc);
}

function setup(){
    createCanvas(1600,900);
    background(50);
    plane = new OXY(height, width, 30);
    reset()
    frameRate(10);
}

function draw(){
    background(10);
    plane.drawPlane();
    plane.drawParticle(s);
    let tp = plane.map(s.position);
    textSize(32);
    text('Vector toạ độ = [' + round(s.position.x,2) + ', ' + round(s.position.y, 2) + ']', width - 600, 200);
    let u = new Point(s.position.x,0);
    let v = new Point(0, s.position.y);
    u = plane.map(u);
    v = plane.map(v);
    strokeWeight(2);
    stroke('blue');
    line(u.x, u.y, tp.x, tp.y);
    line(v.x, v.y, tp.x, tp.y);
    s.updateAccelaration(a);
    if (s.position.y < -5){
        reset();
    }
}