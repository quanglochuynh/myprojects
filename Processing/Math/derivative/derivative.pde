static int  spacingX = 40,
            spacingY = 20,
            dotDensity = 10;
float  interval = 1/dotDensity;

void drawPoint(float x, float y){
  float rX, rY;
  rX = (x * spacingX) + width/2;
  rY = -1 * ((y * spacingY) - height/2);
  ellipse(rX,rY,5,5);
}
  

void setup(){
    size(800,600);
    background(0);
    frameRate(30);
    fill(255);

    //INITIALIZATION
    //minor grid
    strokeWeight(1);
    stroke(50);
    for (int i=0; i<=width/2; i+=spacingX){
        line(i+width/2,height,i+width/2,0);
        line(width/2-i,height,width/2-i,0);
    }
    for (int j=0; j<=height/2; j+=spacingY){
        line(0, j+height/2,width,j+height/2);
        line(0, height/2-j,width,height/2-j);
    }
    //major grid
    strokeWeight(2);
    stroke(255);
    line(0,height/2,width,height/2);
    line(width/2,0,width/2,height);
    //draw the function;

    float fx;
    for (float x = ((-1)*width/2)/spacingX; x <= (width/2)/spacingX; x+=interval){
      fx = pow(x,3) - 2 * pow(x,2) - 5 * pow(x,1) + 6;
      drawPoint(x,fx);
    }
}
