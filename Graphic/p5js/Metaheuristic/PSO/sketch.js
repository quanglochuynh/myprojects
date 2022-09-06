const fps = 20;
const max_it = 300;
const pop_size = 50;
const velMax = 120;
let w = 1;
const c1 = 2;
const c2 = 2;
const wDamp = 0.9999;
let population = [];
let gBest = undefined;
let it = 0;
let px = 0;
let py = 0;

function func(x,y){
    return Math.pow(0.07*(x-px),2) - 100*Math.cos(0.02*Math.PI * (x-px)) + Math.pow(0.07*(y-py),2) - 100*Math.cos(0.02*Math.PI*(y-py)) + 200
}

function setMg(x, l){
    let a = 0;
    if (x._data[0] < 0){
        a = atan(x._data[1]/x._data[0]) + Math.PI;
    }else{
        a = atan(x._data[1]/x._data[0]);
    }
    return math.matrix([l*cos(a), l*sin(a)]);
}

function magnitude(x){
    return Math.sqrt(Math.pow(x._data[0],2) + Math.pow(x._data[1],2));
}
class Particle{
    constructor(vec){
        if (vec!=undefined){
            this.position = vec;
        }else{
            this.position = math.matrix([random(-width/2, width/2), random(-height/2, height/2)]);
        }
        this.velocity = math.matrix([random(-width/2, width/2), random(-height/2, height/2)]);
        this.velocity = setMg(this.velocity, velMax);
        this.pBest = undefined;
        this.fitness = 0;
    }

    calcFitness(){
        this.fitness = func(this.position._data[0], this.position._data[1])
    }

    draw(){
        circle(this.position._data[0], this.position._data[1], 10)
        // let head = math.subtract(this.position, math.multiply(this.velocity,16))
        // line(this.position._data[0], this.position._data[1], head.x, head.y)
    }

    updatePosition(){
        this.position = math.add(this.position, this.velocity)
        this.position._data[0] = min(width/2, this.position._data[0])
        this.position._data[1] = min(height/2, this.position._data[1])
        this.position._data[0] = max(-width/2, this.position._data[0])
        this.position._data[1] = max(-height/2, this.position._data[1])
    }
}

function init(){
    it = 0;
    population = []
    gBest = new Particle()
    gBest.calcFitness()
    for (let i=0; i<pop_size; i++){
        population.push(new Particle())
        population[i].calcFitness()
        population[i].pBest = population[i];
        if (gBest.fitness > population[i].fitness){
            gBest = population[i]
        }
    }
}

function setup(){
    createCanvas(800,800);
    frameRate(fps);
    background(50);
    translate(400, 400);
    fill(255)
    strokeWeight(4)
    stroke(255)
    init();
    for (let i=0; i<pop_size; i++){
        population[i].draw();
    }

    // noLoop()
}

function draw(){
    it++;
    if (it>max_it){
        noLoop();
    }
    translate(400, 400)
    background(50);
    circle(px,py,10)
    for (let i=0; i<pop_size; i++){
        population[i].draw();
        // update vel

        v0 = math.multiply(population[i].velocity, w * random(1));
        v1 = math.multiply(math.subtract(population[i].pBest.position, population[i].position),random(1));
        v2 = math.multiply(math.subtract(gBest.position, population[i].position),random(1));
        population[i].velocity = math.add(v0, math.multiply(v1,c1), math.multiply(v2,c2))


        // if (magnitude(population[i].velocity)>velMax){
        //     population[i].velocity = setMg(population[i].velocity, velMax)
        // }
        population[i].position = math.add(population[i].position, population[i].velocity);
        
        population[i].calcFitness()

        if (population[i].fitness < population[i].pBest.fitness){
            population[i].pBest = population[i]
        }

        if (population[i].fitness < gBest.fitness){
            gBest = population[i]
        }
    }
    w = w * wDamp;
    fill('red')
    stroke('red')
    gBest.draw()
    fill(255)
    noStroke();
    textSize(16);
    text('Iteration ' + it, -380,380);
    text('Alpha.x = ' + Math.round(gBest.position._data[0]*100000)/100000, -250, 380);
    text('Alpha.y = ' + Math.round(gBest.position._data[1]*100000)/100000, -80, 380);
    text('Expected x = ' + px, -250, 360);
    text('Expected y = ' + py, -80, 360);
    stroke(255)
}

function mousePressed(){
    px = mouseX-width/2;
    py = mouseY-height/2;
    noLoop();
    init();
    loop();
    
    console.log(px + " " + py)

}