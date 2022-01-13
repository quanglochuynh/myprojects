let plane;

function setup() {
  createCanvas(600,600);
  frameRate(30);
  plane = new OXY(600,600,10);
}

function draw() {
  background(0);
  plane.drawPlane();
}
