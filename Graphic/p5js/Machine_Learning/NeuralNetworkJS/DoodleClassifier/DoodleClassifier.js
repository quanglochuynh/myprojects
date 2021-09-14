let airplane;
let 


function preload(){

}


function setup(){
    createCanvas(560,560);
    background(255);

}

function mouseDragged(){
    strokeWeight(16);
    stroke(0);
    line(pmouseX, pmouseY, mouseX, mouseY);
}

function clearCanvas(){
    background(255);
    console.log('clearing');
}

function guess(){
    console.log('guessing');
}

function trainNN(){
    console.log('training');
}