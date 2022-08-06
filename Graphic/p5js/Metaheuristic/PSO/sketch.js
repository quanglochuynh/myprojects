const pop_size = 100;
const velMax = 8;
let w = 1;
const c1 = 0.1;
const c2 = 0.1;
const wDamp = 0.9995;
let population = [];
let gBest = undefined;
let it = 0;

function func(x,y){
    return Math.pow(0.1*(x-50),2) - 100*Math.cos(0.02*Math.PI * (x-50)) + Math.pow(0.1*(y-50),2) - 100*Math.cos(0.02*Math.PI*(y-50)) + 200
}
class Particle{
    constructor(vec){
        if (vec!=undefined){
            this.position = vec;
        }else{
            this.position = createVector(random(-width/2, width/2), random(-height/2, height/2));
        }
        this.velocity = createVector(random(-width/2, width/2), random(-height/2, height/2));
        this.velocity.setMag(velMax);
        this.pBest = undefined;
        this.fitness = 0;
    }

    calcFitness(){
        // x = this.position.x;
        // y = this.position.y;
        // this.fitness = Math.pow(0.002*this.position.x,2) - 100*Math.cos(0.02*Math.PI * this.position.x) + Math.pow(0.002*this.position.y,2) - 100*Math.cos(0.02*Math.PI*this.position.y) + 200
        // self.fitness = (self.dvar[0]**2 - 10 * np.cos(2 * np.pi * self.dvar[0])) + (self.dvar[1]**2 - 10 * np.cos(2 * np.pi * self.dvar[1])) + 20
        // this.fitness = (Math.pow(this.position.x,2) - 10 ) + () + 20
        this.fitness = func(this.position.x, this.position.y)
        
    }

    draw(){
        circle(this.position.x, this.position.y, 10)
        let head = p5.Vector.sub(this.position, p5.Vector.mult(this.velocity,8))
        line(this.position.x, this.position.y, head.x, head.y)
    }

    updatePosition(){
        this.position = p5.Vector.add(this.position, this.velocity)
        this.position.x = min(width/2, this.position.x)
        this.position.y = min(height/2, this.position.y)
        this.position.x = max(-width/2, this.position.x)
        this.position.y = max(-height/2, this.position.y)
    }
}

function init(){
    population = []
    gBest = new Particle()
    gBest.calcFitness()
    for (let i=0; i<pop_size; i++){
        population.push(new Particle())
        population[i].calcFitness()
        population[i].pBest = new Particle(createVector(population[i].position));
        if (gBest.fitness > population[i].fitness){
            gBest = population[i]
        }
    }
}

function setup(){
    createCanvas(800,800);
    frameRate(60)
    background(50);
    translate(400, 400)
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
    if (it>500){
        init()
        it = 0;
        console.log(gBest.position);
        console.log(gBest.fitness);
    }
    translate(400, 400)
    background(50);
    circle(50,50,10)
    for (let i=0; i<pop_size; i++){
        population[i].draw();
        // update vel

        v0 = population[i].velocity.mult(w * random(1))
        v1 = p5.Vector.sub(population[i].pBest.position, population[i].position).mult(random(1));
        v2 = p5.Vector.sub(gBest.position, population[i].position).mult(random(1));
        population[i].velocity = p5.Vector.add(v0, v1.mult(c1))
        population[i].velocity = p5.Vector.add(population[i].velocity, v2.mult(c2))

        // population[i].velocity.x = min(population[i].velocity.x, velMax)
        // population[i].velocity.y = min(population[i].velocity.y, velMax)
        // console.log(population[i].velocity.mag());

        if (population[i].velocity.mag()>velMax){
            population[i].velocity.setMag(velMax)
        }

        population[i].updatePosition()
        
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
    stroke(255)
    // noLoop()
}