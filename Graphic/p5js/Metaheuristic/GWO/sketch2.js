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
let alpha = undefined;
let beta  = undefined;
let gamma = undefined;
let px = 0;
let py = 0;
let stage = 0;
let new_population = undefined;

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
    alpha = new Wolf()
    beta  = new Wolf()
    gamma = new Wolf()
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
        population.push(new Wolf())

        population[i].calcFitness()
        if (population[i].fitness<alpha.fitness){
            [alpha, population[i]] = [population[i], alpha]
        }else if (population[i].fitness<beta.fitness){
            [beta, population[i]] = [population[i], beta]
        }else if (population[i].fitness<gamma.fitness){
            [gamma, population[i]] = [population[i], gamma]
        }
    }
    new_population = gwoIterate();
}

function gwoIterate(){
    if (it>max_iter){
        it = 0;
        console.log(alpha.position);
        noLoop();
    }
    let new_alpha = alpha
    let new_beta = beta
    let new_gamma = gamma
    let new_pop = a_Copy(population);
    for (let i=0; i<pop_size; i++){
        let A1 = a * random(-1,1);
        let A2 = a * random(-1,1);
        let A3 = a * random(-1,1);
        let C1 = random(2);
        let C2 = random(2);
        let C3 = random(2);
        let X1 = math.subtract(alpha.position, math.multiply(math.abs(math.subtract(math.multiply(alpha.position,C1), population[i].position)),A1))
        let X2 = math.subtract(beta.position, math.multiply(math.abs(math.subtract(math.multiply(beta.position,C2), population[i].position)),A2))
        let X3 = math.subtract(gamma.position, math.multiply(math.abs(math.subtract(math.multiply(gamma.position,C3), population[i].position)),A3))
        let X = math.divide(math.add(X1, X2, X3),3);
        new_pop[i].velocity = math.subtract(X, population[i].position);
        new_pop[i].position = math.add(X, randRotate(math.multiply(new_pop[i].velocity,0.15)));
        new_pop[i].calcFitness();
        if (new_pop[i].fitness < new_alpha.fitness){
            [new_alpha, new_pop[i]] = [new_pop[i], new_alpha]
        }else if (new_pop[i].fitness < new_beta.fitness){
            [new_beta, new_pop[i]] = [new_pop[i], new_beta]
        }else if (new_pop[i].fitness < new_gamma.fitness){
            [new_gamma, new_pop[i]] = [new_pop[i], new_gamma]
        }
    }
    alpha = new_alpha;
    beta = new_beta;
    gamma = new_gamma;
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
    alpha.draw();
    fill(0,127,255);
    beta.draw();
    fill('orange');
    gamma.draw();
    new_population = gwoIterate();
    textSize(16);
    text('Iteration ' + it, -380,380);
    text('Alpha.x = ' + Math.round(alpha.position._data[0]*100000)/100000, -250, 380);
    text('Alpha.y = ' + Math.round(alpha.position._data[1]*100000)/100000, -80, 380);

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