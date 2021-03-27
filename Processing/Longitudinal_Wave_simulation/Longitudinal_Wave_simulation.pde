class Particle{
  float x, y;

  Particle(float xpos, float ypos){
    x = xpos;
    y = ypos;
  }

  float getX(){
    return x;
  }

  float getY(){
    return y;
  }

  void setX(float xpos){
    x = xpos;
  }

  void setY(float ypos){
    y = ypos;
  }
}

final int diameter=10;
final int spacing = 50;
final float interval = 0.02;
final float omega = 1*3.141592654;
final float amplitude = 45;
final float phi = 3.141592654/4;
float t=0;
Particle[] array;
int countH, countV;
float px;

void setup(){
  size (1200,800);
  countH = width/spacing;
  countV = height/spacing;
  background(0);
  frameRate(50);
  noStroke();
  fill(255);
  array = new Particle[50];
  for (int i=0; i<countH; i++){
    array[i] = new Particle((i)*spacing+spacing/2,height/2);
    ellipse(array[i].x, array[i].y, diameter, diameter);
  }
}

void draw(){
  background(0);
  for (int i=0; i<countH; i++){
    px = array[i].x + amplitude*sin(omega*t + phi*i);
    for (int j=-countV/2; j<countV/2; j++){
      ellipse(px, array[i].y + spacing * j+ spacing/2, diameter, diameter);
    }
  }
  t=t+interval;
}
