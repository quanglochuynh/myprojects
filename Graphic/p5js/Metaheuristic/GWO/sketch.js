const pop_size = 40;
const velMax = 4;
let a = 2;
let max_iter = 100;
let da = a/max_iter;
let population = [];
let it = 0;
let alpha = undefined;
let beta  = undefined;
let gamma = undefined;
class Vector extends p5.Vector{
    constructor(x,y){
        super(x,y)
    }

    abs(){
        this.x = Math.abs(this.x)
        this.y = Math.abs(this.y)   
    }
}
class Wolf{
    constructor(vec){
        if (vec!=undefined){
            this.position = vec;
        }else{
            this.position = new Vector(random(-width/2, width/2), random(-height/2, height/2));
        }
        this.fitness = 0;
    }

    calcFitness(){
        this.fitness = Math.pow(0.002*this.position.x,2) - 100*Math.cos(0.02*Math.PI * this.position.x) + Math.pow(0.002*this.position.y,2) - 100*Math.cos(0.02*Math.PI*this.position.y) + 200
    }

    draw(){
        circle(this.position.x, this.position.y, 10)
        // let head = p5.Vector.sub(this.position, p5.Vector.mult(this.velocity,8))
        // line(this.position.x, this.position.y, head.x, head.y)
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
    a=2
    population = []
    alpha = new Wolf()
    beta  = new Wolf()
    gamma = new Wolf()
    alpha.calcFitness()
    beta.calcFitness()
    gamma.calcFitness()
    for (let i=0; i<pop_size; i++){
        population.push(new Wolf())
        population[i].calcFitness()
        if (population[i].fitness<alpha.fitness){
            alpha, population[i] = population[i], alpha
        }else if (population[i].fitness<beta.fitness){
            beta, population[i] = population[i], beta
        }else if (population[i].fitness<gamma.fitness){
            gamma, population[i] = population[i], gamma
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
    // for (let i=0; i<pop_size; i++){
    //     population[i].draw();
    // }
    // noLoop()
}

function draw(){
    it++;
    if (it==max_iter){
        init()
        it = 0;
        console.log(alpha.fitness);
    }
    translate(400, 400);
    background(50);
    circle(0,0,10);
    let new_alpha = alpha;
    let new_beta = beta;
    let new_gamma = gamma;
    for (let i=0; i<pop_size; i++){
        let A1 = random(-1,1);
        let A2 = random(-1,1);
        let A3 = random(-1,1);
        let C1 = random(2);
        let C2 = random(2);
        let C3 = random(2);
        let sa = alpha.position.mult(C1)
        let sb = beta.position.mult(C2)
        let sc = gamma.position.mult(C3)
        let dA = Vector.sub(sa, population[i].position);
        let dB = Vector.sub(sb, population[i].position);
        let dC = Vector.sub(sc, population[i].position);
        dA.abs()
        dB.abs()
        dC.abs()

        let X1 = Vector.sub(alpha.position, Vector.sub(alpha.position.scale(C1),population[i].position).abs().scale(A1))
        let X2 = Vector.sub(beta.position, Vector.sub(beta.position.scale(C2),population[i].position).abs().scale(A2))
        let X3 = Vector.sub(gamma.position, Vector.sub(gamma.position.scale(C3),population[i].position).abs().scale(A3))
        population[i].position = Vector.add(X1, Vector.add(X2, X3)).scale(1/3);
        population[i].calcFitness();
        if (population[i].fitness < new_alpha.fitness){
            new_alpha, population[i] = population[i], new_alpha
        }else if (population[i].fitness < new_beta.fitness){
            new_beta, population[i] = population[i], new_beta
        }else if (population[i].fitness < new_gamma.fitness){
            new_gamma, population[i] = population[i], new_gamma
        }
        population[i].draw();   
    }
    alpha = new_alpha;
    beta = new_beta;
    gamma = new_gamma;
    a = a-da;
    it+=1;
    noLoop()
}