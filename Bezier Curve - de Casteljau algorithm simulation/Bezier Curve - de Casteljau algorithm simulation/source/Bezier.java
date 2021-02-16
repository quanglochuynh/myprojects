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

public class Bezier extends PApplet {

class point{
  int x;
  int y;
  public point(int px, int py){
    this.x = px;
    this.y = py;
  }
}

point p1 = new point(200,200), p2 = new point(600,200);
point v1 = new point(300,100), v2 = new point(500,100);
point handle = new point(400,550);
int mouseThres = 50;
float u = 0.5f;
int d1x,d1y,d2x,d2y,d3x,d3y,d4x,d4y,d5x,d5y,d6x,d6y;
point p3 = new point(0,0); 
point p4 = new point(0,0); 
point p5 = new point(0,0); 
point p6 = new point(0,0); 
point p7 = new point(0,0); 
point p8 = new point(0,0); 


public void setup(){
  
  background(50);
  frameRate(60);
  fill(255,255,255);
  ellipse(p1.x,p1.y,10,10);
  ellipse(p2.x,p2.y,10,10);
  strokeWeight(2);
  line(p1.x,p1.y,v1.x,v1.y);
  line(p2.x,p2.y,v2.x,v2.y);
  line(200,550,600,550);
  ellipse(handle.x,handle.y,15,15);
}

public void draw(){
  int mx = mouseX, my = mouseY;
  background(50);
  strokeWeight(3);
  stroke(255);
  fill(255);
  line(200,550,600,550);    //scroll bar
  if ((mx > handle.x-mouseThres) && (mx < handle.x+mouseThres) && (my > handle.y-mouseThres) && (my < handle.y+mouseThres) && (mx >200) && (mx < 600) && mousePressed){
    handle.x = mx;
    u = map(mx,200,600,0,1);
  }
  if ((mx > v1.x-mouseThres) && (mx < v1.x+mouseThres) && (my > v1.y-mouseThres) && (my < v1.y+mouseThres) && mousePressed){
    v1.x=mx;
    v1.y=my;
  }else if ((mx > v2.x-mouseThres) && (mx < v2.x+mouseThres) && (my > v2.y-mouseThres) && (my < v2.y+mouseThres) && mousePressed){
    v2.x=mx;
    v2.y=my;
  }else if ((mx > p1.x-mouseThres) && (mx < p1.x+mouseThres) && (my > p1.y-mouseThres) && (my < p1.y+mouseThres) && mousePressed){
    p1.x = mx;
    p1.y = my;
  }else if ((mx > p2.x-mouseThres) && (mx < p2.x+mouseThres) && (my > p2.y-mouseThres) && (my < p2.y+mouseThres) && mousePressed){
    p2.x = mx;
    p2.y = my;
  }
  ellipse(p1.x,p1.y,10,10);
  ellipse(p2.x,p2.y,10,10);
  line(p1.x,p1.y,v1.x,v1.y);
  line(p2.x,p2.y,v2.x,v2.y);
  ellipse(handle.x,handle.y,15,15);
  
  d1x = v1.x - p1.x;
  d1y = v1.y - p1.y;
  d2x = v2.x - p2.x;
  d2y = v2.y - p2.y;
  d3x = v2.x-v1.x;
  d3y = v2.y-v1.y;
  p3.x = round(p1.x + d1x*u);
  p3.y = round(p1.y + d1y*u);
  p4.x = round(p2.x + d2x*(1-u));
  p4.y = round(p2.y + d2y*(1-u));
  p5.x = round(v1.x + d3x*u);
  p5.y = round(v1.y + d3y*u);
  d4x = p5.x - p3.x;
  d4y = p5.y - p3.y;
  d5x = p4.x - p5.x;
  d5y = p4.y - p5.y;
  p6.x = round(p3.x + d4x*u);
  p6.y = round(p3.y + d4y*u);
  p7.x = round(p5.x + d5x*u);
  p7.y = round(p5.y + d5y*u);
  d6x = p7.x - p6.x;
  d6y = p7.y - p6.y;
  p8.x = round(p6.x + d6x*u);
  p8.y = round(p6.y + d6y*u);
  
  
  ellipse(p3.x,p3.y,10,10);
  ellipse(p4.x,p4.y,10,10);
  ellipse(p5.x, p5.y, 10, 10);
  strokeWeight(1);
  line(p3.x,p3.y,p5.x,p5.y);
  line(p5.x,p5.y,p4.x,p4.y);
  ellipse(p6.x,p6.y,10,10);
  ellipse(p7.x,p7.y,10,10);
  line(v1.x,v1.y,v2.x,v2.y);
  line(p6.x,p6.y,p7.x,p7.y);
  fill(255,0,0);
  ellipse(p8.x,p8.y,15,15);
}
  public void settings() {  size(800,600); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "Bezier" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
