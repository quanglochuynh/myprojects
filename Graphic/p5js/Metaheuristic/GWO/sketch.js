const pop_size = 100;
const velMax = 6;
const fps = 60;
const duration = 0.4; //second(s)
const period = duration*2
const total_frame = fps*duration;
let v = 0;
let x = 50;
let t = 0;
let a = 2;
let max_iter = 400;
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

function calc_x(t){
    return -(Math.cos(Math.PI*t/total_frame) + 1)/2
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
    // plane = new OXY(height, width, 1);
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
        let X = math.divide(math.add(X1, X2, X3),3)
        new_pop[i].velocity = math.subtract(X, population[i].position)
        // new_pop[i].updatePosition(new_pop[i].velocity)
        new_pop[i].position = X;
        new_pop[i].calcFitness();
        if (new_pop[i].fitness < new_alpha.fitness){
            [new_alpha, new_pop[i]] = [new_pop[i], new_alpha]
            // new_alpha = population[i];
        }else if (new_pop[i].fitness < new_beta.fitness){
            [new_beta, new_pop[i]] = [new_pop[i], new_beta]
            // new_beta = population[i];
        }else if (new_pop[i].fitness < new_gamma.fitness){
            [new_gamma, new_pop[i]] = [new_pop[i], new_gamma]
            // new_gamma = population[i];
        }
        // new_pop[i].draw(); 
    }
    alpha = new_alpha;
    beta = new_beta;
    gamma = new_gamma;
    a = a-da;
    it+=1;
    if (it>max_iter){
        // init()
        it = 0;
        console.log(alpha.position);
        noLoop();
    }
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
        if (new_population[i].velocity!=undefined){
            let v = calc_x(t);
            let point = math.add(population[i].position, math.multiply(new_population[i].velocity, v));
            circle(point._data[0], point._data[1], 10);
            let head = math.subtract(population[i].position, population[i].velocity)
            line(population[i].position._data[0], population[i].position._data[1], head._data[0], head._data[1])
        }
    }
    noStroke();
    fill(255,0,127);
    alpha.draw();
    fill(0,127,255);
    beta.draw();
    fill('orange');
    gamma.draw();
    t++;
    if (t>total_frame){
        console.log("Iteration " + it + ": " + alpha.fitness);
        new_population = gwoIterate();
        t = 0;
    }
}

function mousePressed(){
    // console.log("test");
    px = mouseX-width/2;
    py = mouseY-height/2;
    noLoop();
    init();
    loop();
    
    console.log(px + " " + py)

}