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
    plane.offsetX = width/2;
    plane.offsetY = height/2;
}

function setup(){
    createCanvas(800,800);
    background(50);
    plane = new OXY(height, width, 50);
    reset()
    frameRate(10);
}

function draw(){
    background(10);

    s.updateAccelaration(a);
    if (s.position.y < -5){
        reset();
    }

    plane.drawDynamicPlane(s);
    plane.drawParticle(s);
    text('v = [' + s.velocity.x + ', ' + round(s.velocity.y,2) + ']', width/2 + 32, height/2+32);
}