final float diameter = 20;
float px, py, vx, vy;
final float vel = 20;
final float angle = 45;
final float gravity = -1;
int t=0;

float angTorad(float an){
  return ((an/360) * 2 * 3.14159);
}

void initialize(){
  px = width/10;
  py = (height/4)*2;
  float ang = angTorad(angle);
  vx = vel * cos(ang);
  vy = vel * sin(ang);
  reset();
  ellipse(px, py, diameter, diameter);
}

void reset(){
  //background(50);
  strokeWeight(2);
  line(0, height/2 + diameter/2, width, py);
  noStroke();
}

void setup(){
  size(800,600);
  background(50);
  stroke(255);
  frameRate(10);
  initialize();
}

void draw(){
  vy = vy + gravity;
  px = px + vx;
  py = py + vy;
  reset();
  float h = ((py - height/2) * (-1)) + height/2;
  ellipse(px, h, diameter, diameter);
  t++;
}
