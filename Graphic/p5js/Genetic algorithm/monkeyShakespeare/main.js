const numOfPopulation = 1000;
const mutationRatio = 0.1;
const targetString = "To be or not to be.";

let population;


function setup(){
    createCanvas(600,600);
    background(240);
    frameRate(25);
    population = new Population(targetString, numOfPopulation, mutationRatio);
    population.calculateFitness();
}

function draw(){
    background(240);
    text(population.generation, 50,400)
    population.naturalSelection();
    population.mutate();
    population.evaluateResult();
    population.calculateFitness();
}