const pop_size = 100;
const velMax = 6;
const fps = 20;
const duration = 0.4; //second(s)
const period = duration*2
const total_frame = fps*duration;
let v = 0;
let x = 50;
let t = 0;
let a = 2;
let max_iter = 200;
let da = a/max_iter;
let population = [];
let it = 0;
let alphaID = 0;
let betaID  = 0;
let gammaID = 0;
let px = 0;
let py = 0;
let stage = 0;
let new_pop = undefined;

function a_Copy(a){
    new_array = [...a];
    return new_array;
}

function func(x,y){
    return Math.pow(0.07*(x-px),2) - 100*Math.cos(0.02*Math.PI * (x-px)) + Math.pow(0.07*(y-py),2) - 100*Math.cos(0.02*Math.PI*(y-py)) + 200
}

function randRotate(x){
    let l = magnitude(x);
    let a = 0;
    if (x._data[0] < 0){
        a = atan(x._data[1]/x._data[0]) + Math.PI;
    }else{
        a = atan(x._data[1]/x._data[0]);
    }
    a = a + random(-Math.PI, Math.PI);
    return math.matrix([l*cos(a), l*sin(a)]);
}

function magnitude(x){
    return Math.sqrt(Math.pow(x._data[0],2) + Math.pow(x._data[1],2));
}

class Wolf{
    constructor(vec){
        if (vec!=undefined){
            this.position = vec;
        }else{
            this.position = new Vector(random(-width/2, width/2), random(-height/2, height/2));
            this.position = math.matrix([random(-width/2, width/2), random(-height/2, height/2)])
        }
        this.velocity = undefined;
        this.fitness = 0;
    }

    calcFitness(){
        this.fitness = func(this.position._data[0], this.position._data[1])
    }

    draw(){
        circle(this.position._data[0], this.position._data[1], 10)
        if (this.velocity!=undefined){
            let head = math.subtract(this.position, this.velocity)
            line(this.position._data[0], this.position._data[1], head._data[0], head._data[1])
        }

    }

    updatePosition(velo){
        this.position = math.add(this.position, velo)
        this.position._data[0] = min(width/2, this.position._data[0])
        this.position._data[1] = min(height/2, this.position._data[1])
        this.position._data[0] = max(-width/2, this.position._data[0])
        this.position._data[1] = max(-height/2, this.position._data[1])
    }
}

function init(){
    t=0;
    a=2;
    it=0;
    population = []
    // // population[alphaID] = new Wolf()
    // // population[betaID]  = new Wolf()
    // // population[gammaID] = new Wolf()
    // noStroke();
    // fill(255,0,127)
    // population[alphaID].draw()
    // fill(0,127,255)
    // population[betaID].draw()
    // fill('orange');
    // population[gammaID].draw()
    // fill(255)
    // stroke(255)
    // population[alphaID].calcFitness()
    // population[betaID].calcFitness()
    // population[gammaID].calcFitness()
    let alphaID = 0;
    let betaID  = 0;
    let gammaID = 0;
    for (let i=0; i<pop_size; i++){
        population.push(new Wolf())
        population[i].calcFitness()
        if (population[i].fitness<population[alphaID].fitness){
            alphaID = i;
        }else if (population[i].fitness<population[betaID].fitness){
            betaID = i;
        }else if (population[i].fitness<population[gammaID].fitness){
            gammaID = i;
        }
    }
    new_pop = gwoIterate();
}

function gwoIterate(){
    if (it>max_iter){
        it = 0;
        console.log(population[alphaID].position);
        noLoop();
    }
    // let newAlpha = population[alphaID]
    // let newBeta = population[betaID]
    // let newGamma = population[gammaID]
    let new_pop = a_Copy(population);
    for (let i=0; i<pop_size; i++){
        let A1 = a * random(-1,1);
        let A2 = a * random(-1,1);
        let A3 = a * random(-1,1);
        let C1 = random(2);
        let C2 = random(2);
        let C3 = random(2);
        let X1 = math.subtract(population[alphaID].position, math.multiply(math.abs(math.subtract(math.multiply(population[alphaID].position,C1), population[i].position)),A1))
        let X2 = math.subtract(population[betaID].position, math.multiply(math.abs(math.subtract(math.multiply(population[betaID].position,C2), population[i].position)),A2))
        let X3 = math.subtract(population[gammaID].position, math.multiply(math.abs(math.subtract(math.multiply(population[gammaID].position,C3), population[i].position)),A3))
        let X = math.divide(math.add(X1, X2, X3),3);
        new_pop[i].velocity = math.subtract(X, population[i].position);
        new_pop[i].position = math.add(X, randRotate(math.multiply(new_pop[i].velocity,random(0.25))));
        new_pop[i].calcFitness();
        if (population[i].fitness<population[alphaID].fitness){
            alphaID = i;
        }else if (population[i].fitness<population[betaID].fitness){
            betaID = i;
        }else if (population[i].fitness<population[gammaID].fitness){
            gammaID = i;
        }
    }
    // population[alphaID] = new_pop[alphaID];
    // population[betaID] = new_pop[betaID];
    // population[gammaID] = new_pop[gammaID];
    a = a-da;
    it++;
    return new_pop
}

function setup(){
    createCanvas(800,800);
    frameRate(fps)
    background(50);
    translate(400, 400)
    fill(255)
    strokeWeight(4)
    stroke(255)
    init();
    noLoop();
}

function draw(){
    fill(255);
    stroke('rgba(255,255,255,0.1)');
    background(50);
    translate(400, 400);
    circle(px,py,20);
    for (let i=0; i<pop_size; i++){
        population[i].draw();
    }
    noStroke();
    fill(255,0,127);
    population[alphaID].draw();
    fill(0,127,255);
    population[betaID].draw();
    fill('orange');
    population[gammaID].draw();
    new_pop = gwoIterate();
    textSize(16);
    text('Iteration ' + it, -380,380);
    text('alpha.x = ' + Math.round(population[alphaID].position._data[0]*100000)/100000, -250, 380);
    text('alpha.y = ' + Math.round(population[alphaID].position._data[1]*100000)/100000, -80, 380);
    text('Expected x = ' + px, -250, 360);
    text('Expected y = ' + py, -80, 360);
}

function mousePressed(){
    px = mouseX-width/2;
    py = mouseY-height/2;
    noLoop();
    init();
    loop();
    
    console.log(px + " " + py)

}