const pop_size = 50;
const velMax = 40;
let w = 1;
const c1 = 2;
const c2 = 2;
const wDamp = 0.998;
let population = [];
let gBest = undefined;
let it = 0;
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
        this.fitness = this.position.mag()
    }

    draw(){
        circle(this.position.x, this.position.y, 10)
        let head = p5.Vector.sub(this.position, this.velocity)
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
    background(50);
    frameRate(25)
    fill(255)
    strokeWeight(4)
    stroke(255)
    init();
}

function draw(){
    it++;
    if (it>100){
        // init()
        // it = 0;
        noLoop()
    }
    translate(400, 400)
    background(50);
    circle(0,0,10)
    for (let i=0; i<pop_size; i++){
        population[i].draw();
        // update vel

        v0 = population[i].velocity.mult(w).mult(random(1));
        v1 = p5.Vector.sub(population[i].pBest.position, population[i].position).mult(random(1));
        v2 = p5.Vector.sub(gBest.position, population[i].position).mult(random(1));
        population[i].velocity = p5.Vector.add(v0, v1.mult(c1))
        population[i].velocity = p5.Vector.add(population[i].velocity, v2.mult(c2))

        population[i].velocity.x = min(population[i].velocity.x, velMax)
        population[i].velocity.y = min(population[i].velocity.y, velMax)
        

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
    // console.log(w);
    console.log(gBest.velocity.mag())
}