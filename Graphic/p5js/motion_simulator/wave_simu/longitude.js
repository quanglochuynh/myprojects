let plane;
let particle = [];

function init(){
    plane = new OXY(height, width, 50);
    for (let i=0; i<=200; i+=2*plane.spacingX){
        let p = new Particle(new Vector(plane.unMapX(i), 0), new Vector(0,0), new Vector(0,0), 'ORANGE');
        particle.push(p);
    }
    particle[0].velocity.y = 0.1
}

function setup(){
    createCanvas(600, 600);
    background(0);
    init();
}

function draw(){
    background(0);

    particle[0].updateAccelaration(new Vector(0, -(particle[0].position.y)*0.005));

    for (let i=1; i<particle.length; i++){
        particle[i].updateAccelaration(new Vector (0, 0.01*(particle[i-1].position.y - particle[i].position.y)));
    }

    plane.drawPlane();
    for(i in particle){
        plane.drawParticle(particle[i]);
    }
}