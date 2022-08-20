const pop_size = 100;
const fps = 20;
const duration = 0.4; //second(s)
const period = duration*2
const total_frame = fps*duration;
const hei = 800;
const wid = 800;
const ub = math.matrix([hei/2, wid/2])
const lb = math.matrix([-hei/2, -wid/2])
const beta = 1.5;
const sigma = 0.6965745025576967;
let max_iter = 200;
let population = [];
let it = 0;
let px = 0;
let py = 0;
let stage = 0;
let new_pop = undefined;
let rabitPosition = undefined;
let rabitEnergy = Infinity;
let bestFit = Infinity;

// function randn(){
// 	let x = random(-3,3);
// 	var T = 1/(1+.2316419*Math.abs(x));
// 	var D = 0.3989423*Math.exp(-x*x/2);
// 	var Prob=D*T*(.3193815+T*(-.3565638+T*(1.781478+T*(-1.821256+T*1.330274))));
// 	if (x>0) {
// 		Prob=1-Prob
// 	}
// 	return Prob
// }

function a_Copy(a){
    new_array = [...a];
    return new_array;
}

function func(x,y){
    return Math.pow(0.07*(x-px),2) - 100*Math.cos(0.02*Math.PI * (x-px)) + Math.pow(0.07*(y-py),2) - 100*Math.cos(0.02*Math.PI*(y-py)) + 200
}

function clip(a){
	let x = a._data[0];
	let y = a._data[1];
	x = min(x, ub._data[0]);
	x = max(x, lb._data[0]);
	y = min(y, ub._data[1]);
	y = max(y, lb._data[1]);
	return math.matrix([x,y]);
}

function levy(){
	// u = 0.01 * numpy.random.randn(dim) * sigma
    // v = numpy.random.randn(dim)
    // zz = numpy.power(numpy.absolute(v), (1 / beta))
    // step = numpy.divide(u, zz)
    // return step
	let u = math.multiply(math.matrix([randn(), randn()]), sigma*0.01);
	let v = math.matrix([randn(), randn()]);

}

function magnitude(x){
    return Math.sqrt(Math.pow(x._data[0],2) + Math.pow(x._data[1],2));
}

class Hawk{
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
    it = 0;
	let rabitPosition = math.matrix([0,0]);
    population = []
    for (let i=0; i<pop_size; i++){
        population.push(new Hawk())
    }
}

function hhoIterate(){
    if (it>max_iter){
        it = 0;
        // console.log(population[alphaID].position);
        noLoop();
    }
    // let new_pop = a_Copy(population);
	let meanHawk = math.matrix([0,0]);
    for (let i=0; i<pop_size; i++){
		// Update bound
		population[i].position = clip(population[i].position);
		// Calc fit
		population[i].calcFitness();
		if (population[i].fitness < rabitEnergy){
			rabitEnergy = population[i].fitness;
			rabitPosition = population[i].position;
		}
		meanX = math.add(population[i].position, meanX);
    }
	meanHawk = math.multiply(meanHawk,1/pop_size);
	let E1 = 2 * (1 - (it / max_iter))  // factor to show the decreaing energy of rabbit
	// Update the location of Harris' hawks
	for (let i=0; i<pop_size; i++){
		let E0 = random(-1,1);
		let Escaping_Energy = E1 * (E0);
		if (abs(Escaping_Energy) >= 1){
			let q = random(1);
			let rand_Hawk_index = floor(pop_size * random(1));
			let randHawk = population[rand_Hawk_index];
			if (q<0.5){
				population[i].position = math.subtract(randHawk.position, math.multiply(math.abs(math.subtract(randHawk.position, math.multiply(population[i].position,random(2)))),random(1)));
				//X[i, :] = X_rand - random.random() * abs(X_rand - 2 * random.random() * X[i, :])
			}else{
				//X[i, :] = (Rabbit_Location - X.mean(0)) - random.random() * ((ub - lb) * random.random() + lb)
				population[i].position = math.subtract(math.subtract(rabitPosition, meanHawk), math.multiply(math.matrix([random(-width/2, width/2), random(-height/2, height/2)]), random(1)));
			}
		}else if (abs(Escaping_Energy) < 1){
			let r = random(1);
			if ((r>=0.5)&&(abs(Escaping_Energy)<0.5)){
				population[i].position = math.subtract(rabitPosition, math.multiply(math.abs(math.subtract(rabitPosition, population[i].position)), Escaping_Energy));
			}
			if ((r >= 0.5) && (abs(Escaping_Energy) >= 0.5)){
				let Jump_strength = 2 * (1 - random(1));  // random jump strength of the rabbit
				population[i].position = math.subtract(math.subtract(rabitPosition, population[i].position), math.multiply(math.abs(math.subtract(math.multiply(rabitPosition, Jump_strength), population[i].position)), Escaping_Energy));
			}
			if ((r<0.5) && (abs(Escaping_Energy)>=0.5)){
				let Jump_strength = 2 * (1 - random(1));
				let X1 = math.subtract(rabitPosition, math.multiply(math.abs(math.subtract(math.multiply(rabitPosition,Jump_strength), population[i].position)), Escaping_Energy));
				X1 = clip(X1);
				if (func(X1._data[0], X1._data[1])<rabitEnergy){
					population[i].position = X1;
				}else{
					//(Rabbit_Location- Escaping_Energy* abs(Jump_strength * Rabbit_Location - X[i, :])+ numpy.multiply(numpy.random.randn(dim), Levy(dim)))
					// let X2 = math.add(X1,
				}
			}
		}
	}

    it++;
    // return new_pop
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