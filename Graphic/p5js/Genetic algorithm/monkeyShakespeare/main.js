const numOfPopulation = 500;
const mutationRatio = 0.06;
const targetString = "Dak dak buh buh lmao";

let population;


function setup(){
    createCanvas(600,600);
    background(240);
    frameRate(15);
    population = new Population(targetString, numOfPopulation, mutationRatio);
    population.calculateFitness();
}

function draw(){
    background(240);
    textSize(48);
    text(population.bestString, 50, 100);
    textSize(24);
    text('Generations: ' + population.generation + 'th', 50,150)
    population.lamMau();
    population.naturalSelection();
    population.mutate();
    population.evaluateResult();
    population.calculateFitness();
}