float bX, bY;
int vel;
float rad;
boolean dir=false;
float slope;

void initialize(){
    bX = random(width);
    bY = random(height);
    rad = random(100) + 50;
    slope = (1 + random(100))/100;
    vel = 20;
    ellipse(bX, bY, rad, rad);
}

void setup(){
    size(1000,600);
    frameRate(60);
    noStroke();
    background(50);
    initialize();
}

void draw(){
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
