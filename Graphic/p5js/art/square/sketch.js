class Square{
  constructor(x,y,w){
    this.x = x;
    this.y = y; 
    this.w = w;
  }

  show(){
    stroke(0);
    strokeWeight(2);
    noFill();
    rectMode(CENTER);
    rect(this.x, this.y,this.w, this.w);
  }
}


let array = [];

let s;
let z=0;


function setup() {
  createCanvas(600, 600, WEBGL);
  background(220);
  s = new Square(0,0,200)
  translate(300, 300);
  for (let i =0 ; i<20; i++){
    array.push(new Square(0,0,1000*(1/sqrt(i))));
  }
}

function draw() {
  background(220);
  for (let i in array){
    array[i].show();
  }
}
