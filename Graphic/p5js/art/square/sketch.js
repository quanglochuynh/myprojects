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
  // for (let i =0 ; i<10; i++){

  // }
}

function draw() {
  background(220);
  z++;
  s.show()
  translate(300, 300,z);

}
