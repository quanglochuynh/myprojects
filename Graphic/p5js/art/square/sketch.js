class Square{
  constructor(x,y,w,id){
    this.id = id
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
t = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  background(220);
  s = new Square(0,0,200)
  translate(300, 300);
  for (let i =0 ; i<80; i++){
    array.push(new Square(0,0,1000*(1/sqrt(2*i)), i));
  }
}

function draw() {
  background(220);
  t+=1/60;
  x = 5*cos(t);
  y = 5*sin(t);
  for(let i =0 ; i<array.length; i++){
    array[i].x = array[i].id * x;
    array[i].y = array[i].id * y;
    array[i].w += 0
  }
  for (let i in array){
    array[i].show();
  }
}
