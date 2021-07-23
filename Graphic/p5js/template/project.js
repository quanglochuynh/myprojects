// Single-sketch example

function setup (){
    createCanvas (800, 600);
  }
  
  function draw(){
    background(50);
    fill(255);
    noStroke();
    rectMode(CENTER);
    if (mouseX > width/2){
        fill(255,100,200);
    }
    else {
        fill(255)
    }
    ellipse(mouseX, mouseY, 50, 50);
  }