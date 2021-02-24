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

public class Bounce_processing extends PApplet {

float bX, bY;
int vel;
float rad;
boolean dir=false;
float slope;

public void initialize(){
    bX = random(width);
    bY = random(height);
    rad = random(100) + 50;
    slope = (1 + random(100))/100;
    vel = 20;
    ellipse(bX, bY, rad, rad);
}

public void setup(){
    
    frameRate(60);
    noStroke();
    background(50);
    initialize();
}

public void draw(){
    //background(50);
    if (dir==true){
        bX += vel * cos(atan(slope));
        bY += vel * sin(atan(slope));
    }else{
        bX -= vel * cos(atan(slope));
        bY += vel * sin(atan(slope));
    }
    ellipse(bX, bY, rad, rad);
    if ((bX < rad/2) || (bX > width-rad/2)){
        dir = !dir;
    }
    if ((bY < rad/2) || (bY > height - rad/2)){
        slope *= -1;
    }
}
  public void settings() {  size(1000,600); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "Bounce_processing" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
