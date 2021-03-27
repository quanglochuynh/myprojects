import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class Longitudinal_Wave_simulation extends PApplet {

class Particle{
  float x, y;

  Particle(float xpos, float ypos){
    x = xpos;
    y = ypos;
  }

  public float getX(){
    return x;
  }

  public float getY(){
    return y;
  }

  public void setX(float xpos){
    x = xpos;
  }

  public void setY(float ypos){
    y = ypos;
  }
}

final int diameter=10;
final int spacing = 50;
final float interval = 0.02f;
final float omega = 1*3.141592654f;
final float amplitude = 45;
final float phi = 3.141592654f/4;
float t=0;
Particle[] array;
int countH, countV;
float px;

public void setup(){
  
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

public void draw(){
  background(0);
  for (int i=0; i<countH; i++){
    px = array[i].x + amplitude*sin(omega*t + phi*i);
    for (int j=-countV/2; j<countV/2; j++){
      ellipse(px, array[i].y + spacing * j+ spacing/2, diameter, diameter);
    }
  }
  t=t+interval;
}
  public void settings() {  size (1200,800); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "Longitudinal_Wave_simulation" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
