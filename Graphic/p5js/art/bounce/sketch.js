//const { Color } = require("../../../../../../.vscode/extensions/samplavigne.p5-vscode-1.2.8/p5types");

class Point{
  constructor(x,y){
    this.x = x; 
    this.y = y;
  }

  show(co){
    fill(co);
    noStroke();
    circle(this.x, this.y, 95);
  }

  add(p){
    this.x += p.x;
    this.y += p.y;
  }

  update(){
    if ((this.x > width) || (this.x < 0)){

    }
  }

}

let p;
let rdh;
let v,a;
let dir = true;

function setup() {
  createCanvas(600, 600);
  background(0);
  colorMode(HSB,255);
  p = new Point(width/2, height/2);
  rdh = random(255);
  v = new Point(8,-8);
  a = new Point(0, 0.2)
}

function draw() {
  background(0,0,0,0.0025);
  if ((rdh>255) || (rdh<0)){
    dir = !dir;
  }
  if ((dir == true)) {
    rdh += 0.5;
  }else{
    rdh-= 0.5;
  }

  
  if ((p.x > width) || (p.x < 0)){
    v.x = -v.x;
    v.x -= 0.2;
  }
  if ((p.y > height) || (p.y < 0)){
    v.y = -v.y;
    v.y -= 0.2;
  }
  let co  = color(rdh,100, 255);
  p.show(co);
  v.add(a);
  p.add(v);
  
}
