const dimX = 15;
const dimY = 30;
const pixSize = 20;
const margin = 50;

let tbW = dimX * pixSize;
let tbH = dimY * pixSize;

function reset(){
    background(50);
    fill(255);
    rect(margin, margin,tbW, tbH);
}

function drawTable(){

}

function setup(){
    createCanvas(tbW + 2 * margin, tbH + 2 * margin);
    reset();
}