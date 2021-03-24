class Particle{
  float x, y, displace;

  Particle(float xpos, float ypos, float displace){
    x = xpos;
    y = ypos;
  }
}

final int diameter=10;
final int spacing = 25;
final float interval = 0.02;
final float omega = 2*3.141592654;
final float amplitude = 45;
final float phi = 3.141592654/4;
final int active = 0;
final float velocity = 50;
float t=0;
Particle[] array;
int countH, countV;
float py;

void setup(){
  size (1200,800);
  countH = width/spacing;
  countV = height/spacing;
  background(0);
  frameRate(50);
  noStroke();
  fill(255);
  array = new Particle[100];
  for (int i=0; i<countH; i++){
    array[i] = new Particle((i)*spacing+spacing/2,height/2, 0);
    ellipse(array[i].x, array[i].y, diameter, diameter);
  }
}

void draw(){
  background(50);
  array[0].displace = sin(omega*t);
  ellipse(array[0].x, array[0].y + amplitude*array[0].displace , diameter, diameter);
  for (int i = 1; i<countH; i++){
    ellipse(array[i].x, getY(i), diameter, diameter);
  }
  t+=interval;
}

float getY(int p){
  array[p].displace = sin(asin(array[p-1].displace)-phi);
  return array[p].y + amplitude * array[p].displace;
}
