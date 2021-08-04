int spacingX = 40,
    spacingY = 40,
    dotDia = 5;
int xOffset=0, yOffset=0;
float  dx = 0.1;
int tX = 0, tY = 0;

public class point{
    float x=0,y=0;
    point(float px, float py){
        x = px;
        y = py;
    }
    
    void set(float u, float v){
        x=u;
        y=v;
    }
}

ArrayList<point> value = new ArrayList<point>();
ArrayList<point> dr = new ArrayList<point>();

void drawGrid(){
    //minor grid
    strokeWeight(1);
    stroke(50);

    for (int i=tX; i<=width; i+=spacingX){
        line(i, height,i , 0);
    }
    for (int i=tX; i>0; i-=spacingX){
        line(i, height,i , 0);
    }
    
    for (int j=tY; j<=height; j+=spacingY){
        line(0, j, width, j);
    }
    for (int j=tY; j>0; j-=spacingY){
        line(0, j, width, j);
    }

    //major grid
    strokeWeight(2);
    stroke(255);
    line(0,tY,width,tY);
    line(tX,0,tX,height);
}

float posX(float x){
    return (x * spacingX) + tX;
}

float posY(float y){
    return -1 * (y * spacingY) + tY;
}

void drawSeg(point u, point v){
    line (posX(u.x),posY(u.y), posX(v.x), posY(v.y));
}

void drawPoint(point u){
    ellipse(posX(u.x), posY(u.y), dotDia, dotDia);
}

float fn(float x){
    return (1/(1+exp(-x)));
}

void calculateValue(){
    point u;
    float sX = ((-1)*width/2)/spacingX;
    for (float x = sX; x <= (width/2)/spacingX; x+=dx){
        u = new point(x,fn(x));
        value.add(u);
    }
}

void derive(){
    point u;
    for (int i=1; i<value.size(); i++){
        u = new point(value.get(i-1).x, (value.get(i).y - value.get(i-1).y)/dx);
        dr.add(u);
    }
}

void plot(ArrayList<point> arraylist, color c){
    stroke(c);
    for (int i=1; i<arraylist.size(); i++){
        drawSeg(arraylist.get(i-1), arraylist.get(i));
    }
    noStroke();
    fill(c);
    for (int i=1; i<arraylist.size(); i++){
        drawPoint(arraylist.get(i));
    }
    fill(255);
}

void setup(){
    size(1000,800);
    background(0);
    frameRate(30);
    fill(255);
    tX = width/2;
    tY = height/2;
    //INITIALIZATION
    drawGrid();
    
    //create the value;
    calculateValue();

    //create derivative value
    derive();
    
    //draw
    plot(value,color(255,180,50));
    plot(dr,color(100,150,255));
}

void draw(){
    background(0);
    drawGrid();
    plot(value,color(255,180,50));
    plot(dr,color(100,150,255));
}

void mousePressed(){
    xOffset = mouseX - tX;
    yOffset = mouseY - tY;
}

void mouseDragged() {
    tX = mouseX - xOffset;
    tY = mouseY - yOffset;
}

void keyPressed(){
    switch (key) {
        case 'x' :
            spacingX +=10;
        break;	
        case 'y' :
            spacingY +=10;
        break;	
        case 'z' :{
            spacingX +=10;
            spacingY +=10;
        }
        break;	
        case 'X' :
            spacingX -=10;
        break;	
        case 'Y' :
            spacingY -=10;
        break;	
        case 'Z' :{
            spacingX -=10;
            spacingY -=10;
        }
        break;	
    }
}
