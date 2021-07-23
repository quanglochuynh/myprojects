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

public class Projectile_motion_simulation extends PApplet {

final float diameter = 30;
float px, py, vx, vy;
final float vel = 30;
final float angle = 30;
final float gravity = -1;
int t=0;

public float angTorad(float an){
  return ((an/360) * 2 * 3.14159f);
}

public void initialize(){
  px = width/10;
  py = (height/4)*2;
  float ang = angTorad(angle);
  vx = vel * cos(ang);
  vy = vel * sin(ang);
  reset();
  ellipse(px, py, diameter, diameter);
}

public void reset(){
  //background(50);
  strokeWeight(2);
  line(0, height/2 + diameter/2, width, py);
  noStroke();
  fill(255,125);
}

public void setup(){
  
  background(50);
  stroke(255);
  frameRate(30);
  initialize();
}

public void draw(){
  vy = vy + gravity;
  px = px + vx;
  py = py + vy;
  reset();
  float h = ((py - height/2) * (-1)) + height/2;
  ellipse(px, h, diameter, diameter);
  t++;
}
  public void settings() {  size(1920,1000); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "Projectile_motion_simulation" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
