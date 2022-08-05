const pop_size = 40;
const velMax = 4;
let a = 2;
let max_iter = 400;
let da = a/max_iter;
let population = [];
let it = 0;
let alpha = undefined;
let beta  = undefined;
let gamma = undefined;

let lut = [-180, -160, -140, -120, -100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100, 120, 140, 160, 180]

function func(x,y){
    return Math.pow(0.002*(x-50),2) - 100*Math.cos(0.02*Math.PI * (x-50)) + Math.pow(0.002*(y-50),2) - 100*Math.cos(0.02*Math.PI*(y-50)) + 200
}

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
        this.velocity = undefined;
        this.fitness = 0;
    }

    calcFitness(){
        this.fitness = func(this.position.x, this.position.y)
    }

    draw(){
        circle(this.position.x, this.position.y, 10)
        if (this.velocity!=undefined){
            let head = p5.Vector.sub(this.position, p5.Vector.mult(this.velocity,8))
            line(this.position.x, this.position.y, head.x, head.y)
        }

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
    alpha = new Wolf(new Vector(random(lut), -390))
    beta  = new Wolf(new Vector(random(lut), -390))
    gamma = new Wolf(new Vector(random(lut), -390))
    noStroke();
    fill(255,0,127)
    alpha.draw()
    fill(0,127,255)
    beta.draw()
    fill('orange');
    gamma.draw()
    fill(255)
    stroke(255)
    alpha.calcFitness()
    beta.calcFitness()
    gamma.calcFitness()

    for (let i=0; i<pop_size; i++){
        population.push(new Wolf(new Vector(random(lut), -390)))
        population[i].calcFitness()
        if (population[i].fitness<alpha.fitness){
            [alpha, population[i]] = [population[i], alpha]
        }else if (population[i].fitness<beta.fitness){
            [beta, population[i]] = [population[i], beta]
        }else if (population[i].fitness<gamma.fitness){
            [gamma, population[i]] = [population[i], gamma]
        }
    }
    console.log(alpha.position);
    console.log(beta.position);
    console.log(gamma.position);
}

function setup(){
    createCanvas(800,800);
    frameRate(20)
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
    if (it>max_iter){
        // init()
        it = 0;
        console.log(alpha.position);
        noLoop();
    }
    translate(400, 400);
    background(color('rgba(0,0,0,0.0005)'));
    circle(0,0,10);
    // let new_alpha = new Wolf();
    // let new_beta = new Wolf();
    // let new_gamma = new Wolf();
    let new_alpha = alpha
    let new_beta = beta
    let new_gamma = gamma
    for (let i=0; i<pop_size; i++){
        population[i].draw();   
        let A1 = a * random(-1,1);
        let A2 = a * random(-1,1);
        let A3 = a * random(-1,1);
        let C1 = random(2);
        let C2 = random(2);
        let C3 = random(2);
        let sa = alpha.position.mult(C1)
        let sb = beta.position.mult(C2)
        let sc = gamma.position.mult(C3)
        let dA = Vector.sub(sa, population[i].position);
        let dB = Vector.sub(sb, population[i].position);
        let dC = Vector.sub(sc, population[i].position);
        dA.x, dA.y = Math.abs(dA.x), Math.abs(dA.y);;
        dB.x, dB.y = Math.abs(dB.x), Math.abs(dB.y);;
        dC.x, dC.y = Math.abs(dC.x), Math.abs(dC.y);;
        dA.mult(A1)
        dB.mult(A2)
        dC.mult(A3)

        let X1 = Vector.sub(alpha.position, dA)
        let X2 = Vector.sub(beta.position, dB)
        let X3 = Vector.sub(gamma.position, dC)
        let X = Vector.add(X1, Vector.add(X2, X3)).mult(1/3);
        let d = Vector.sub(X, population[i].position)
        if (d.mag()>velMax){
            d.setMag(velMax)
        }
        population[i].velocity = d;
        population[i].position.add(d)
        population[i].calcFitness();
        if (population[i].fitness < new_alpha.fitness){
            // [new_alpha, population[i]] = [population[i], new_alpha]
            new_alpha = population[i];
        }else if (population[i].fitness < new_beta.fitness){
            // [new_beta, population[i]] = [population[i], new_beta]
            new_beta = population[i];
        }else if (population[i].fitness < new_gamma.fitness){
            // [new_gamma, population[i]] = [population[i], new_gamma]
            new_gamma = population[i];
        }
        
    }
    alpha = new_alpha;
    beta = new_beta;
    gamma = new_gamma;
    noStroke();
    fill(255,0,127)
    alpha.draw()
    fill(0,127,255)
    beta.draw()
    fill('orange');
    gamma.draw()
    fill(255)
    stroke(255)
    console.log(alpha.position);
    console.log(beta.position);
    console.log(gamma.position);
    a = a-da;
    it+=1;
    // console.log(it);
    // noLoop()
}